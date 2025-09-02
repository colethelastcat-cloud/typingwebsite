const words = ["the", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog", "keyboard", "programming", "javascript", "html", "css", "developer", "website", "application", "computer", "typing", "speed"];

let currentWords = [];
let timer = 60;
let timerInterval;
let typedWords = 0;
let correctWords = 0;
let gameStarted = false;

const wordsContainer = document.getElementById('words-container');
const textInput = document.getElementById('text-input');
const timerDisplay = document.getElementById('timer');
const resultsDisplay = document.getElementById('results');

// Function to generate and display new words
function generateWords() {
    wordsContainer.innerHTML = '';
    currentWords = [];
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words[randomIndex];
        currentWords.push(word);
        const span = document.createElement('span');
        span.textContent = word + ' ';
        wordsContainer.appendChild(span);
    }
}

// Function to start the timer
function startTimer() {
    timer = 60;
    timerDisplay.textContent = timer;
    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

// Function to check the user's input
function checkInput() {
    if (!gameStarted) {
        gameStarted = true;
        startTimer();
        textInput.focus();
    }

    const typedText = textInput.value.trim();
    const lastTypedWord = typedText.split(' ').pop();

    const spans = wordsContainer.querySelectorAll('span');
    const firstWordSpan = spans[0];
    const firstWordText = firstWordSpan.textContent.trim();

    // Check for correct word when a space is typed
    if (typedText.endsWith(' ')) {
        typedWords++;
        if (lastTypedWord === firstWordText) {
            correctWords++;
            firstWordSpan.classList.add('correct');
        } else {
            firstWordSpan.classList.add('incorrect');
        }

        firstWordSpan.style.textDecoration = 'line-through';
        wordsContainer.removeChild(firstWordSpan);
        textInput.value = '';

        if (wordsContainer.children.length === 0) {
            generateWords();
        }
    }
}

// Function to end the game and show results
function endGame() {
    clearInterval(timerInterval);
    gameStarted = false;
    textInput.disabled = true;

    const wpm = correctWords;
    const accuracy = typedWords > 0 ? (correctWords / typedWords) * 100 : 0;

    resultsDisplay.innerHTML = `
        <p>Your WPM: ${wpm}</p>
        <p>Accuracy: ${accuracy.toFixed(2)}%</p>
    `;
}

// Event listeners
textInput.addEventListener('input', checkInput);

// Initial setup
generateWords();
