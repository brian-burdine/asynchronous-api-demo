// main.js

// const axios = require('axios');
// const { default: axios } = require("axios");

// const API_KEY = '';
// const BASE_URL = '';
// let options = {
//   baseURL : BASE_URL,
//   params: {
//     key: value
//   }
// }

// Default prototype
// axios.get(url, options).then(function (response) {}).catch(function (error) {}).then(function () {/*always executed*/});

// Joke types: general, knock-knock, programming, dad (not a lot of these)

// function init(){
//     const fetchPromise = fetch("https://official-joke-api.appspot.com/random_ten");
//     fetchPromise
//         .then((response) => {
//             if (!response.ok) {
//             throw new Error(`HTTP error: ${response.status}`);
//             }
//             const jokes = response.json();
//             console.log(jokes);
//         });
// }
// init();

function getJokes () {
    const BASE_URL = 'https://official-joke-api.appspot.com/';
    const randomTenUrl = '/random_ten';

    let jokes = {};

    axios.get(BASE_URL + randomTenUrl)
        .then(function (response) {
            jokes = response.data;
            console.log(jokes);
            for (let joke of jokes) {
                console.log(joke);
                displayJoke(joke);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function displayJoke(joke) {
    const list = document.getElementById('jokes-target');
    let listItem = document.createElement('li');
    
    let name = document.createElement('p');
    name.classList.add("bg-info");
    name.classList.add("text-tertiary")
    name.classList.add("lead");
    name.innerHTML = joke.id + ": Type: " + joke.type;
    listItem.appendChild(name);

    let setup = document.createElement('p');
    setup.classList.add("bg-warning");
    setup.innerText = joke.setup;
    listItem.appendChild(setup);

    let punchline = document.createElement('p');
    punchline.classList.add("text-success");
    punchline.innerText = joke.punchline;
    listItem.appendChild(punchline);
    
    list.appendChild(listItem);
}

getJokes();

const catFactTrigger = document.getElementById('catfact-trigger');
catFactTrigger.addEventListener('click', getCatFact);

function getCatFact () {
    let url = "https://catfact.ninja/fact";
    let fact = {};
    axios.get(url)
        .then(function (response) {
            fact = response.data;
            console.log(fact);
            displayCatFact(fact.fact);
        })
        .catch(function (error) {
            console.log(error)
        });
}

function displayCatFact(fact) {
    const list = document.getElementById('catfact-target');
    let listItem = document.createElement('li');
    listItem.innerText = fact;
    list.appendChild(listItem);
}

const zipCodeTrigger = document.getElementById('zip-code-trigger');
zipCodeTrigger.addEventListener('click', getZipCode);

function getZipCode () {
    const zipCodeEntry = document.getElementById('zip-code-entry');
    let zipCode = zipCodeEntry.value;
    let country = "us";

    let zippo = {
        baseURL : "https://api.zippopotam.us"
    }

    axios.get("/" + country + "/" + zipCode, zippo)
        .then(function (response) {
            console.log(response);  
            for (let place of response.data.places) {
                console.log(place.state);
                console.log(place["place name"]);
            }
            displayZipCode(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });      
}

function displayZipCode (zipCode) {
    const zipCodeParent = document.getElementById('zip-code');
    
    let header = document.createElement('p'); 
    header.innerText = "Locales of " + zipCode["post code"];
    header.classList.add("lead");
    zipCodeParent.appendChild(header);

    let list = document.createElement('ul');
    for (let place of zipCode.places) {
        let listItem = document.createElement('li');
        listItem.innerText = place["place name"] + ", " + place.state;
        list.appendChild(listItem);
    }
    zipCodeParent.appendChild(list);
}

// let zippo = {
//   baseURL : "https://api.zippopotam.us"
// }
// let country = "us";
// let postalCode = "90210"
// axios.get("/" + country + "/" + postalCode, zippo)
//     .then(function (response) {
//         console.log(response);
//         for (let place of response.data.places) {
//             console.log(place.state);
//             console.log(place["place name"]);
//         }
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// // Event parameter example
// let button = document.getElementById("demo");
//   button.addEventListener("mousedown", event => {
//     if (event.button == 0) {
//       console.log("Left button");
//     } else if (event.button == 1) {
//       console.log("Middle button");
//     } else if (event.button == 2) {
//       console.log("Right button");
//     }
//   });
