const tokenToDelete = sessionStorage.getItem("token");

let logOut = document.getElementById("login-logout");

if(tokenToDelete !== "" && tokenToDelete !== null) {
    logOut.innerHTML = "Logout";
    logOut.addEventListener("click", (e) => {
        sessionStorage.removeItem("token");
        window.location.href = "index.html";
        logOut.href ="index.html";
    });
}