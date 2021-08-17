// Include Express Dependency
const express = require('express');
//Initialize App
const app = express();

function middleware(req, res, next) {
    console.log("Middleware function.");
    next();
}

function standardExpressGet(req, res, next) {
    console.log("Standard Express");
    res.send("<h1>Hello World</h1>");
    next();
}

app.use(middleware);

//Get Method
app.get('/', standardExpressGet);

//Serve Static HTML pages
// app.use(express.static('public'));

//Parse incoming JSON requests
// app.use(express.json());

//Set Port
app.listen(3000, () => console.log("Listening..."));