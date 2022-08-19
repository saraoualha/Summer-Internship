const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const eventRoutes = require("./routes/eventRoutes");
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware')

const app = express();
dotenv.config();

/*  Video Chat fonctionality   */
const serv = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const ioV = require("socket.io")(serv);
const { ExpressPeerServer } = require("peer");
const url = require("url");
const peerServer = ExpressPeerServer(serv, { 
    debug: true,
});
const path = require("path");
app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "static")));
app.use("/peerjs", peerServer);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.get("/join", (req, res) => { 
    res.redirect( 
        url.format({ 
            pathname: `/join/${uuidv4()}`, 
            query: req.query, 
        })
    );
});

app.get("/joinold", (req, res) => { 
    res.redirect(
        url.format({
            pathname: req.query.meeting_id,
            query: req.query,
        })
    );
});

app.get("/join/:rooms", (req, res) => { 
    res.render("room", { roomid: req.params.rooms, Myname: req.query.name });
});

ioV.on("connection", (socket) => {
    socket.on("join-room", (roomId, id, myname) => { 
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", id, myname);

        socket.on("messagesend", (message) => { 
            ioV.to(roomId).emit("createMessage", message);
        });

        socket.on("tellName", (myname) => {
            socket.to(roomId).emit("AddName", myname);
        });
        socket.on('display-media', (value) => {
            socket.to(roomId).emit('display-media', {userId, value });
        });
    })
});
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
    socket.on("disconnect", () => {
        socket.to(roomId).broadcast.emit("user-disconnected", id);
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