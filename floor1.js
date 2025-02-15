// Attempt: Check answer and redirect to the next floor. 
document.getElementById("puzzle-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let answer1 = document.getElementById("puzzle-answer").value; 
    if (answer1 == "magiciandomain") {
        setCookie("progress", 1, 1);
        document.getElementById("second-puzzle-link").classList.remove("disabled");
    }
    else {
        alert("Wrong!"); 
        setCookie("progress", 0, 1);
        document.getElementById("second-puzzle-link").classList.add("disabled");
    }
});

// Cookie helper functions
function setCookie(name, value, days) {
let expires = "";
if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
}
document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
let nameEQ = name + "=";
let ca = document.cookie.split(';');
for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
}
return null;
}

