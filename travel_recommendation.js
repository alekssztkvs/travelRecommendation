
let travelData;



fetch('travel_recommendation_api.json')
    .then (response=>response.json())
    .then (data =>  {
        travelData = data;
    })


const searchBtn = document.getElementById("srchBtn");
const resultCard = document.getElementById("resultCard");
const heroBox = document.getElementById("heroBox");
const pageContent = document.querySelectorAll(".page-content");
const searchInput = document.getElementById("search");

function makeSearch() {
    resultCard.style.display = "flex";
    pageContent.forEach(el => {
        el.classList.add("hidden");
    });
    const keyword = document.getElementById("search").value.toLowerCase();
    
    resultCard.innerHTML = "";

    if (keyword.includes("temple")) {
        renderCards(travelData.temples);
    }
    else if (keyword.includes("countr"))
    {
        travelData.countries.forEach(country=> {
            renderCards(country.cities);
        });
    }
    else if (keyword.includes('beach'))
    {
        renderCards(travelData.beaches);
    }
    else {
        resultCard.style.display = "none";
        pageContent.forEach(el => {
            el.classList.remove("hidden");
        });
    }
    //clear user input in search
    searchInput.value = "";
}

searchBtn.addEventListener("click", makeSearch);


function renderCards(array) {
    array.forEach(item => {
        const newCard = document.createElement('div');
        newCard.classList.add('result-card');

        const img = document.createElement('img');
        img.src = item.imageUrl;

        const title = document.createElement('h2');
        title.textContent = item.name;

        const description = document.createElement('p');
        description.textContent = item.description;

        newCard.appendChild(img);
        newCard.appendChild(title);
        newCard.appendChild(description);

        resultCard.appendChild(newCard);
    });
}

function restoreOriginalContent() {
    //heroBox.style.display = "block";
    resultCard.style.display = "none";
    pageContent.forEach(el => {
        el.classList.remove("hidden");
    });
}

const clearButton = document.getElementById("clrBtn");
clearButton.addEventListener("click", restoreOriginalContent);

searchInput.addEventListener("keydown", function(event) {
    if(event.key==="Enter") {
        event.preventDefault(); //prevent submitting
        makeSearch();
    }
})