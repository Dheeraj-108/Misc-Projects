import asyncHandler from "../utils/asyncHandler.js";

export const verifyUser = (req, res, next) => {
    if(!req.session.user) {
        return res.render('login.ejs', {isValid: true, username: null})
    }
    next()
}