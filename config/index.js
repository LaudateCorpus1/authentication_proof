//Load all variables from .env into process.env
require('dotenv').config({ path: 'config/.env' });

// Include Express Dependency
const express = require('express');
const { write } = require('fs');
//Include Mongoose Dependency
const mongoose = require('mongoose');
//Initialize App
const app = express();

//Connect to Mongoose Database
const connection = mongoose.createConnection(process.env.DATABASE_URL,  {useNewUrlParser: true, useUnifiedTopology: true });


//Connection variable
connection.on('error', (error) => console.log(error));
connection.once('open', () => console.log("Database Connected."));

// Write to database
async function writeToDatabase() {
    const doc = { name: "Neapolitan pizza", shape: "round" };
    const result = await connection.collection("newCollection").insertOne(doc);
    console.log(
        `A document was inserted with the _id: ${result.insertedId}`,
    );
}

writeToDatabase();

//Serve Static HTML pages
app.use(express.static('public'));

//Parse incoming JSON requests
app.use(express.json());

//Set Port
app.listen(3000, () => console.log("Listening..."));