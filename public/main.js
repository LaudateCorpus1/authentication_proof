console.log("Passport Driver");
let textArea;

function fetchData(key = "data") {
    // Do check here if signed in or not
    textArea.value = localStorage.getItem(key);
}

function linkTextArea(key = "data") {
    textArea.addEventListener("keyup", (evt) => {
        localStorage.setItem(key, textArea.value);
    });
}

function driver_run(id = "textarea") {
    textArea = document.getElementById(id);
    fetchData();
    linkTextArea();
}

document.addEventListener("DOMContentLoaded", (evt) => {
    driver_run();
});