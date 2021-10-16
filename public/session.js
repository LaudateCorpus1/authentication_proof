//Validate/Update Session for User

function isLoggedIn() {
    if (localStorage['session_id'] == undefined) {
        return false;
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({'session_id': localStorage['session_id']})
    };
    let res = await (await fetch('/validate-session', options)).json();
    return res.body.valid;
}