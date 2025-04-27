import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    longUrl: {
        type: String,
        required: true,
    },
    clickCount: [{
        type: Number
    }]
}, {timestamps: true})

export const Url = mongoose.model('Url', urlSchema)