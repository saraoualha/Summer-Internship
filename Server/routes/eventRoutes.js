const express = require("express");
const {protect}= require("../middlewares/authMiddleware")
const {deleteEvent, updateEvent, createEvent, fetchEvent, fetchEvents}= require('../controllers/eventControllers');

const router = express.Router();

router.route('/').post(protect,createEvent)
router.route('/').get(protect, fetchEvents)

router.route('/:id/deleteEvent').delete(protect, deleteEvent)


router.route('/:id/show').get(protect, fetchEvent)

router.route('/:id/updateEvent').put(protect,  updateEvent)


module.exports = router;