const questions = {
    general: [
        { question: "What is the capital of France?", answers: ["Paris", "London", "Rome", "Berlin"], correct: "Paris" },
        { question: "Who wrote 'Hamlet'?", answers: ["Shakespeare", "Tolkien", "Austen", "Hemingway"], correct: "Shakespeare" }
    ],
    science: [
        { question: "What is the chemical symbol for water?", answers: ["H2O", "CO2", "O2", "N2"], correct: "H2O" },
        { question: "Which planet is known as the Red Planet?", answers: ["Mars", "Venus", "Jupiter", "Saturn"], correct: "Mars" }
    ],
    history: [
        { question: "Who discovered America?", answers: ["Columbus", "Newton", "Einstein", "Tesla"], correct: "Columbus" },
        { question: "What year did World War 2 end?", answers: ["1945", "1918", "1939", "1950"], correct: "1945" }
    ]
};

let timer;
let timeLeft = 10;
let score = 0;
let currentQuestionIndex = 0;
let selectedCategory = "general";

document.getElementById("start-btn").addEventListener("click", () => {
    selectedCategory = document.getElementById("category").value;
    document.getElementById("category-container").classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    startGame();
});

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= questions[selectedCategory].length) {
        alert(`Quiz Over! Your Score: ${score}`);
        updateLeaderboard(score);
        document.getElementById("category-container").classList.remove("hidden");
        document.getElementById("quiz-box").classList.add("hidden");
        return;
    }

    const questionData = questions[selectedCategory][currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";
    
    questionData.answers.forEach(answer => {
        const li = document.createElement("li");
        li.textContent = answer;
        li.addEventListener("click", () => checkAnswer(answer, questionData.correct));
        answersContainer.appendChild(li);
    });

    resetTimer();
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score += 10;
    }
    currentQuestionIndex++;
    loadQuestion();
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("time").textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Time's up!");
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}

function updateLeaderboard(finalScore) {
    const leaderboard = document.getElementById("leaderboard-list");
    const li = document.createElement("li");
    li.textContent = `Player: ${finalScore} points`;
    leaderboard.appendChild(li);
}
