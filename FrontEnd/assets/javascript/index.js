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
      edit();

    } else {
      // If their is no token, only display the filters and the gallery
      createArticle(result);
      createButton("Tous", "btnAll" ,"filterActive");
      createButton("Objets", "btnObjects" );
      createButton("Appartements", "btnAppartements");
      createButton(`Hôtels & restaurants`, "btnHotels");
      filtersAll(result);
      filterObjects(result);
      filterAppartments(result);
      filterHotels(result);
      updateFilterActive(activeButton) 
    }
  })
  .catch((err) => {
    alert("erreur 404" + err);
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

// ...

// Function to create a filter to display all category
function filtersAll(result) {
  const buttonAll = document.querySelector("#btnAll");
  buttonAll.classList.add("filterActive");

  buttonAll.addEventListener("click", function () {
    const allObjects = result.filter((obj) => obj.categoryId != null);
    document.querySelector(".gallery").innerHTML = "";
    createArticle(allObjects);
    updateFilterActive(buttonAll);
  });
}

// Function to create a filter to display all Objects
function filterObjects(result) {
  const buttonObjects = document.querySelector("#btnObjects");

  buttonObjects.addEventListener("click", function () {
    const filteredObjects = result.filter((obj) => obj.categoryId === 1);
    document.querySelector(".gallery").innerHTML = "";
    createArticle(filteredObjects);
    updateFilterActive(buttonObjects);
  });
}

// Function to create a filter to display all Apartments
function filterAppartments(result) {
  const buttonAppartments = document.querySelector("#btnAppartements");

  buttonAppartments.addEventListener("click", function () {
    const filteredAppartments = result.filter((obj) => obj.categoryId === 2);
    document.querySelector(".gallery").innerHTML = "";
    createArticle(filteredAppartments);
    updateFilterActive(buttonAppartments);
  });
}

// Function to create a filter to display all Hotels
function filterHotels(result) {
  const buttonHotels = document.querySelector("#btnHotels");

  buttonHotels.addEventListener("click", function () {
    const filteredHotels = result.filter((obj) => obj.categoryId === 3);
    document.querySelector(".gallery").innerHTML = "";
    createArticle(filteredHotels);
    updateFilterActive(buttonHotels);
  });
}

// Function to update the active filter button
function updateFilterActive(activeButton) {
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach((button) => {
    button.classList.remove("filterActive");
  });
  activeButton.classList.add("filterActive");
}

// Function to create a black bar for edition mode
function blackBar() {
    let blackBar = document.querySelector("body");
    let sectionMode = document.createElement("div");
    sectionMode.setAttribute("id", "edition-mode");
    let icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    let h3 = document.createElement("h3");
    h3.innerHTML = "Mode édition";
    let link = document.createElement("button");
    link.setAttribute("href", "#");
    link.textContent = "publier les changements";

    blackBar.parentNode.insertBefore(sectionMode, blackBar);
    sectionMode.append(icon);
    sectionMode.append(h3);
    sectionMode.append(link);
}
// function to create modify button
function edit() {
    const articleElement = document.querySelector("article");
    const photoElement = document.querySelector("figure");

    const editButton = document.createElement('a'); // Modifier le bouton en tant que lien

    const iconElement = document.createElement('i');
    iconElement.className = "fa-regular fa-pen-to-square";

    const textElement = document.createElement('span');
    textElement.textContent = 'modifier';

    
    editButton.appendChild(iconElement);
    editButton.appendChild(textElement);

   

    editButton.classList.add('modify');
     // Ajouter l'attribut href avec l'ID du modal

    articleElement.appendChild(editButton);
    photoElement.appendChild(editButton.cloneNode(true));
}
// Function for display the modal link
