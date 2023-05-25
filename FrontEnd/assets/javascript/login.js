// Handle the login click event
document.querySelector("#btn-login").onclick = (e) => {
  e.preventDefault();

  // Get the error display message
  const error = document.querySelector("#error");

  // Get the informations of the user and create a user object
  const emailAddress = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  // Create a user object
  const user = {
    email: emailAddress,
    password: password,
  };

  // Check the validity of the email and password inout
  const emailCheck = document.getElementById("email");
  const passwordCheck = document.getElementById("password");
  passwordCheck.reportValidity();
  emailCheck.reportValidity();

  // If either the email or password is invalid return false
  if (
    emailCheck.checkValidity() === false ||
    passwordCheck.checkValidity() === false
  ) {
    return;

    // If both email and password are valid send a POST request to the API
  } else {
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    })
      // If the response is OK, return the JSON data Else return error
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          error.innerHTML = "Erreur dans l'identifiant";
        } else if (res.status === 401) {
          error.innerHTML = "Erreur dans le mot de passe";
        }
      })
      .then((userLogged) => {
        if (userLogged === undefined) {
          return;

          // If the user is logged in call the function
        } else {
          validateUser(userLogged);
        }
      })
      .catch((err) => {
        alert("erreur 404, problème avec le serveur:" + err);
      });
  }
};

// Function to validate the logged in user and redirect to the index page
function validateUser(userLogged) {
  const userId = userLogged.userId;

  // Storage of the user token
  if (userId !== undefined) {
    localStorage.setItem("token", userLogged.token);
    localStorage.setItem("userId", userLogged.userId);
    document.location.href = "./index.html";
  } else {
  }
  console.log(userId);
}
