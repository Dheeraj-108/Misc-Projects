import 'dotenv/config';
import main from './db/connection.js';
// import path from 'path';

import express from "express";
const app = express();

main().then(() => {
    console.log("Connected with database successfully")
}).catch((err) => {
    console.log("Failed to connect with database", err);
})

//Templating engine configs
// app.set('view engine', 'ejs');
// app.set('views', path.join('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}))


// Routers
import urlRouter from './routes/url.routes.js'

app.use('/url', urlRouter)

app.listen(8080, () => {
    console.log("Server started, listening on port 8080");
})