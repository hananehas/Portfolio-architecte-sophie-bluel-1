const token = localStorage.getItem("token");
const btnLogin = document.getElementById("login");
if (token !== "" && token !== null) {
    fetch("http://localhost:5678/api/works")
    // Logout function to remove the token
    btnLogin.innerHTML = "logout";
    btnLogin.addEventListener("click", function () {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        btnLogin.setAttribute("href", "index.html");
    });
    edit();
    blackBar();
    let openModalButton = document.getElementById("openModalButton");
    openModalButton.style.display = "block";
} else {


}
    // Call functio to create filters with categories ID in the gallery

function getAllWorksAndCategories() {
    fetch("http://localhost:5678/api/works")
        .then( (res)=>res.json())
        .then((works)=> {
            fetch("http://localhost:5678/api/categories")
                .then((res)=> {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then( (categories)=> {
                    const filtersContainer = document.getElementById("filtersButtons");
                    const gallery = document.getElementById("gallery");
                    gallery.innerHTML = "";

                    if (token === null) { // Vérifie si le token est présent ou non
                        const filterAll = document.createElement("li");
                        filterAll.setAttribute("id", 0);
                        filterAll.innerHTML = "Tous";
                        filterAll.classList.add("filters", "filterSelected");
                        filtersContainer.appendChild(filterAll);

                        categories.forEach(function (category) {
                            const filters = document.createElement("li");
                            filters.innerText = category.name;
                            filters.id = category.id;
                            filters.classList.add("filters");
                            filtersContainer.appendChild(filters);
                            filterSelected(filters, works);
                        });

                        filterSelected(filterAll, works);
                    }

                    if (works.length > 0) {
                        showWorks(works, 0);
                    }
                })
                .catch(function (err) {
                    console.error(err);
                });
        })
        .catch(function (err) {
            console.error(err);
        });
}

getAllWorksAndCategories();
    

//function for mooving the selectedfilter
function filterSelected(element, works) {
    element.addEventListener("click", function () {
        const activeFilter = document.getElementsByClassName("filterSelected");
        if (activeFilter.length !== 0) {
            Array.from(activeFilter).forEach(function (element) {
                element.classList.remove("filterSelected");
            });
        }
        element.classList.add("filterSelected");
        showWorks(works, element.id);
    });
}
//function to show works in gallery
function showWorks(works, categoryValue) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    if (categoryValue == 0) {
        works.forEach(function (work) {
            addWork(work);
        });
    } else {
        works.forEach(function (work) {
            if (categoryValue == work.categoryId) {
                addWork(work);
            }
        });
    }
}
// function to create figure 
function addWork(work) {
    const gallery = document.getElementById("gallery");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");

    figure.id = "gallery-project-work-"+work.id;
    figure.dataset.id=work.id;
    img.src = work.imageUrl;
    caption.innerText = work.title;

    img.setAttribute("alt", work.title);

    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
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

    articleElement.appendChild(editButton);
    photoElement.appendChild(editButton.cloneNode(true));
}
// fonction to create blacknav for mode edition
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