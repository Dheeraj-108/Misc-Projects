import mongoose from "mongoose";
import { User } from "./user.models.js";

const voteSchema = mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    voteStatus: {
        type: String,
        enum: ["Going", "Not Going", "Not Sure"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
}, {timeStamps: true})

export const Vote = mongoose.model('Vote', voteSchema);