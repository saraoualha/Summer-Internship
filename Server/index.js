const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const eventRoutes= require("./routes/eventRoutes");
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

const app = express();
dotenv.config();

/*  Video Chat fonctionality   */
const serv= require('http').Server(app)
const ioV = require('socket.io')(serv,{
    cors: {
        origin: "http://localhost:3030",
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
})

const {v4: uuidv4}= require('uuid')
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(serv, {
  debug: true
});



app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/peerjs', peerServer);

app.get('/',(req,res)=>{
    res.redirect(`/videoChat/${uuidv4()}`)
})

app.get('/videoChat/:room', (req, res)=>{
    res.render('room', {roomId: req.params.room})
})

ioV.on('connection', socket => {
    socket.on('join-room', (roomId, userId)=>{
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId);  //.broadcast.emit('user-connected');
        socket.on('message', message=>{
            ioV.to(roomId).emit('createMessage', message)
        })
    })
})
serv.listen(3030);

/*   *************************  */

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => server)
    .catch((err) => console.log(err.message));

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',

    }
})

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
    const users = {};

    
});



app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/events', eventRoutes)

app.use(notFound)
app.use(errorHandler)

app.use(express.json()); //TO ACCEPT JSON DATA