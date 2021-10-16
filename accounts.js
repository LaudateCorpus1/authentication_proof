const Datastore = require('nedb');
const crypto = require('crypto');

let db = {};
db.users = new Datastore({
    filename: 'users.db'
});
db.sessions = new Datastore({
    filename: 'sessions.db'
});

for (let database of Object.keys(db)) {
    db[database].loadDatabase(function (error) {
        if (error) {
            console.log('FATAL: local database could not be loaded. Caused by: ' + error);
            // throw error;
        }
        console.log('INFO: local database loaded successfully.');
    });
}

/**
 * 
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 * 
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

/**
 * 
 * @param {*} password - The password string that the user inputs to the password field in the register form
 * 
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 * 
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}

/**
 * TODO
 * @param {*} db 
 * @param {*} query 
 * @returns 
 */
async function dbFind(db, query) {
    let docsSubmitted = false;
    let docs = undefined;
    db.find(query).exec((err, DOCS) => {
        docs = DOCS;
        docsSubmitted = true;
    });
    const delay = (ms = 50) => new Promise(res => setTimeout(res, ms));
    while (!docsSubmitted) {
        await delay(50);
    }
    return docs;
}

/**
 * TODO
 * @param {*} db 
 * @param {*} entry 
 * @returns 
 */
async function dbInsert(db, entry) {
    let entryMade = false;
    let newDoc = undefined;
    db.insert(entry, (err, newDOC) => {
        newDoc = newDOC;
        entryMade = true;
    });
    const delay = (ms = 50) => new Promise(res => setTimeout(res, ms));
    while (!entryMade) {
        await delay(50);
    }
    return newDoc;
}

/**
 * TODO
 * @param {*} user_id 
 * @returns 
 */
async function issue_new_session(user_id) {
    //TODO: Delete/Update any occurrence of user_id in the database first

    //Make sure the user_id has a user account
    let session_id = (await dbInsert(db.sessions, {
        time: (new Date()).getTime(),
        user_id: user_id
    }))['_id'];

    return session_id;
}

/**
 * TODO
 * @param {*} req 
 * @param {*} res 
 */
async function createAccount(req, res) {
    //Check if the username already exists
    let message = "CREATE ACCOUNT FAILED";
    let createAccount = true;
    let body = {};

    if (await dbFind(db.users, {
            username: req.body.user
        }) >= 1) {
        message = "ACCOUNT ALREADY EXISTS";
        createAccount = false;
    }

    if (req.body.user.length < 5 || req.body.pass.length < 8) {
        message = "BAD USERNAME PASSWORD";
        createAccount = false;
    }

    if (createAccount) {
        //Generate a password hash
        hashSalt = genPassword(req.body.pass);
        // Don't save the password, only the hash and the salt
        let saveMe = {
            time: (new Date()).getTime(),
            username: req.body.user,
            hash: hashSalt.hash,
            salt: hashSalt.salt
        };

        let user_id = (await dbInsert(db.users, saveMe))['_id'];

        message = "ACCOUNT CREATED";
        body = {
            session_id: await issue_new_session(user_id)
        };
    }

    res.send({
        message: message,
        body: body
    });
}

async function validate_session(req, res) {
    req.body.session_id

    res.send({

    });
}

module.exports = {
    createAccount
}