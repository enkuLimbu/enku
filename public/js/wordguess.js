// Variables
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let shuffledOptions = [];

// Function to reset game
function resetGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;

    // Reset button colors
    resetButtonColors();

    // Display options
    document.getElementById("options").style.display = "block";
    document.getElementById("try-again-button").style.display = "none";

    // Update score display
    updateScoreDisplay();

    // Randomize the order of questions
    questions = shuffleArray(questions);

    // Display the first question
    displayQuestion();
}

// Function to reset button colors
function resetButtonColors() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`option-${i}`).style.backgroundColor = "";
    }
}

// Function to update score display
function updateScoreDisplay() {
    document.getElementById("correct-count").innerText = correctAnswers.toString();
    document.getElementById("wrong-count").innerText = wrongAnswers.toString();
}

// Function to display the current question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        const questionText = currentQuestion.question;
        const options = currentQuestion.options;

        // Display question text
        document.getElementById("question-text").innerText = questionText;

        // Randomize the order of options
        shuffledOptions = shuffleArray(options);

        // Display options
        for (let i = 1; i <= 4; i++) {
            const optionButton = document.getElementById(`option-${i}`);
            optionButton.innerText = shuffledOptions[i - 1];

            // Add click event listener to each option
            optionButton.addEventListener("click", function () {
                checkAnswer(shuffledOptions[i - 1]);
            });
        }
    } else {
        // Display final score and "Try Again" button
        document.getElementById("question-text").innerText = "Game Over! Your Score:";
        document.getElementById("options").style.display = "none";
        document.getElementById("try-again-button").style.display = "block";
        document.getElementById("feedback-message").innerText = `Correct: ${correctAnswers} | Wrong: ${wrongAnswers}`;

        // Add click event listener to "Try Again" button
        document.getElementById("try-again-button").addEventListener("click", resetGame);
    }
}

// Function to check the user's answer
function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    if (userAnswer === correctAnswer) {
        // Correct answer
        document.getElementById(`option-${shuffledOptions.indexOf(correctAnswer) + 1}`).style.backgroundColor = "green";
        correctAnswers++;
    } else {
        // Incorrect answer
        document.getElementById(`option-${shuffledOptions.indexOf(userAnswer) + 1}`).style.backgroundColor = "red";
        wrongAnswers++;
    }

    // Move to the next question
    currentQuestionIndex++;

    // Delay for a moment to display feedback before moving to the next question
    setTimeout(() => {
        // Reset button colors
        resetButtonColors();

        // Display the next question
        displayQuestion();

        // Update score display
        updateScoreDisplay();
    }, 1000);
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.addEventListener("DOMContentLoaded", function () {
    // Fetch questions from the current Hugo page's frontmatter
    const frontmatterElement = document.getElementById("hugo-frontmatter");

    if (frontmatterElement) {
        const frontmatter = JSON.parse(decodeURIComponent(frontmatterElement.innerText));

        if (frontmatter && frontmatter.quiz === true && frontmatter.questions) {
            questions = frontmatter.questions;

            // Log questions to console
            console.log("Questions:", questions);

            // Randomize the order of questions
            questions = shuffleArray(questions);

            // Start the game with the first question
            displayQuestion();
        }
    }
});
