import { isValidObjectId } from "mongoose";
import {EventModel} from "../models/event.models.js"
import { Vote } from "../models/vote.models.js";
import mongoose from "mongoose";

const renderEvents = async(req, res) => {
    const events = await EventModel.find({}).populate({path: 'owner', select: 'userName'});
    res.render('home.ejs', {events, username: req.session.user.userName})
}

const renderEventForm = async(req, res) => {
    res.render('event.ejs', {username: req.session.user.userName});
}

const createEvent = async(req, res) => {
    const {eventname, description, address} = req.body;
    const user = req.session.user._id;

    const newEvent = await EventModel.create({
        eventName: eventname,
        description,
        address,
        owner: user
    })
    if(!newEvent) {
        return res.send('Failed to create event');
    }

    console.log(newEvent);
    res.redirect('/events/');
}

const voteInEvent = async(req, res) => {
    const {votestatus, eventid} = req.body;
    const eventId = new mongoose.Types.ObjectId(eventid)
    const user = req.session.user._id;

    const dbEvent = await EventModel.findById(eventId).populate({path: 'votedBy', select: 'owner'});
    if(dbEvent?.votedBy.some(vote => vote.owner.toString() === user.toString())) {
        console.log("You have already voted");
        return res.redirect('/events');
    }

    const eventVote = await Vote.create({
        eventId,
        voteStatus: votestatus,
        owner: user
    })

    dbEvent.votedBy.push(eventVote._id);
    await dbEvent.save();

    res.redirect('/events/');
}

const fetchUserEvents = async(req, res) => {
    const userId = req.session.user._id;

    const userEvents = await EventModel.find({owner: userId}).populate({
        path: 'votedBy', 
        select: 'voteStatus'
    });

    if(!userEvents || userEvents == []) {
        return res.render('dashboard.ejs', {events: null, username: req.session.user.userName})
    }
    for (const event of userEvents) {
        const votes = await Vote.find({ eventId: event._id });
      
        event.goingCount = votes.filter(v => v.voteStatus === "Going").length;
        event.notGoingCount = votes.filter(v => v.voteStatus === "Not Going").length;
        event.notSureCount = votes.filter(v => v.voteStatus === "Not Sure").length;
    }

    res.render("dashboard.ejs", {events: userEvents, username: req.session.user.userName});
}

const fetchSpecificEvent = async(req, res) => {
    const eventid = req.params.id;
    const eventId = new mongoose.Types.ObjectId(eventid);

    const specificEvent = await EventModel.findById(eventId);
    res.render("editform.ejs", {event: specificEvent, username: req.session.user.userName});
}

const editEventDetails = async(req, res) => {
    const eventid = req.params.id;
    const eventId = new mongoose.Types.ObjectId(eventid);

    const {eventname, description, address} = req.body;
    const updatedEvent = await EventModel.findOneAndUpdate({
        _id: eventId, 
        owner: req.session.user._id
    }, {eventName: eventname, description, address}, {new: true})

    console.log("Updated event is: ", updatedEvent);
    res.redirect('/users/dashboard');
}

const deleteEvent = async(req, res) => {
    const eventid = req.params.id;
    const eventId = new mongoose.Types.ObjectId(eventid);

    const dbEvent = await EventModel.findOneAndDelete({_id: eventId, owner: req.session.user._id});
    console.log("Deleted event is: ", dbEvent);
    res.redirect("/users/dashboard");
}

export {
    createEvent,
    voteInEvent,
    renderEvents,
    renderEventForm,
    fetchUserEvents,
    editEventDetails,
    deleteEvent,
    fetchSpecificEvent
}