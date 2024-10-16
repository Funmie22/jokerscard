const cardFront = document.getElementById("card1");
const cardBack = document.getElementById("card2");
const button = document.getElementById("button");
const nextButton = document.getElementById("nextButton");

let jokes = [];
let currentJokeIndex = 0;
async function fetchAndDisplayJokes() {
    try {
        const response = await fetch('https://official-joke-api.appspot.com/random_ten');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        jokes = await response.json();
        displayJoke(currentJokeIndex);
    } catch (error) {
        console.error('Error fetching and displaying jokes:', error);
    }
}

function displayJoke(index) {
    if (jokes[index]) {
        cardFront.textContent = jokes[index].setup;
        cardBack.textContent = jokes[index].punchline;
        cardFront.style.opacity = 1;
        cardBack.style.opacity = 0;
        cardFront.style.zIndex = 1;
        cardBack.style.zIndex = 0;
    }
}

function flipCard() {
    if (cardFront.style.opacity === '1') {
        cardFront.style.opacity = 0;
        cardBack.style.opacity = 1;
        cardFront.style.zIndex = 0;
        cardBack.style.zIndex = 1;
    } else {
        cardFront.style.opacity = 1;
        cardBack.style.opacity = 0;
        cardFront.style.zIndex = 1;
        cardBack.style.zIndex = 0;
    }
}

function showNextJoke() {
    currentJokeIndex = (currentJokeIndex + 1) % jokes.length;
    displayJoke(currentJokeIndex);
}

button.addEventListener('click', flipCard);
nextButton.addEventListener('click', showNextJoke);

fetchAndDisplayJokes();
