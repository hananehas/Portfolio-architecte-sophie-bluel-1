const gallery = document.querySelector('.gallery');
const filterBtns = document.getElementsByClassName('filtersButtons');
const filterAll = document.createElement("li");
let works=[];
// Fetch works from API and get them
function getWorks() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(data => {
            gallery.innerHTML = '';
            works= data;
            data.forEach(work => {
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                const caption = document.createElement('figcaption');
                img.src = work.imageUrl;
                caption.innerText = work.title;
                img.setAttribute("alt", work.title);
                figure.appendChild(img);
                figure.appendChild(caption);
                gallery.appendChild(figure);
            });
        })
        .catch(error => console.error(error));
}
function addWorksToDocument(works) {
    works.forEach(function(work) {
        categoryWork(work);
    });
}

// Filter works by category and get them
function getCategories() {
    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(data => {
            filterAll.setAttribute("id", 0);
            filterAll.innerHTML = "Tous";
            filterAll.classList.add("filters", "filterSelected");
            filterBtns[0].appendChild(filterAll);
            data.forEach(category => {
                const filters = document.createElement("li");

                filters.innerText = category.name;
                filters.id = category.id;
                filters.classList.add("filters");

                filterBtns[0].appendChild(filters);

                filterSelected(filters);
            });
            filterSelected(filterAll);
        })
        .catch(error => console.error(error));
}

//filtre actif
function filterSelected(element) {
    element.addEventListener("click", () => {
        showWorks(element.id);
        let activeFilter = document.getElementsByClassName("filterSelected");
        if (activeFilter.length !== 0) {
            Array.from(activeFilter).forEach((element) => {
            element.classList.remove("filterSelected");
            });
        }
        element.classList.add("filterSelected");
    });
}
function categoryWork(work) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    figure.id = "project-work-" + work.id;
    img.src = work.imageUrl;
    caption.innerText = work.title;

    img.setAttribute("alt", work.title);

    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
}
function showWorks(filter) {
    const filteredWorks = works.filter((work) => {
        return filter == 0 || work.categoryId == filter;
    });
    gallery.innerHTML = "";
    addWorksToDocument(filteredWorks);
}


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
  
  // Function for edit the user photo
function editPhoto() {
    let editPhoto = document.querySelector("#edit-photo");
    let icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.textContent = "modifier";
    editPhoto.append(icon);
    editPhoto.append(link);
}
function editArticle() {
    let editArticle = document.querySelector("#edit-article");
    let icon = document.createElement("i");
    icon.classList.add("fa-regular", "fa-pen-to-square");
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.textContent = "modifier";
    editArticle.append(icon);
    editArticle.append(link);
}
  


showWorks();
getWorks();
getCategories();