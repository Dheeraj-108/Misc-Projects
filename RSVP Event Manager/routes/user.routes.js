import { fetchUserEvents } from '../controllers/event.controllers.js';
import { 
    loginUser,
    logoutUser,
    registerUser
} from '../controllers/user.controllers.js';
import { verifyUser } from '../middlewares/auth.middleware.js';

import Router from 'express';
const router = Router();

router.get('/dashboard', verifyUser, fetchUserEvents)
router.route('/signup').get(async(_, res) => {
    res.render('signup.ejs', {username: null});
}).post(registerUser)

router.route('/login').get((_, res) => {
    res.render('login.ejs', {isValid: true, username: null})
}).post(loginUser)

router.route('/logout').get(logoutUser)

export default router;