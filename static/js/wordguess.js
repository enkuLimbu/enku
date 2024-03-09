document.addEventListener("DOMContentLoaded", function() {
  // Define these variables at the top of your script
  var questionTextElement = document.getElementById("question-text");
  var optionsElements = document.querySelectorAll(".option");
  var feedbackMessageElement = document.getElementById("feedback-message");
  var correctCountElement = document.getElementById("correct-count");
  var wrongCountElement = document.getElementById("wrong-count");
  var tryAgainButton = document.getElementById("try-again-button");

  // Get the code from the query parameter or the window.quizCode variable
  var urlParams = new URLSearchParams(window.location.search);
  var codeFromUrl = urlParams.get('code');
  var quizCode = codeFromUrl || window.quizCode || "h01"; // Use code from URL, window.quizCode variable, or default to "h01"

  console.log(quizCode); // This should now log the correct value

  var score = 0;
  var currentQuestionIndex = 0;
  var currentCategory = "h01"; // Default category


var questionSets = {
  "h01": [
    { "correctAnswer": "あ", "options": ["あ", "い", "う", "え"], "question": "What is the first hiragana character in the 'a' column?" },
    { "correctAnswer": "か", "options": ["か", "き", "く", "け"], "question": "Which hiragana character is equivalent to the English letter 'ka'?" },
    { "correctAnswer": "さ", "options": ["さ", "し", "す", "せ"], "question": "What is the pronunciation of 'さ' in hiragana?" },
    { "correctAnswer": "た", "options": ["た", "ち", "つ", "て"], "question": "In the hiragana syllabary, which character comes after 'さ'?" },
    { "correctAnswer": "な", "options": ["な", "に", "ぬ", "ね"], "question": "Which hiragana character is equivalent to the English letter 'na'?" },
    { "correctAnswer": "ま", "options": ["ま", "み", "む", "め"], "question": "What is the pronunciation of 'ま' in hiragana?" },
    { "correctAnswer": "や", "options": ["や", "ゆ", "よ", "い"], "question": "In hiragana, which character is a part of the 'ya' series?" },
    { "correctAnswer": "ら", "options": ["ら", "り", "る", "れ"], "question": "Which hiragana character is equivalent to the English letter 'ra'?" },
    { "correctAnswer": "わ", "options": ["わ", "を", "ん", "れ"], "question": "In the hiragana syllabary, which character is used as a particle?" },
    { "correctAnswer": "ほ", "options": ["ほ", "へ", "は", "ひ"], "question": "Which hiragana character is equivalent to the English letter 'ho'?" },
    { "correctAnswer": "ぎ", "options": ["ぎ", "ぐ", "げ", "ご"], "question": "What is the pronunciation of 'ぎ' in hiragana?" },
    { "correctAnswer": "ぞ", "options": ["ぞ", "ぢ", "づ", "ぜ"], "question": "Which hiragana character is equivalent to the English letter 'zo'?" },
    { "correctAnswer": "ぶ", "options": ["ぶ", "べ", "ぼ", "ぱ"], "question": "In hiragana, which character is equivalent to the English letter 'bu'?" }
    // Add more questions for h01
  ],
  "k02": [
    { "correctAnswer": "ア", "options": ["ア", "イ", "ウ", "エ"], "question": "What is the first katakana character in the 'a' column?" },
    { "correctAnswer": "カ", "options": ["カ", "キ", "ク", "ケ"], "question": "Which katakana character is equivalent to the English letter 'ka'?" },
    { "correctAnswer": "サ", "options": ["サ", "シ", "ス", "セ"], "question": "In the katakana syllabary, which column does 'サ' belong to?" },
    { "correctAnswer": "タ", "options": ["タ", "チ", "ツ", "テ"], "question": "What is the pronunciation of 'タ' in katakana?" },
    { "correctAnswer": "ナ", "options": ["ナ", "ニ", "ヌ", "ネ"], "question": "In the katakana syllabary, which character comes after 'サ'?" },
    { "correctAnswer": "ハ", "options": ["ハ", "ヒ", "フ", "ヘ"], "question": "Which katakana character is equivalent to the English letter 'ha'?" },
    { "correctAnswer": "マ", "options": ["マ", "ミ", "ム", "メ"], "question": "What is the pronunciation of 'マ' in katakana?" },
    { "correctAnswer": "ヤ", "options": ["ヤ", "ユ", "ヨ", "イ"], "question": "In katakana, which character is a part of the 'ya' series?" },
    { "correctAnswer": "ラ", "options": ["ラ", "リ", "ル", "レ"], "question": "Which katakana character is equivalent to the English letter 'ra'?" },
    { "correctAnswer": "ワ", "options": ["ワ", "ヲ", "ン", "レ"], "question": "In the katakana syllabary, which character is used as a particle?" },
    { "correctAnswer": "ホ", "options": ["ホ", "ヘ", "ハ", "ヒ"], "question": "Which katakana character is equivalent to the English letter 'ho'?" },
    { "correctAnswer": "ギ", "options": ["ギ", "グ", "ゲ", "ゴ"], "question": "What is the pronunciation of 'ギ' in katakana?" },
    { "correctAnswer": "ゾ", "options": ["ゾ", "ジ", "ズ", "ゼ"], "question": "Which katakana character is equivalent to the English letter 'zo'?" },
    { "correctAnswer": "ブ", "options": ["ブ", "ベ", "ボ", "パ"], "question": "In katakana, which character is equivalent to the English letter 'bu'?" }
    // Add more questions for k02
  ],
  "j03": [
    { "correctAnswer": "人", "options": ["人", "口", "日", "月"], "question": "What is the meaning of the kanji character '人'?" },
    { "correctAnswer": "学", "options": ["学", "校", "生", "先"], "question": "Which kanji character means 'study' or 'learning'?" },
    { "correctAnswer": "食", "options": ["食", "飲", "飛", "飢"], "question": "What is the meaning of the kanji character '食'?" },
    { "correctAnswer": "先", "options": ["先", "生", "後", "前"], "question": "In the context of time, which kanji character means 'before'?" },
    { "correctAnswer": "本", "options": ["本", "東", "西", "南"], "question": "Which kanji character means 'book'?" },
    { "correctAnswer": "大", "options": ["大", "小", "中", "多"], "question": "What is the meaning of the kanji character '大'?" },
    { "correctAnswer": "国", "options": ["国", "都", "市", "村"], "question": "Which kanji character means 'country' or 'nation'?" },
    { "correctAnswer": "山", "options": ["山", "川", "田", "森"], "question": "What is the meaning of the kanji character '山'?" },
    { "correctAnswer": "水", "options": ["水", "火", "土", "風"], "question": "Which kanji character means 'water'?" },
    { "correctAnswer": "木", "options": ["木", "石", "金", "土"], "question": "What is the meaning of the kanji character '木'?" },
    { "correctAnswer": "火", "options": ["火", "風", "土", "水"], "question": "Which kanji character means 'fire'?" },
    { "correctAnswer": "金", "options": ["金", "木", "土", "水"], "question": "What is the meaning of the kanji character '金'?" },
    { "correctAnswer": "土", "options": ["土", "木", "火", "水"], "question": "Which kanji character means 'earth' or 'soil'?" }
    // Add more questions for j03
  ],
  "w04": [
    { "correctAnswer": "HTML", "options": ["HTML", "CSS", "JavaScript", "Python"], "question": "What does 'H' stand for in HTML?" },
    { "correctAnswer": "CSS", "options": ["C#", "C++", "CSS", "Java"], "question": "Which technology is used to style web pages?" },
    { "correctAnswer": "JavaScript", "options": ["Java", "Python", "JavaScript", "Ruby"], "question": "Which programming language is commonly used for web development?" },
    { "correctAnswer": "API", "options": ["API", "URL", "HTTP", "JSON"], "question": "What does 'A' stand for in API?" },
    { "correctAnswer": "Responsive Design", "options": ["Responsive Design", "Dark Mode", "SEO", "Cookies"], "question": "What ensures that a website looks good on all devices?" },
    { "correctAnswer": "Bootstrap", "options": ["Bootstrap", "jQuery", "React", "Angular"], "question": "Which framework is commonly used for building responsive and mobile-first websites?" },
    { "correctAnswer": "Git", "options": ["Git", "Sass", "npm", "Webpack"], "question": "Which version control system is widely used in web development?" },
    { "correctAnswer": "HTTP", "options": ["HTML", "HTTP", "URL", "CSS"], "question": "What protocol is used for transferring data over the web?" },
    { "correctAnswer": "DNS", "options": ["DNS", "DSL", "CPU", "RAM"], "question": "What system translates domain names to IP addresses?" },
    { "correctAnswer": "MySQL", "options": ["MySQL", "MongoDB", "SQLite", "PostgreSQL"], "question": "Which database management system is commonly used for web applications?" },
    { "correctAnswer": "Python", "options": ["Python", "JavaScript", "Ruby", "Java"], "question": "Which programming language is known for its readability and ease of use?" },
    { "correctAnswer": "URL", "options": ["URL", "HTTP", "API", "JSON"], "question": "What does 'U' stand for in URL?" },
    { "correctAnswer": "SEO", "options": ["SEO", "Responsive Design", "Dark Mode", "Cookies"], "question": "Which term refers to the practice of optimizing a website to rank higher in search engine results?" }
    // Add more questions for w04
  ]
};


  // Function to shuffle an array
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Function to display a question
  function displayQuestion(question) {
    if (!questionTextElement || !optionsElements || optionsElements.length === 0) {
      console.error("Missing HTML elements. Make sure they exist and the script is placed after them.");
      return;
    }

    // Display the question
    questionTextElement.textContent = question.question;

    // Shuffle options for a random order
    var shuffledOptions = question.options.slice();
    shuffleArray(shuffledOptions);

    // Display the options
    for (var i = 0; i < shuffledOptions.length && i < optionsElements.length; i++) {
      optionsElements[i].textContent = shuffledOptions[i];
      optionsElements[i].classList.remove("btn-success", "btn-danger"); // Reset button color
      optionsElements[i].disabled = false; // Enable the option
    }
  }

  // Function to reset the game
  function resetGame() {
    score = 0;
    currentQuestionIndex = 0;
    updateScore();
    selectCategory(quizCode); // Set default category based on quizCode
    displayNextQuestion();
  }

  // Function to update the score display
  function updateScore() {
    correctCountElement.textContent = score;
    wrongCountElement.textContent = currentQuestionIndex - score;
  }

  // Function to handle user's answer
  function checkAnswer(answer) {
    var currentQuestion = getCurrentQuestion();

    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      feedbackMessageElement.textContent = "Correct!";
      score++;
      optionsElements.forEach(function (option) {
        if (option.textContent === currentQuestion.correctAnswer) {
          option.classList.add("btn-success");
        } else {
          option.classList.add("btn-light"); // Reset other options to default color
          option.disabled = true; // Disable other options after correct answer
        }
      });
    } else {
      feedbackMessageElement.textContent = "Wrong! Try again.";
      optionsElements.forEach(function (option) {
        if (option.textContent === answer) {
          option.classList.add("btn-danger");
          option.disabled = true; // Disable the selected option after wrong answer
        }
      });
    }

    currentQuestionIndex++;
    updateScore();

    // Check if all questions are answered
    if (currentQuestionIndex < getCurrentQuestionSet().length) {
      displayNextQuestion();
    } else {
      // All questions answered, display score and try again button
      displayScore();
      displayTryAgainButton();
    }
  }

  // Function to get the current question based on the category and index
  function getCurrentQuestion() {
    var questionSet = questionSets[currentCategory];

    if (currentQuestionIndex < questionSet.length) {
      return questionSet[currentQuestionIndex];
    } else {
      // All questions have been answered, you may want to handle this case
      return null;
    }
  }

  // Function to get the current question set based on the category
  function getCurrentQuestionSet() {
    return questionSets[currentCategory];
  }

  // Function to display the next question
  function displayNextQuestion() {
    var currentQuestion = getCurrentQuestion();

    if (currentQuestion) {
      displayQuestion(currentQuestion);
    } else {
      // No more questions, you may want to handle this case
      console.log("Quiz completed!");
    }
  }

  // Function to display the score
  function displayScore() {
    questionTextElement.textContent = "Quiz completed! Your score: " + score;
    feedbackMessageElement.textContent = "";
  }

  // Function to display the "Try Again" button
  function displayTryAgainButton() {
    optionsElements.forEach(function (option) {
      option.disabled = true;
    });
    tryAgainButton.style.display = "block";
  }

  // Function to select the category
  function selectCategory(category) {
    currentCategory = category;
  }

  // Add event listeners to handle button clicks
  optionsElements.forEach(function (option, index) {
    option.addEventListener("click", function () {
      checkAnswer(option.textContent);
    });
  });

  // Try Again button click event
  tryAgainButton.addEventListener("click", function () {
    tryAgainButton.style.display = "none";
    resetGame();
  });

  // Initial setup
  resetGame();
});
