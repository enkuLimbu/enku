document.addEventListener("DOMContentLoaded", function() {
  // Get the required HTML elements
  const questionTextElement = document.getElementById('question-word');
  const userInputElement = document.getElementById('user-input');
  const feedbackMessageElement = document.getElementById('feedback-word');
  const confirmButton = document.getElementById('confirm-button');
  const scoreElement = document.getElementById('score-word');

// Get the code from the query parameter or the window.quizCode variable
var urlParams = new URLSearchParams(window.location.search);
var codeFromUrl = urlParams.get('code');
var wordCode = codeFromUrl || window.wordCode || "000"; // Use code from URL, window.quizCode variable, or default to "h01"

  // Define question sets
  const questionSets = {
"h01": [
  { "correctAnswer": "あ", "question": "What is the following sound in hiragana: a" },
  { "correctAnswer": "い", "question": "What is the following sound in hiragana: i" },
  { "correctAnswer": "う", "question": "What is the following sound in hiragana: u" },
  { "correctAnswer": "え", "question": "What is the following sound in hiragana: e" },
  { "correctAnswer": "お", "question": "What is the following sound in hiragana: o" },
  { "correctAnswer": "か", "question": "What is the following sound in hiragana: ka" },
  { "correctAnswer": "き", "question": "What is the following sound in hiragana: ki" },
  { "correctAnswer": "く", "question": "What is the following sound in hiragana: ku" },
  { "correctAnswer": "け", "question": "What is the following sound in hiragana: ke" },
  { "correctAnswer": "こ", "question": "What is the following sound in hiragana: ko" },
  { "correctAnswer": "さ", "question": "What is the following sound in hiragana: sa" },
  { "correctAnswer": "し", "question": "What is the following sound in hiragana: shi" },
  { "correctAnswer": "す", "question": "What is the following sound in hiragana: su" },
  { "correctAnswer": "せ", "question": "What is the following sound in hiragana: se" },
  { "correctAnswer": "そ", "question": "What is the following sound in hiragana: so" },
  { "correctAnswer": "た", "question": "What is the following sound in hiragana: ta" },
  { "correctAnswer": "ち", "question": "What is the following sound in hiragana: chi" },
  { "correctAnswer": "つ", "question": "What is the following sound in hiragana: tsu" },
  { "correctAnswer": "て", "question": "What is the following sound in hiragana: te" },
  { "correctAnswer": "と", "question": "What is the following sound in hiragana: to" },
  { "correctAnswer": "な", "question": "What is the following sound in hiragana: na" },
  { "correctAnswer": "に", "question": "What is the following sound in hiragana: ni" },
  { "correctAnswer": "ぬ", "question": "What is the following sound in hiragana: nu" },
  { "correctAnswer": "ね", "question": "What is the following sound in hiragana: ne" },
  { "correctAnswer": "の", "question": "What is the following sound in hiragana: no" },
  { "correctAnswer": "は", "question": "What is the following sound in hiragana: ha" },
  { "correctAnswer": "ひ", "question": "What is the following sound in hiragana: hi" },
  { "correctAnswer": "ふ", "question": "What is the following sound in hiragana: fu" },
  { "correctAnswer": "へ", "question": "What is the following sound in hiragana: he" },
  { "correctAnswer": "ほ", "question": "What is the following sound in hiragana: ho" },
  { "correctAnswer": "ま", "question": "What is the following sound in hiragana: ma" },
  { "correctAnswer": "み", "question": "What is the following sound in hiragana: mi" },
  { "correctAnswer": "む", "question": "What is the following sound in hiragana: mu" },
  { "correctAnswer": "め", "question": "What is the following sound in hiragana: me" },
  { "correctAnswer": "も", "question": "What is the following sound in hiragana: mo" },
  { "correctAnswer": "や", "question": "What is the following sound in hiragana: ya" },
  { "correctAnswer": "ゆ", "question": "What is the following sound in hiragana: yu" },
  { "correctAnswer": "よ", "question": "What is the following sound in hiragana: yo" },
  { "correctAnswer": "ら", "question": "What is the following sound in hiragana: ra" },
  { "correctAnswer": "り", "question": "What is the following sound in hiragana: ri" },
  { "correctAnswer": "る", "question": "What is the following sound in hiragana: ru" },
  { "correctAnswer": "れ", "question": "What is the following sound in hiragana: re" },
  { "correctAnswer": "ろ", "question": "What is the following sound in hiragana: ro" },
  { "correctAnswer": "わ", "question": "What is the following sound in hiragana: wa" },
  { "correctAnswer": "を", "question": "What is the following sound in hiragana: wo" },
  { "correctAnswer": "ん", "question": "What is the following sound in hiragana: n" },
  // ... Add more hiragana questions as needed
  ],

  "h12": [
  { "correctAnswer": "を", "question": "What is the following sound in hiragana: wo" },
    ],

  "k02": [
  { "correctAnswer": "エ", "question": "What is the following sound in katakana: e" },
  { "correctAnswer": "オ", "question": "What is the following sound in katakana: o" },
  { "correctAnswer": "カ", "question": "What is the following sound in katakana: ka" },
  { "correctAnswer": "キ", "question": "What is the following sound in katakana: ki" },
  { "correctAnswer": "ク", "question": "What is the following sound in katakana: ku" },
  { "correctAnswer": "ケ", "question": "What is the following sound in katakana: ke" },
  { "correctAnswer": "コ", "question": "What is the following sound in katakana: ko" },
  { "correctAnswer": "サ", "question": "What is the following sound in katakana: sa" },
  { "correctAnswer": "シ", "question": "What is the following sound in katakana: shi" },
  { "correctAnswer": "ス", "question": "What is the following sound in katakana: su" },
  { "correctAnswer": "セ", "question": "What is the following sound in katakana: se" },
  { "correctAnswer": "ソ", "question": "What is the following sound in katakana: so" },
  { "correctAnswer": "タ", "question": "What is the following sound in katakana: ta" },
  { "correctAnswer": "チ", "question": "What is the following sound in katakana: chi" },
  { "correctAnswer": "ツ", "question": "What is the following sound in katakana: tsu" },
  { "correctAnswer": "テ", "question": "What is the following sound in katakana: te" },
  { "correctAnswer": "ト", "question": "What is the following sound in katakana: to" },
  { "correctAnswer": "ナ", "question": "What is the following sound in katakana: na" },
  { "correctAnswer": "ニ", "question": "What is the following sound in katakana: ni" },
  { "correctAnswer": "ヌ", "question": "What is the following sound in katakana: nu" },
  { "correctAnswer": "ネ", "question": "What is the following sound in katakana: ne" },
  { "correctAnswer": "ノ", "question": "What is the following sound in katakana: no" },
  { "correctAnswer": "ハ", "question": "What is the following sound in katakana: ha" },
  { "correctAnswer": "ヒ", "question": "What is the following sound in katakana: hi" },
  { "correctAnswer": "フ", "question": "What is the following sound in katakana: fu" },
  { "correctAnswer": "ヘ", "question": "What is the following sound in katakana: he" },
  { "correctAnswer": "ホ", "question": "What is the following sound in katakana: ho" },
  { "correctAnswer": "マ", "question": "What is the following sound in katakana: ma" },
  { "correctAnswer": "ミ", "question": "What is the following sound in katakana: mi" },
  { "correctAnswer": "ム", "question": "What is the following sound in katakana: mu" },
  { "correctAnswer": "メ", "question": "What is the following sound in katakana: me" },
  { "correctAnswer": "モ", "question": "What is the following sound in katakana: mo" },
  { "correctAnswer": "ヤ", "question": "What is the following sound in katakana: ya" },
  { "correctAnswer": "ユ", "question": "What is the following sound in katakana: yu" },
  { "correctAnswer": "ヨ", "question": "What is the following sound in katakana: yo" },
  { "correctAnswer": "ラ", "question": "What is the following sound in katakana: ra" },
  { "correctAnswer": "リ", "question": "What is the following sound in katakana: ri" },
  { "correctAnswer": "ル", "question": "What is the following sound in katakana: ru" },
  { "correctAnswer": "レ", "question": "What is the following sound in katakana: re" },
  { "correctAnswer": "ロ", "question": "What is the following sound in katakana: ro" },
  { "correctAnswer": "ワ", "question": "What is the following sound in katakana: wa" },
  { "correctAnswer": "ヲ", "question": "What is the following sound in katakana: wo" },
  { "correctAnswer": "ン", "question": "What is the following sound in katakana: n" },
  // ... Add more katakana questions as needed 
],

  "j03": [
  { "correctAnswer": "一", "question": "Write the following kanji character: one" },
  { "correctAnswer": "二", "question": "Write the following kanji character: two" },
  { "correctAnswer": "三", "question": "Write the following kanji character: three" },
  { "correctAnswer": "四", "question": "Write the following kanji character: four" },
  { "correctAnswer": "五", "question": "Write the following kanji character: five" },
  { "correctAnswer": "六", "question": "Write the following kanji character: six" },
  { "correctAnswer": "七", "question": "Write the following kanji character: seven" },
  { "correctAnswer": "八", "question": "Write the following kanji character: eight" },
  { "correctAnswer": "九", "question": "Write the following kanji character: nine" },
  { "correctAnswer": "十", "question": "Write the following kanji character: ten" },
  { "correctAnswer": "百", "question": "Write the following kanji character: hundred" },
  { "correctAnswer": "千", "question": "Write the following kanji character: thousand" },
  { "correctAnswer": "万", "question": "Write the following kanji character: ten thousand" },
  { "correctAnswer": "円", "question": "Write the following kanji character: yen" },
  { "correctAnswer": "日", "question": "Write the following kanji character: day" },
  { "correctAnswer": "月", "question": "Write the following kanji character: month" },
  { "correctAnswer": "火", "question": "Write the following kanji character: fire" },
  { "correctAnswer": "水", "question": "Write the following kanji character: water" },
  { "correctAnswer": "木", "question": "Write the following kanji character: tree" },
  { "correctAnswer": "金", "question": "Write the following kanji character: gold" },
  { "correctAnswer": "土", "question": "Write the following kanji character: soil" },
  { "correctAnswer": "空", "question": "Write the following kanji character: sky" },
  { "correctAnswer": "風", "question": "Write the following kanji character: wind" },
  { "correctAnswer": "雨", "question": "Write the following kanji character: rain" },
  { "correctAnswer": "雪", "question": "Write the following kanji character: snow" },
  { "correctAnswer": "花", "question": "Write the following kanji character: flower" },
  { "correctAnswer": "山", "question": "Write the following kanji character: mountain" },
  { "correctAnswer": "川", "question": "Write the following kanji character: river" },
  { "correctAnswer": "海", "question": "Write the following kanji character: sea" },
  { "correctAnswer": "人", "question": "Write the following kanji character: person" },
  { "correctAnswer": "名", "question": "Write the following kanji character: name" },
  { "correctAnswer": "男", "question": "Write the following kanji character: man" },
  { "correctAnswer": "女", "question": "Write the following kanji character: woman" },
  { "correctAnswer": "子", "question": "Write the following kanji character: child" },
  { "correctAnswer": "学", "question": "Write the following kanji character: study" },
  { "correctAnswer": "校", "question": "Write the following kanji character: school" },
  { "correctAnswer": "先", "question": "Write the following kanji character: ahead" },
  { "correctAnswer": "生", "question": "Write the following kanji character: life" },
  { "correctAnswer": "年", "question": "Write the following kanji character: year" },
  { "correctAnswer": "間", "question": "Write the following kanji character: space" },
  { "correctAnswer": "時", "question": "Write the following kanji character: time" },
  { "correctAnswer": "今", "question": "Write the following kanji character: now" },
  { "correctAnswer": "午", "question": "Write the following kanji character: noon" },
  { "correctAnswer": "後", "question": "Write the following kanji character: behind" },
  { "correctAnswer": "前", "question": "Write the following kanji character: front" },
  { "correctAnswer": "中", "question": "Write the following kanji character: inside" },
  { "correctAnswer": "外", "question": "Write the following kanji character: outside" },
  { "correctAnswer": "上", "question": "Write the following kanji character: up" },
  { "correctAnswer": "下", "question": "Write the following kanji character: down" },
  { "correctAnswer": "左", "question": "Write the following kanji character: left" },
  { "correctAnswer": "右", "question": "Write the following kanji character: right" },
  { "correctAnswer": "手", "question": "Write the following kanji character: hand" },
  { "correctAnswer": "足", "question": "Write the following kanji character: leg" },
  { "correctAnswer": "目", "question": "Write the following kanji character: eye" },
  { "correctAnswer": "口", "question": "Write the following kanji character: mouth" },
  { "correctAnswer": "耳", "question": "Write the following kanji character: ear" },
  { "correctAnswer": "鼻", "question": "Write the following kanji character: nose" },
  { "correctAnswer": "口", "question": "Write the following kanji character: mouth" },
  { "correctAnswer": "手紙", "question": "Write the following kanji characters: letter" },
  { "correctAnswer": "本", "question": "Write the following kanji character: book" },
  { "correctAnswer": "語", "question": "Write the following kanji character: language" },
  { "correctAnswer": "話", "question": "Write the following kanji character: talk" },
  { "correctAnswer": "食", "question": "Write the following kanji character: eat" },
  { "correctAnswer": "飲", "question": "Write the following kanji character: drink" },
  { "correctAnswer": "寝", "question": "Write the following kanji character: sleep" },
  { "correctAnswer": "起", "question": "Write the following kanji character: wake up" },
  { "correctAnswer": "出", "question": "Write the following kanji character: exit" },
  { "correctAnswer": "入", "question": "Write the following kanji character: enter" },
  { "correctAnswer": "見", "question": "Write the following kanji character: see" },
  { "correctAnswer": "聞", "question": "Write the following kanji character: hear" },
  { "correctAnswer": "知", "question": "Write the following kanji character: know" },
  { "correctAnswer": "書", "question": "Write the following kanji character: write" },
  { "correctAnswer": "読", "question": "Write the following kanji character: read" },
  { "correctAnswer": "行", "question": "Write the following kanji character: go" },
  { "correctAnswer": "来", "question": "Write the following kanji character: come" },
  { "correctAnswer": "帰", "question": "Write the following kanji character: return" },
  { "correctAnswer": "買", "question": "Write the following kanji character: buy" },
  { "correctAnswer": "売", "question": "Write the following kanji character: sell" },
  { "correctAnswer": "待", "question": "Write the following kanji character: wait" },
  { "correctAnswer": "遊", "question": "Write the following kanji character: play" },
  { "correctAnswer": "歩", "question": "Write the following kanji character: walk" },
  { "correctAnswer": "走", "question": "Write the following kanji character: run" },
  { "correctAnswer": "泳", "question": "Write the following kanji character: swim" },
  { "correctAnswer": "飛", "question": "Write the following kanji character: fly" },
  { "correctAnswer": "跳", "question": "Write the following kanji character: jump" },
  { "correctAnswer": "運", "question": "Write the following kanji character: luck" },
  { "correctAnswer": "勉", "question": "Write the following kanji character: study" },
  { "correctAnswer": "強", "question": "Write the following kanji character: strong" },
  { "correctAnswer": "弱", "question": "Write the following kanji character: weak" },
  { "correctAnswer": "高", "question": "Write the following kanji character: high" },
  { "correctAnswer": "低", "question": "Write the following kanji character: low" },
  { "correctAnswer": "広", "question": "Write the following kanji character: wide" },
  { "correctAnswer": "狭", "question": "Write the following kanji character: narrow" },
  { "correctAnswer": "長", "question": "Write the following kanji character: long" },
  { "correctAnswer": "短", "question": "Write the following kanji character: short" },
  { "correctAnswer": "新", "question": "Write the following kanji character: new" },
  { "correctAnswer": "古", "question": "Write the following kanji character: old" },
  { "correctAnswer": "多", "question": "Write the following kanji character: many" },
  { "correctAnswer": "少", "question": "Write the following kanji character: few" },
  { "correctAnswer": "早", "question": "Write the following kanji character: early" },
  { "correctAnswer": "遅", "question": "Write the following kanji character: late" },
  { "correctAnswer": "暑", "question": "Write the following kanji character: hot" },
  { "correctAnswer": "寒", "question": "Write the following kanji character: cold" },
  { "correctAnswer": "暖", "question": "Write the following kanji character: warm" },
  { "correctAnswer": "冷", "question": "Write the following kanji character: cool" },
  { "correctAnswer": "上手", "question": "Write the following kanji characters: skilled" },
  { "correctAnswer": "下手", "question": "Write the following kanji characters: unskilled" },
  { "correctAnswer": "大", "question": "Write the following kanji character: big" },
  { "correctAnswer": "小", "question": "Write the following kanji character: small" },
  { "correctAnswer": "好", "question": "Write the following kanji character: good" },
  { "correctAnswer": "悪", "question": "Write the following kanji character: bad" },
  { "correctAnswer": "美", "question": "Write the following kanji character: beautiful" },
  { "correctAnswer": "醜", "question": "Write the following kanji character: ugly" },
  { "correctAnswer": "高い", "question": "Write the following kanji characters: expensive" },
  { "correctAnswer": "安い", "question": "Write the following kanji characters: cheap" },
  { "correctAnswer": "忙しい", "question": "Write the following kanji characters: busy" },
  { "correctAnswer": "暇", "question": "Write the following kanji character: free" },
  { "correctAnswer": "嬉しい", "question": "Write the following kanji characters: happy" },
  { "correctAnswer": "悲しい", "question": "Write the following kanji characters: sad" },
  { "correctAnswer": "面白い", "question": "Write the following kanji characters: interesting" },
  { "correctAnswer": "退屈", "question": "Write the following kanji characters: boring" },
  { "correctAnswer": "難しい", "question": "Write the following kanji characters: difficult" },
  { "correctAnswer": "簡単", "question": "Write the following kanji characters: easy" },
  { "correctAnswer": "健康", "question": "Write the following kanji characters: health" },
  { "correctAnswer": "病気", "question": "Write the following kanji characters: sickness" },
  { "correctAnswer": "快適", "question": "Write the following kanji characters: comfortable" },
  { "correctAnswer": "不快", "question": "Write the following kanji characters: uncomfortable" },
  { "correctAnswer": "元気", "question": "Write the following kanji characters: energetic" },
  { "correctAnswer": "疲れた", "question": "Write the following kanji characters: tired" },
  { "correctAnswer": "良い", "question": "Write the following kanji characters: good" },
  { "correctAnswer": "悪い", "question": "Write the following kanji characters: bad" },
  { "correctAnswer": "大好き", "question": "Write the following kanji characters: love" },
  { "correctAnswer": "嫌い", "question": "Write the following kanji characters: hate" },
  { "correctAnswer": "笑顔", "question": "Write the following kanji characters: smile" },
  { "correctAnswer": "涙", "question": "Write the following kanji character: tears" },
  { "correctAnswer": "怒り", "question": "Write the following kanji character: anger" },
  { "correctAnswer": "喜び", "question": "Write the following kanji character: joy" }
  ]
  };

  // Game state variables
  let currentQuestionIndex = 0;
  let currentCategory = wordCode; // You can change this to switch categories
  let score = 0;
  let totalQuestions = 0;

  // Function to display a question
  function displayQuestion(question) {
    if (!questionTextElement || !userInputElement) {
      console.error("Missing HTML elements. Make sure they exist and the script is placed after them.");
      return;
    }

    // Display the question
    questionTextElement.textContent = question.question;

    // Clear previous user input
    userInputElement.value = "";
  }


function checkAnswer() {
  // Check if the answer has already been processed
  if (confirmButton.disabled) {
    return;
  }

  // Disable the button to prevent multiple clicks
  confirmButton.disabled = true;

  const currentQuestion = getCurrentQuestion();
  const userAnswer = userInputElement.value.trim().toLowerCase(); // Remove leading/trailing spaces from user input

  if (userAnswer === currentQuestion.correctAnswer.toLowerCase()) {
    feedbackMessageElement.textContent = "Congratulations!! Correct answer.";
    feedbackMessageElement.style.color = "green"; // Set feedback message color to green for correct answers
    score++;
  } else {
    feedbackMessageElement.textContent = "Wrong Answer! The correct answer was: " + currentQuestion.correctAnswer;
    feedbackMessageElement.style.color = "red"; // Set feedback message color to red for incorrect answers
  }

  currentQuestionIndex++;
  updateScore();

  // Check if all questions are answered
  if (currentQuestionIndex < getCurrentQuestionSet().length) {
    // Enable the button for the next question after a short delay
    setTimeout(() => {
      confirmButton.disabled = false;
    }, 100);
    displayNextQuestion();
  } else {
    // All questions answered, display final score
    displayFinalScore();
  }
}


// Separate function to handle Enter key press
function handleEnterKey(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default form submission behavior
    checkAnswer();
  }
}

// Attach Enter key press event listener
userInputElement.addEventListener('keydown', handleEnterKey);


  // Function to update the score display
  function updateScore() {
    scoreElement.textContent = `Correct: ${score} | Wrong: ${currentQuestionIndex - score}`;
  }

  // Function to display the final score
  function displayFinalScore() {
    const totalQuestions = getCurrentQuestionSet().length;
    feedbackMessageElement.textContent = `Final Score: Correct: ${score} | Wrong: ${totalQuestions - score}`;
  }

   // Function to get the current question based on the category and index
  function getCurrentQuestion() {
    const questionSet = questionSets[currentCategory];

    if (currentQuestionIndex < questionSet.length) {
      return questionSet[currentQuestionIndex];
    } else {
      // All questions have been answered, return null
      return null;
    }
  }

  // Function to get the current question set based on the category
  function getCurrentQuestionSet() {
    const questionSet = questionSets[currentCategory] || [];
    return questionSet;
  }

function displayNextQuestion() {
  const currentQuestionSet = getCurrentQuestionSet();

  if (currentQuestionSet.length === 0) {
    // No questions defined for this category
    feedbackMessageElement.textContent = "There are no questions defined for this category.";
    userInputElement.disabled = true;
    confirmButton.disabled = true;
  } else {
    const currentQuestion = getCurrentQuestion();

    if (currentQuestion) {
      displayQuestion(currentQuestion);
    } else {
      // No more questions, handle this case
      feedbackMessageElement.textContent = "You have completed all the questions for this category.";
      userInputElement.disabled = true;
      confirmButton.disabled = true;
    }
  }
}
  // Function to reset the game
  function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    totalQuestions = getCurrentQuestionSet().length;
    updateScore();
    displayNextQuestion();
  }

  // Add event listener to handle button click
  confirmButton.addEventListener('click', checkAnswer);


  // Initial setup
  totalQuestions = getCurrentQuestionSet().length;
  displayNextQuestion();
});
