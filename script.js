
const menuIcon = document.querySelector('.menu-icon');
const nav = document.querySelector('nav');

menuIcon.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Main JS

// Nav Btns 
const generalBtn = document.getElementById('general');
const sportsBtn = document.getElementById('sports');
const businessBtn = document.getElementById('business');
const technologyBtn = document.getElementById('technology');
const healthBtn = document.getElementById('health');
const searchBtn = document.getElementById('search');

const newsInput = document.getElementById('newsInput');
const typeHeading = document.getElementById('typeHeading');
const newsDetails = document.getElementById('newsDetails');
const col = document.querySelector('.col');

// APIS
const API_KEY = '8c43818d23c943bb8cb3d701cd576db8';
const HEADLINE_NEWS = 'https://newsapi.org/v2/top-headlines?country=rs&apiKey=';
const GENERAL_NEWS = 'https://newsapi.org/v2/top-headlines?country=rs&category=general&apiKey=';
const SPORTS_NEWS = 'https://newsapi.org/v2/top-headlines?country=rs&category=sports&apiKey=';
const BUSINESS_NEWS = 'https://newsapi.org/v2/top-headlines?country=rs&category=business&apiKey=';
const TECHNOLOGY_NEWS = 'https://newsapi.org/v2/top-headlines?country=rs&category=technology&apiKey=';
const HEALTH_NEWS = 'https://newsapi.org/v2/top-headlines?country=rs&category=health&apiKey=';
const SEARCH_NEWS = 'https://newsapi.org/v2/everything?q=';

let newsArr = [];
console.log(newsArr);

// On Load
window.onload = function() {
    typeHeading.textContent = 'Headlines';
    fetchHeadlines();
}

// ADD EVENT LISTENERS
generalBtn.addEventListener('click', () => {
    typeHeading.textContent = 'General';
    fetchGeneralNews();
});

sportsBtn.addEventListener('click', () => {
    typeHeading.textContent = 'Sports';
    fetchSportsNews();
});

businessBtn.addEventListener('click', () => {
    typeHeading.textContent = 'Business';
    fetchBusinessNews();
});

technologyBtn.addEventListener('click', () => {
    typeHeading.textContent = 'Technology';
    fetchTechnologyNews();
});

healthBtn.addEventListener('click', () => {
    typeHeading.textContent = 'Health';
    fetchHealthNews();
});

searchBtn.addEventListener("click",function(){
    typeHeading.textContent = `Search: ${newsInput.value}`;
    fetchQueryNews();
});

const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS+API_KEY);
    newsArr = [];
    if(response.status >= 200 && response.status < 300) {
        const data = await response.json();
        newsArr = data.articles;
    } else {
        // handle errors
        console.log("PROBLEM");
        newsDetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS+API_KEY);
    newsArr = [];
    if(response.status >= 200 && response.status < 300) {
        const data = await response.json();
        newsArr = data.articles;
    } else {
        // handle errors
        console.log("PROBLEM");
        newsDetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS+API_KEY);
    newsArr = [];
    if(response.status >= 200 && response.status < 300) {
        const data = await response.json();
        newsArr = data.articles;
    } else {
        // handle errors
        console.log("PROBLEM");
        newsDetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsArr = [];
    if(response.status >= 200 && response.status < 300) {
        const data = await response.json();
        newsArr = data.articles;
    } else {
        // handle errors
        console.log("PROBLEM");
        newsDetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchHealthNews = async () => {
    const response = await fetch(HEALTH_NEWS+API_KEY);
    newsArr = [];
    if(response.status >= 200 && response.status < 300) {
        const data = await response.json();
        newsArr = data.articles;
    } else {
        // handle errors
        console.log("PROBLEM");
        newsDetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

const fetchQueryNews = async () => {
    if (newsInput.value === null) return;
        const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsInput.value)+"&apiKey="+API_KEY);
        newsArr = [];
        if (response.status >= 200 && response.status < 300) {
            const data = await response.json();
            newsArr = data.articles;
        } else {
            console.log(response.status, response.statusText);
            newsDetails.innerHTML = '<h5>No data found</h5>';
            return;
        }
        displayNews();
}

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINE_NEWS+API_KEY);
    newsArr = [];
    if (response.status >= 200 && response.status < 300) {
        const data = await response.json();
        newsArr = data.articles;
    } else {
        console.log(response.status, response.statusText);
        newsDetails.innerHTML = '<h5>No data found</h5>';
        return;
    }
    displayNews();
}

function displayNews() {
    col.innerHTML = '';
    newsArr.forEach(news => {
        // CARD
        const card = document.createElement('div');
        card.classList.add('card');
        // CARD IMAGE
        const img = document.createElement('img');
        img.src = news.urlToImage;
        img.alt = 'News Image';
        // CARD BODY
        const cardBody = document.createElement('div');
        cardBody.classList.add('cardBody');
        // NEWS HEADING
        const newsHeading = document.createElement('h5');
        newsHeading.classList.add('newsHeading');
        newsHeading.textContent = news.title;
        // DATE HEADING
        const dateHeading = document.createElement('h6');
        dateHeading.classList.add('dateHeading');
        let date = news.publishedAt.split("T");
        dateHeading.textContent = date[0];
        // DESCRIPTION
        const description = document.createElement('p');
        description.classList.add('description');
        description.textContent = news.description;
        // LINK BUTTON
        const link = document.createElement('a');
        link.classList.add('link');
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.textContent = 'Read More';

        // Append
        cardBody.append(newsHeading, dateHeading, description, link);
        card.append(img, cardBody);
        col.appendChild(card);
        newsDetails.appendChild(col);
    });
}