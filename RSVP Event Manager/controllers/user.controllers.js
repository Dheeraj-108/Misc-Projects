import {User} from '../models/user.models.js'
import asyncHandler from '../utils/asyncHandler.js';
import bcrypt from 'bcrypt';

const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        userName: username, email, password: hashedPass
    })
    req.session.user = newUser; 
    console.log("Signed up successfully", newUser);
    res.redirect('/events');
})

const loginUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body;

    const dbUser = await User.findOne({email: email, userName: username})
    console.log(dbUser);
    if(!dbUser) {
        return res.render('login.ejs', {isValid: false, username: null});
    }

    console.log(password, dbUser.password)
    const validPass = await bcrypt.compare(password, dbUser.password)
    if(!validPass) {
        return res.render('login.ejs', {isValid: false, username: null});
    }

    req.session.user = dbUser; 
    res.redirect('/events');
})

const logoutUser = async(req, res) => {
    req.session.destroy();
    res.redirect('/users/login');
}

export {
    registerUser,
    loginUser,
    logoutUser
}