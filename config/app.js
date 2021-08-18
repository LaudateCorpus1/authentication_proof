const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());
// app.use(cookieParser());

//Google Auth
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
verify().catch(console.error);

app.post('/login', async (req, res) => {
    let token = req.body.token;

    console.log(req.body);
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname+'/../public/index.html'));
// });

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname+'/../public/login.html'));
// });



app.listen(3000, () => console.log("Listening..."));