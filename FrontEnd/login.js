const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
let email = document.getElementById("email");
let password = document.getElementById("password");
let emailErrorMessage = document.createElement("span");
let passwordErrorMessage = document.createElement("span");
let emailContainer = document.getElementById("email-container");
let passwordContainer = document.getElementById("password-container");

emailErrorMessage.classList.add("errorMessage");
passwordErrorMessage.classList.add("errorMessage");

emailContainer.appendChild(emailErrorMessage);
passwordContainer.appendChild(passwordErrorMessage);

//validate Email and Password
email.addEventListener("input", (event) => {
    if(!emailRegex.test(email.value)) {
        emailErrorMessage.innerText = "Veuillez mettre une adresse email valide.";
    } else {
        emailErrorMessage.innerText = "";
    }
});

password.addEventListener("input", (event) => {
    if(password.value.length < 5) {
        passwordErrorMessage.innerText = "Le mot de passe doit contenir au minimum 5 caractères.";
    }
    else {
        passwordErrorMessage.innerText = "";
    }
});


//function sending the form to the API
async function sendForm(email, password) {
    try {
        const res = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"email": email, "password": password})
        });
        //get token
        if (res.ok) {
            const userToken = await res.json();
            sessionStorage.setItem("token", userToken.token);
            window.location.href = "index.html";
            console.log(userToken);
        } else {
            alert("Veuillez mettre un email et/ou mot de passe valide");
        }
    }
    catch (err) {
        console.error(err);
  }
}

//send form to the API by clicking on the button
const button = document.getElementById("submit-form");
button.addEventListener("click", (event) => {
    event.preventDefault();
    if((email.value == "") || (password.value == "") || password.value.length < 5) {
        alert("Adresse email ou mot de passe invalide");
    } else {
        sendForm(email.value, password.value);
    }
});