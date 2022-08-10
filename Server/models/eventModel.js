const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    EventName: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String, trim: true },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isSharedEvent: { type: Boolean, default: false },
    startsAt:{type: String, trim: true},
    endsAt:{type: String, trim: true},
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;