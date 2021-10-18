"use strict";
const url = 'http://localhost:8080/';
const form = document.getElementById('login');
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z\d]{8}$/;
class User {
    constructor(email, password, page) {
        this.email = email;
        this.password = password;
        this.page = page;
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
    if(localStorage.getItem('token')){
        return userData = {
            email: document.getElementById("userEmail").value,
            password: document.getElementById("userPassword").value,
            page: localStorage.getItem('page')
        };
    }
    return userData = {
        email: document.getElementById("userEmail").value,
        password: document.getElementById("userPassword").value,
    };
}
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let { email, password, page } = getUserData();
    let user = new User(email, password, page);
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
        localStorage.setItem('token', result.token);
        if (localStorage.getItem('token')) {
            let time = new Date();
            localStorage.setItem('time', String(time.getUTCMinutes()));
            // document.location.replace('/gallery');
            document.location.replace('/gallery');

        }
    }
    catch (err) {
        alert(err.message);
    }
});
