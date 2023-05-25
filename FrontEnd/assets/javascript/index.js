// Get the token from the local Storage
const token = localStorage.getItem("token");
const filters = document.querySelector(".filters");
const btnLogin = document.getElementById("login");

// Fetch the works from the API
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((result) => {
    works = result;
    // If there is a token, enable different function for the user
    if (token) {
      // Logout function to remove the token
      btnLogin.innerHTML = "logout";
      btnLogin.addEventListener("click", function () {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        btnLogin.setAttribute("href", "index.html");
      });
      // Call the function to create the articles, add the blackBar, allow the user to modify the gallery
      createArticle(result);
      blackBar();
      editPhoto();
      modaleLink();
      createGalerieWork();
    } else {
      // If their is no token, only display the filters and the gallery
      createArticle(result);
      createButton("Tous", "btn-all");
      createButton("Objets", "btn-objects");
      createButton("Appartements", "btn-apartments");
      createButton(`Hôtels & restaurants`, "btn-hotels");
      filtersAll(result);
      filterObjets(result);
      filterApartments(result);
      filterHotels(result);
      console.table(result);
    }
  })
  .catch((err) => {
    alert("erreur 404, problème avec le serveur:" + err);
  });

// Function to create an article element and display to the Gallery
function createArticle(result) {
  let sectionArticle = document.querySelector(".gallery");
  result.forEach((article) => {
    let articleElement = document.createElement("figure");
    articleElement.dataset.id = article.id;
    let imageElement = document.createElement("img");
    imageElement.src = article.imageUrl;
    let nomElement = document.createElement("p");
    nomElement.innerText = article.title;

    articleElement.append(imageElement);
    articleElement.append(nomElement);
    sectionArticle.append(articleElement);
  });
}

// Function to create the filters button
function createButton(text, className) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.id = className;
  filters.appendChild(button);
}

// Function to create a filter to display all category
function filtersAll(result) {
  const buttonAll = document.querySelector("#btn-all");
  buttonAll.addEventListener("click", function () {
    const allObjects = result.filter((obj) => obj.categoryId != null);
    document.querySelector(".gallery").innerHTML = "";
    createArticle(allObjects);
  });
}

// Function to create a filter to display all Object
function filterObjets(result) {
  const buttonObjects = document.querySelector("#btn-objects");
  buttonObjects.addEventListener("click", function () {
    const filteredObjects = result.filter((obj) => obj.categoryId === 1);
    document.querySelector(".gallery").innerHTML = "";
    createArticle(filteredObjects);
  });
}

// Function to create a filter to display all Apartments
function filterApartments(result) {
  const buttonApartments = document.querySelector("#btn-apartments");
  buttonApartments.addEventListener("click", function () {
    const filteredApartments = result.filter((obj) => obj.categoryId === 2);
    document.querySelector(".gallery").innerHTML = "";
    createArticle(filteredApartments);
  });
}

// Function to create a filter to display all Hotels
function filterHotels(result) {
  const buttonHotels = document.querySelector("#btn-hotels");
  buttonHotels.addEventListener("click", function () {
    const filteredHotels = result.filter((obj) => obj.categoryId === 3);
    document.querySelector(".gallery").innerHTML = "";
    createArticle(filteredHotels);
  });
}

// Function to create a black bar for edition mode
function blackBar() {
  let blackBar = document.querySelector("header");
  let sectionMode = document.createElement("div");
  sectionMode.setAttribute("id", "edition-mode");
  let icon = document.createElement("i");
  icon.classList.add("fa-regular", "fa-pen-to-square");
  let h3 = document.createElement("h3");
  h3.innerHTML = "Mode édition";
  let link = document.createElement("a");
  link.setAttribute("href", "#");
  link.textContent = "publier les changements";

  blackBar.parentNode.insertBefore(sectionMode, blackBar);
  sectionMode.append(icon);
  sectionMode.append(h3);
  sectionMode.append(link);
}

// Function for display the modal link
function modaleLink() {
  const target = document.querySelector(".modal-link");
  target.style.display = "block";
}
