//Load all variables from .env into process.env
require('dotenv').config({ path: 'config/.env' });

// Include Express Dependency
const express = require('express');
//Include Mongoose Dependency
const mongoose = require('mongoose');
//Include Express-Sessions Dependency
const session = require('express-session');
//Include connect-mongo dependency
const MongoStore = require('connect-mongo');

//Initialize App
const app = express();

// Session Store for a place to store session info
const sessionStore = MongoStore.create({mongoUrl: process.env.DATABASE_URL})

//Connection variable
// connection.on('error', (error) => console.log(error));
// connection.once('open', () => console.log("Database Connected."));

//Use a session (tied to MongoDB and cookies)
app.use(session({
    secret: 'secret key', /* Oftentimes some variable in .env, kept to check validity */
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { /* Will delete eventually */
        maxAge: 1000 * 60 * 24 * 24 //One day
    }
}));



//Serve Static HTML pages
app.use(express.static('public'));

//Parse incoming JSON requests
app.use(express.json());

//Set Port
app.listen(3000, () => console.log("Listening..."));