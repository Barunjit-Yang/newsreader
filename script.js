const userDetailsLayout = document.querySelector(".userDetailsLayout")
const inputButton = document.querySelector(".SignInButton")
const closeButton = document.querySelector(".closeButton")

inputButton.addEventListener("click", ()=>{
    userDetailsLayout.style.display = "flex";
})
closeButton.addEventListener("click", ()=>{
    userDetailsLayout.style.display = "none"
})

const APIkey = "129ce82e1f0b4833a2f3210499062ddd";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=> fetchNews("India"));

function reloadPage(){
    window.location.reload();
}

//making url string
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${APIkey}`)
    const data = await res.json();
    // console.log(data)
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer = document.getElementById("cardsContainer");
    const newsCardTemplate = document.getElementById("templateNewsCard")

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage)
        return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

//making a clone of the card
function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#newsImg");
    const newsTitle = cardClone.querySelector("#newsTitle");    
    const newsSource = cardClone.querySelector("#newsSource");    
    const newsDesc = cardClone.querySelector("#newsDesc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    
    const date = new Date(article.publishedAt).toLocaleString("en-us", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardClone.firstElementChild.addEventListener(`click`, ()=>{
        window.open(article.url, "_blank")
    })
}

//selecting topics on nav
let currentSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add("active");
}

//triggering a button to search with reference to the input
// const searchButton = document.getElementById("searchButton")
const inputSearch = document.getElementById("inputSearch")

// searchButton.addEventListener("click", ()=>{
//     const query = inputSearch.value;
//     if(!query) return;
//     fetchNews(query);
//     currentSelectedNav?.classList.remove('active');
//     currentSelectedNav = null;
// })
inputSearch.addEventListener("keypress", ()=>{
    const query = inputSearch.value;
    if(!query) return;
    if(event.keyCode == 13)
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
})