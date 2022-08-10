const asyncHandler = require('express-async-handler');
const Event = require('../models/EventModel');
const handleEventErrors = require('../middlewares/eventErrors');



const fetchEvents = asyncHandler(async (req, res) => {
    const events = await Event.find({});
    try {
        res.status(200).json(events)
    } catch (err) {
        handleEventErrors(err, res)
    }
});

const fetchEvent = asyncHandler(async (req, res) => {
    const id = req.params.id
    const event = await Event.findById(id);
    try {
        res.status(200).json(event)
    } catch (err) {
        handleEventErrors(err, res)
    }
})

const createEvent = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.start || !req.body.end) {
        return res.status(400).send({ message: "Please Fill all the required fields" });
    }
    var sharedWith = JSON.parse(req.body.sharedWith);

    sharedWith.push(req.user);
    try {
        const event = await Event.create({
            EventName: req.body.name,
            createdBy: req.user,
            description: req.body.description,
            sharedWith: sharedWith,
            //isSharedEvent: sharedWith.length > 1,
            startsAt: req.body.start,
            endsAt: req.body.end,
        });
        res.status(200).json(event);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const updateEvent = asyncHandler(async (req, res) => {
    const id= req.params.id
    const {eventId} = req.body;
    const update = await Event.findByIdAndUpdate(
        eventId,   
        {
            EventName: req.body.name,
            description: req.body.description,
            startsAt: req.body.start,
            endsAt: req.body.end,
        },
        {
            multi: true,
            upsert: true,
            new: true,
        },
    ).exec();
    if (!update) {
        res.status(404);
        throw new Error("Event Not Found");
    } else {
        res.json(update);
    }
})

const deleteEvent = asyncHandler(async (req, res) => {
    const id = req.params.id; //event ID!!!! 
    try {
        await Event.findByIdAndRemove(id)
        res.status(200).json("Event has been deleted");
    } catch (err) {
        handleEventErrors(err, res)
    }
})

module.exports = { deleteEvent, updateEvent, createEvent, fetchEvent, fetchEvents };
