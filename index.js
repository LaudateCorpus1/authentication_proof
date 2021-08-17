// Include Express Dependency
const express = require('express');
//Initialize App
const app = express();

//Set Port
app.listen(3000, () => console.log("Listening..."));

//Serve Static HTML pages
app.use(express.static('public'));

//Parse incoming JSON requests
app.use(express.json())

//Post Method
app.post('/api', (request, response) => {
    console.log(request.body);
    response.json({
        res: "RESPONSE"
    });
});