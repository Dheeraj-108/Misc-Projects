import 'dotenv/config';
import main from './db/connection.js';
import session from 'express-session'
import methodOverride from 'method-override';
import path from 'path'

import express from 'express';
const app = express();

main().then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.log("Failed to connect with database: ", err);
})

app.set('view engine', 'ejs');
app.set('views', path.join('views'))

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(methodOverride("_method"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

import userRouter from './routes/user.routes.js';
import eventRouter from './routes/event.routes.js';
import { verifyUser } from './middlewares/auth.middleware.js';

app.use('/users', userRouter);
app.use('/events', verifyUser, eventRouter);

app.listen(8080, () => {
    console.log("Server started successfully");
})