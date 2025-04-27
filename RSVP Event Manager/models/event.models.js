import mongoose from 'mongoose';
import { User } from './user.models.js';
import { Vote } from './vote.models.js';

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    votedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    }]
}, {timestamps: true})

export const EventModel = mongoose.model('Event', eventSchema)