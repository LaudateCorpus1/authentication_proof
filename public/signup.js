console.log("Signup Script (Send POST to server)");

function main() {
    attachFormScript();
}

function attachFormScript(UID = "uname", PID = "password", submit = "submit") {
    let user = document.getElementById(UID);
    let pass = document.getElementById(PID);
    
    let submitButton = document.getElementById(submit);
    submitButton.addEventListener("click", async (evt) => {
        evt.preventDefault();
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({'user': user.value, 'pass': pass.value})
        };
        let res = await (await fetch('/create-account', options)).json();
        console.log(res);
        //Store in cache
        localStorage.setItem('session_id', res.body.session_id);
    });
}

document.addEventListener("DOMContentLoaded", (evt) => {
    main();
});