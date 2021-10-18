"use strict";
const url = 'http://localhost:8080/signup';
const form = document.getElementById('signup');
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d]{8}$/;
class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
    isCorrectPassword() {
        if (this.password.match(regex))
            return true;
        else {
            alert("Invalid form of password");
            return false;
        }
    }
}
function getUserData() {
    let userData = {};
    return userData = {
        email: document.getElementById("userEmail").value,
        password: document.getElementById("userPassword").value,
    };
}
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let { email, password } = getUserData();
    let user = new User(email, password);
    if (!user.isCorrectPassword())
        return;
    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                'Access-Control-Allow-Methods': 'POST',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        let result = await response.json();
        if (result.errorMessage)
            return alert(result.errorMessage);
        alert(JSON.stringify(result))
    }
    catch (err) {
        alert(err.message);
    }
});
