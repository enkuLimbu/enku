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
    { "correctAnswer": "ぶ", "options": ["ぶ", "べ", "ぼ", "ぱ"], "question": "In hiragana, which character is equivalent to the English letter 'bu'?" },
    { "correctAnswer": "ね", "options": ["ね", "ぬ", "ひ", "は"], "question": "Which hiragana character is equivalent to the English letter 'ne'?" },
    { "correctAnswer": "ゆ", "options": ["ゆ", "よ", "わ", "れ"], "question": "What is the pronunciation of 'ゆ' in hiragana?" },
    { "correctAnswer": "け", "options": ["け", "き", "く", "こ"], "question": "In hiragana, which character is equivalent to the English letter 'ke'?" },
    { "correctAnswer": "い", "options": ["い", "お", "え", "う"], "question": "Which hiragana character represents the vowel sound 'i'?" },
    { "correctAnswer": "と", "options": ["と", "た", "ち", "つ"], "question": "What is the pronunciation of 'と' in hiragana?" },
    { "correctAnswer": "ぬ", "options": ["ぬ", "ね", "の", "な"], "question": "In hiragana, which character is equivalent to the English letter 'nu'?" },
    { "correctAnswer": "め", "options": ["め", "み", "も", "ま"], "question": "Which hiragana character is equivalent to the English letter 'me'?" },
    { "correctAnswer": "る", "options": ["る", "れ", "ろ", "ら"], "question": "What is the pronunciation of 'る' in hiragana?" },
    { "correctAnswer": "を", "options": ["を", "わ", "ね", "ろ"], "question": "In the hiragana syllabary, which character is a particle used as an object marker?" },
    { "correctAnswer": "ひ", "options": ["ひ", "は", "ほ", "へ"], "question": "Which hiragana character is equivalent to the English letter 'hi'?" },
    { "correctAnswer": "ふ", "options": ["ふ", "ひ", "ほ", "へ"], "question": "What is the pronunciation of 'ふ' in hiragana?" },
    { "correctAnswer": "よ", "options": ["よ", "ゆ", "や", "い"], "question": "In hiragana, which character is a part of the 'yo' series?" },
    { "correctAnswer": "べ", "options": ["べ", "び", "ぼ", "ば"], "question": "Which hiragana character is equivalent to the English letter 'be'?" },
    { "correctAnswer": "だ", "options": ["だ", "で", "ど", "ど"], "question": "What is the pronunciation of 'だ' in hiragana?" },
    { "correctAnswer": "ぱ", "options": ["ぱ", "ぴ", "ぽ", "ぺ"], "question": "In hiragana, which character is equivalent to the English letter 'pa'?" },
    { "correctAnswer": "ぽ", "options": ["ぽ", "ぷ", "ぺ", "ぱ"], "question": "Which hiragana character is equivalent to the English letter 'po'?" },
    { "correctAnswer": "き", "options": ["き", "く", "か", "け"], "question": "What is the pronunciation of 'き' in hiragana?" },
    { "correctAnswer": "じ", "options": ["じ", "ず", "ぢ", "ぞ"], "question": "In hiragana, which character is equivalent to the English letter 'ji'?" },
    { "correctAnswer": "ざ", "options": ["ざ", "ず", "ぜ", "ぞ"], "question": "What is the pronunciation of 'ざ' in hiragana?" },
    { "correctAnswer": "げ", "options": ["げ", "ぎ", "ご", "が"], "question": "In hiragana, which character is equivalent to the English letter 'ge'?" },
    { "correctAnswer": "ず", "options": ["ず", "づ", "ぜ", "ぞ"], "question": "Which hiragana character is equivalent to the English letter 'zu'?" },
    { "correctAnswer": "む", "options": ["む", "め", "も", "ま"], "question": "What is the pronunciation of 'む' in hiragana?" },
    { "correctAnswer": "や", "options": ["や", "ゆ", "よ", "い"], "question": "In hiragana, which character is a part of the 'ya' series?" },
    { "correctAnswer": "ろ", "options": ["ろ", "れ", "る", "ら"], "question": "Which hiragana character is equivalent to the English letter 'ro'?" },
    { "correctAnswer": "じ", "options": ["じ", "ず", "ぢ", "ぞ"], "question": "What is the pronunciation of 'じ' in hiragana?" },
    { "correctAnswer": "ち", "options": ["ち", "つ", "て", "と"], "question": "In hiragana, which character comes after 'さ'?" },
    { "correctAnswer": "ふ", "options": ["ふ", "ひ", "ほ", "へ"], "question": "What is the pronunciation of 'ふ' in hiragana?" },
    { "correctAnswer": "ゆ", "options": ["ゆ", "よ", "わ", "れ"], "question": "In hiragana, which character is a part of the 'yu' series?" },
    { "correctAnswer": "へ", "options": ["へ", "ほ", "は", "ひ"], "question": "Which hiragana character is equivalent to the English letter 'he'?" },
    { "correctAnswer": "ん", "options": ["ん", "わ", "を", "ね"], "question": "In the hiragana syllabary, which character represents the nasal sound 'n'?" },
    { "correctAnswer": "き", "options": ["き", "く", "か", "け"], "question": "What is the pronunciation of 'き' in hiragana?" },
    { "correctAnswer": "ぎ", "options": ["ぎ", "ぐ", "げ", "ご"], "question": "In hiragana, which character is equivalent to the English letter 'gi'?" },
    { "correctAnswer": "と", "options": ["と", "た", "ち", "つ"], "question": "What is the pronunciation of 'と' in hiragana?" },
    { "correctAnswer": "で", "options": ["で", "ど", "だ", "ど"], "question": "Which hiragana character is equivalent to the English letter 'de'?" },
    { "correctAnswer": "ぬ", "options": ["ぬ", "ね", "の", "な"], "question": "What is the pronunciation of 'ぬ' in hiragana?" },
    { "correctAnswer": "ほ", "options": ["ほ", "へ", "は", "ひ"], "question": "Which hiragana character is equivalent to the English letter 'ho'?" },
    { "correctAnswer": "ゆ", "options": ["ゆ", "よ", "わ", "れ"], "question": "What is the pronunciation of 'ゆ' in hiragana?" },
    { "correctAnswer": "び", "options": ["び", "ぶ", "べ", "ば"], "question": "Which hiragana character is equivalent to the English letter 'bi'?" },
    { "correctAnswer": "ふ", "options": ["ふ", "ひ", "ほ", "へ"], "question": "What is the pronunciation of 'ふ' in hiragana?" },
    { "correctAnswer": "よ", "options": ["よ", "ゆ", "や", "い"], "question": "In hiragana, which character is a part of the 'yo' series?" },
    { "correctAnswer": "ば", "options": ["ば", "び", "ぶ", "べ"], "question": "Which hiragana character is equivalent to the English letter 'ba'?" },
    { "correctAnswer": "ず", "options": ["ず", "づ", "ぜ", "ぞ"], "question": "What is the pronunciation of 'ず' in hiragana?" },
    { "correctAnswer": "む", "options": ["む", "め", "も", "ま"], "question": "In hiragana, which character is equivalent to the English letter 'mu'?" },
    { "correctAnswer": "え", "options": ["え", "お", "い", "う"], "question": "What is the pronunciation of 'え' in hiragana?" },
    { "correctAnswer": "き", "options": ["き", "く", "か", "け"], "question": "In hiragana, which character is equivalent to the English letter 'ki'?" },
    { "correctAnswer": "ね", "options": ["ね", "ぬ", "ひ", "は"], "question": "What is the pronunciation of 'ね' in hiragana?" },
    { "correctAnswer": "り", "options": ["り", "れ", "る", "ろ"], "question": "Which hiragana character is equivalent to the English letter 'ri'?" },
    { "correctAnswer": "ゆ", "options": ["ゆ", "よ", "わ", "れ"], "question": "What is the pronunciation of 'ゆ' in hiragana?" },
    { "correctAnswer": "ほ", "options": ["ほ", "へ", "は", "ひ"], "question": "In hiragana, which character is equivalent to the English letter 'ho'?" },
    { "correctAnswer": "ろ", "options": ["ろ", "れ", "る", "ら"], "question": "What is the pronunciation of 'ろ' in hiragana?" },
    { "correctAnswer": "い", "options": ["い", "お", "え", "う"], "question": "Which hiragana character represents the vowel sound 'i'?" },
    { "correctAnswer": "ひ", "options": ["ひ", "は", "ほ", "へ"], "question": "What is the pronunciation of 'ひ' in hiragana?" },
    { "correctAnswer": "た", "options": ["た", "ち", "つ", "て"], "question": "In hiragana, which character comes after 'さ'?" },
    { "correctAnswer": "て", "options": ["て", "と", "た", "ち"], "question": "Which hiragana character is equivalent to the English letter 'te'?" },
    { "correctAnswer": "む", "options": ["む", "め", "も", "ま"], "question": "What is the pronunciation of 'む' in hiragana?" },
    { "correctAnswer": "ろ", "options": ["ろ", "れ", "る", "ら"], "question": "Which hiragana character is equivalent to the English letter 'ro'?" },
    { "correctAnswer": "う", "options": ["う", "え", "お", "い"], "question": "What is the pronunciation of 'う' in hiragana?" },
    { "correctAnswer": "の", "options": ["の", "ね", "な", "に"], "question": "In hiragana, which character is equivalent to the English letter 'no'?" },
    { "correctAnswer": "ね", "options": ["ね", "ぬ", "ひ", "は"], "question": "What is the pronunciation of 'ね' in hiragana?" },
    { "correctAnswer": "ほ", "options": ["ほ", "へ", "は", "ひ"], "question": "In hiragana, which character is equivalent to the English letter 'ho'?" },
    { "correctAnswer": "わ", "options": ["わ", "を", "ん", "れ"], "question": "What is the pronunciation of 'わ' in hiragana?" },
    { "correctAnswer": "ひ", "options": ["ひ", "は", "ほ", "へ"], "question": "In hiragana, which character is equivalent to the English letter 'hi'?" },
    { "correctAnswer": "る", "options": ["る", "れ", "ろ", "ら"], "question": "What is the pronunciation of 'る' in hiragana?" },
    { "correctAnswer": "や", "options": ["や", "ゆ", "よ", "い"], "question": "In hiragana, which character is a part of the 'ya' series?" },
    { "correctAnswer": "ち", "options": ["ち", "つ", "て", "と"], "question": "Which hiragana character comes after 'し'?" },
    { "correctAnswer": "と", "options": ["と", "た", "ち", "つ"], "question": "What is the pronunciation of 'と' in hiragana?" },
    { "correctAnswer": "わ", "options": ["わ", "を", "ん", "れ"], "question": "In the hiragana syllabary, which character is used as a particle?" },
    { "correctAnswer": "に", "options": ["に", "ね", "の", "な"], "question": "Which hiragana character is equivalent to the English letter 'ni'?" },
    { "correctAnswer": "ろ", "options": ["ろ", "れ", "る", "ら"], "question": "What is the pronunciation of 'ろ' in hiragana?" },
    { "correctAnswer": "ひ", "options": ["ひ", "は", "ほ", "へ"], "question": "In hiragana, which character is equivalent to the English letter 'hi'?" },
    { "correctAnswer": "ぷ", "options": ["ぷ", "ぺ", "ほ", "は"], "question": "Which hiragana character is equivalent to the English letter 'pu'?" },
    { "correctAnswer": "せ", "options": ["せ", "そ", "さ", "す"], "question": "What is the pronunciation of 'せ' in hiragana?" },
    { "correctAnswer": "ひ", "options": ["ひ", "は", "ほ", "へ"], "question": "In hiragana, which character is equivalent to the English letter 'hi'?" },
    { "correctAnswer": "く", "options": ["く", "き", "か", "け"], "question": "Which hiragana character represents the sound 'ku'?" },
    { "correctAnswer": "き", "options": ["き", "く", "か", "け"], "question": "What is the pronunciation of 'き' in hiragana?" },
    { "correctAnswer": "ね", "options": ["ね", "ぬ", "ひ", "は"], "question": "In hiragana, which character is equivalent to the English letter 'ne'?" },
    { "correctAnswer": "も", "options": ["も", "め", "む", "ま"], "question": "What is the pronunciation of 'も' in hiragana?" },
    { "correctAnswer": "し", "options": ["し", "す", "せ", "そ"], "question": "Which hiragana character is equivalent to the English letter 'shi'?" },
    { "correctAnswer": "に", "options": ["に", "ね", "の", "な"], "question": "What is the pronunciation of 'に' in hiragana?" },
    { "correctAnswer": "さ", "options": ["さ", "し", "す", "せ"], "question": "In hiragana, which character is equivalent to the English letter 'sa'?" },
    { "correctAnswer": "ふ", "options": ["ふ", "ひ", "ほ", "へ"], "question": "What is the pronunciation of 'ふ' in hiragana?" },
    { "correctAnswer": "け", "options": ["け", "き", "く", "こ"], "question": "In hiragana, which character is equivalent to the English letter 'ke'?" },
    { "correctAnswer": "る", "options": ["る", "れ", "ろ", "ら"], "question": "What is the pronunciation of 'る' in hiragana?" },
    { "correctAnswer": "き", "options": ["き", "く", "か", "け"], "question": "Which hiragana character represents the sound 'ki'?" },
    { "correctAnswer": "せ", "options": ["せ", "そ", "さ", "す"], "question": "What is the pronunciation of 'せ' in hiragana?" },
    { "correctAnswer": "ち", "options": ["ち", "つ", "て", "と"], "question": "In hiragana, which character comes after 'し'?" },
    { "correctAnswer": "の", "options": ["の", "ね", "な", "に"], "question": "Which hiragana character is equivalent to the English letter 'no'?" },
    { "correctAnswer": "び", "options": ["び", "ぶ", "べ", "ば"], "question": "What is the pronunciation of 'び' in hiragana?" },
    { "correctAnswer": "し", "options": ["し", "す", "せ", "そ"], "question": "In hiragana, which character is equivalent to the English letter 'shi'?" },
    { "correctAnswer": "ぬ", "options": ["ぬ", "ね", "の", "な"], "question": "What is the pronunciation of 'ぬ' in hiragana?" },
    { "correctAnswer": "と", "options": ["と", "た", "ち", "つ"], "question": "Which hiragana character is equivalent to the English letter 'to'?" },
    { "correctAnswer": "ぬ", "options": ["ぬ", "ね", "の", "な"], "question": "What is the pronunciation of 'ぬ' in hiragana?" },
    { "correctAnswer": "ぬ", "options": ["ぬ", "ね", "の", "な"], "question": "In hiragana, which character is equivalent to the English letter 'nu'?" },
    { "correctAnswer": "る", "options": ["る", "れ", "ろ", "ら"], "question": "What is the pronunciation of 'る' in hiragana?" },
    { "correctAnswer": "し", "options": ["し", "す", "せ", "そ"], "question": "In hiragana, which character is equivalent to the English letter 'shi'?" },
    { "correctAnswer": "そ", "options": ["そ", "さ", "し", "す"], "question": "What is the pronunciation of 'そ' in hiragana?" },
    { "correctAnswer": "も", "options": ["も", "め", "む", "ま"], "question": "In the hiragana syllabary, which character is equivalent to the English letter 'mo'?" }
    { "correctAnswer": "ふ", "options": ["ふ", "ひ", "ほ", "へ"], "question": "What is the pronunciation of 'ふ' in hiragana?" },
    { "correctAnswer": "に", "options": ["に", "ね", "の", "な"], "question": "In hiragana, which character is equivalent to the English letter 'ni'?" },
    { "correctAnswer": "す", "options": ["す", "せ", "そ", "さ"], "question": "Which hiragana character is equivalent to the English letter 'su'?" },
    { "correctAnswer": "ほ", "options": ["ほ", "へ", "は", "ひ"], "question": "What is the pronunciation of 'ほ' in hiragana?" },
    { "correctAnswer": "れ", "options": ["れ", "る", "ろ", "ら"], "question": "In hiragana, which character is equivalent to the English letter 're'?" },
    { "correctAnswer": "し", "options": ["し", "す", "せ", "そ"], "question": "What is the pronunciation of 'し' in hiragana?" },
    { "correctAnswer": "わ", "options": ["わ", "を", "ん", "れ"], "question": "In the hiragana syllabary, which character is used as a particle?" },
    { "correctAnswer": "つ", "options": ["つ", "て", "と", "た"], "question": "Which hiragana character is equivalent to the English letter 'tsu'?" },
    { "correctAnswer": "て", "options": ["て", "と", "た", "ち"], "question": "What is the pronunciation of 'て' in hiragana?" },
    { "correctAnswer": "り", "options": ["り", "れ", "る", "ろ"], "question": "In hiragana, which character is equivalent to the English letter 'ri'?" },
    { "correctAnswer": "む", "options": ["む", "め", "も", "ま"], "question": "What is the pronunciation of 'む' in hiragana?" },
    { "correctAnswer": "や", "options": ["や", "ゆ", "よ", "い"], "question": "In hiragana, which character is a part of the 'ya' series?" },
    { "correctAnswer": "ら", "options": ["ら", "り", "る", "れ"], "question": "Which hiragana character is equivalent to the English letter 'ra'?" },
    { "correctAnswer": "も", "options": ["も", "め", "む", "ま"], "question": "What is the pronunciation of 'も' in hiragana?" },
    { "correctAnswer": "い", "options": ["い", "お", "え", "う"], "question": "Which hiragana character represents the vowel sound 'i'?" },
    { "correctAnswer": "つ", "options": ["つ", "て", "と", "た"], "question": "In hiragana, which character is equivalent to the English letter 'tsu'?" },
    { "correctAnswer": "ふ", "options": ["ふ", "ひ", "ほ", "へ"], "question": "What is the pronunciation of 'ふ' in hiragana?" },
    { "correctAnswer": "け", "options": ["け", "き", "く", "こ"], "question": "In hiragana, which character is equivalent to the English letter 'ke'?" },
    { "correctAnswer": "り", "options": ["り", "れ", "る", "ろ"], "question": "Which hiragana character is equivalent to the English letter 'ri'?" },
    { "correctAnswer": "え", "options": ["え", "お", "い", "う"], "question": "What is the pronunciation of 'え' in hiragana?" },
    { "correctAnswer": "け", "options": ["け", "き", "く", "こ"], "question": "Which hiragana character represents the sound 'ke'?" },
    { "correctAnswer": "れ", "options": ["れ", "る", "ろ", "ら"], "question": "What is the pronunciation of 'れ' in hiragana?" },
    { "correctAnswer": "い", "options": ["い", "お", "え", "う"], "question": "Which hiragana character represents the vowel sound 'i'?" },
    { "correctAnswer": "け", "options": ["け", "き", "く", "こ"], "question": "What is the pronunciation of 'け' in hiragana?" },
    { "correctAnswer": "ろ", "options": ["ろ", "れ", "る", "ら"], "question": "In hiragana, which character is equivalent to the English letter 'ro'?" },
    { "correctAnswer": "ち", "options": ["ち", "つ", "て", "と"], "question": "Which hiragana character comes after 'し'?" },
    { "correctAnswer": "つ", "options": ["つ", "て", "と", "た"], "question": "What is the pronunciation of 'つ' in hiragana?" },
    { "correctAnswer": "の", "options": ["の", "ね", "な", "に"], "question": "In hiragana, which character is equivalent to the English letter 'no'?" },
    { "correctAnswer": "や", "options": ["や", "ゆ", "よ", "い"], "question": "What is the pronunciation of 'や' in hiragana?" },
    { "correctAnswer": "ら", "options": ["ら", "り", "る", "れ"], "question": "Which hiragana character is equivalent to the English letter 'ra'?" },
    { "correctAnswer": "と", "options": ["と", "た", "ち", "つ"], "question": "In hiragana, which character is equivalent to the English letter 'to'?" },
    { "correctAnswer": "ん", "options": ["ん", "わ", "を", "ね"], "question": "What is the pronunciation of 'ん' in hiragana?" },
    { "correctAnswer": "り", "options": ["り", "れ", "る", "ろ"], "question": "What is the pronunciation of 'り' in hiragana?" },
    { "correctAnswer": "ふ", "options": ["ふ", "ひ", "ほ", "へ"], "question": "In hiragana, which character is equivalent to the English letter 'fu'?" },
    { "correctAnswer": "す", "options": ["す", "せ", "そ", "さ"], "question": "What is the pronunciation of 'す' in hiragana?" },
    { "correctAnswer": "え", "options": ["え", "お", "い", "う"], "question": "Which hiragana character represents the vowel sound 'e'?" },
    { "correctAnswer": "い", "options": ["い", "お", "え", "う"], "question": "What is the pronunciation of 'い' in hiragana?" },
    { "correctAnswer": "の", "options": ["の", "ね", "な", "に"], "question": "In hiragana, which character is equivalent to the English letter 'no'?" },
    { "correctAnswer": "む", "options": ["む", "め", "も", "ま"], "question": "What is the pronunciation of 'む' in hiragana?" },
    { "correctAnswer": "え", "options": ["え", "お", "い", "う"], "question": "In hiragana, which character represents the vowel sound 'e'?" },
    { "correctAnswer": "つ", "options": ["つ", "て", "と", "た"], "question": "Which hiragana character is equivalent to the English letter 'tsu'?" },
    { "correctAnswer": "れ", "options": ["れ", "る", "ろ", "ら"], "question": "What is the pronunciation of 'れ' in hiragana?" },
    { "correctAnswer": "の", "options": ["の", "ね", "な", "に"], "question": "In hiragana, which character is equivalent to the English letter 'no'?" },
    { "correctAnswer": "ろ", "options": ["ろ", "れ", "る", "ら"], "question": "What is the pronunciation of 'ろ' in hiragana?" },
    { "correctAnswer": "ぬ", "options": ["ぬ", "ね", "の", "な"], "question": "In hiragana, which character is equivalent to the English letter 'nu'?" },
    { "correctAnswer": "や", "options": ["や", "ゆ", "よ", "い"], "question": "What is the pronunciation of 'や' in hiragana?" },
    { "correctAnswer": "つ", "options": ["つ", "て", "と", "た"], "question": "Which hiragana character is equivalent to the English letter 'tsu'?" },
    { "correctAnswer": "ね", "options": ["ね", "ぬ", "ひ", "は"], "question": "In hiragana, which character is equivalent to the English letter 'ne'?" },
    { "correctAnswer": "さ", "options": ["さ", "し", "す", "せ"], "question": "What is the pronunciation of 'さ' in hiragana?" },
    { "correctAnswer": "す", "options": ["す", "せ", "そ", "さ"], "question": "In hiragana, which character is equivalent to the English letter 'su'?" },
    { "correctAnswer": "て", "options": ["て", "と", "た", "ち"], "question": "What is the pronunciation of 'て' in hiragana?" },
    { "correctAnswer": "よ", "options": ["よ", "ゆ", "や", "い"], "question": "In hiragana, which character is a part of the 'yo' series?" },
    { "correctAnswer": "へ", "options": ["へ", "ほ", "は", "ひ"], "question": "What is the pronunciation of 'へ' in hiragana?" },
    { "correctAnswer": "や", "options": ["や", "ゆ", "よ", "い"], "question": "In hiragana, which character is a part of the 'ya' series?" },
    { "correctAnswer": "う", "options": ["う", "え", "お", "い"], "question": "What is the pronunciation of 'う' in hiragana?" },
    { "correctAnswer": "か", "options": ["か", "き", "く", "け"], "question": "In hiragana, which character is equivalent to the English letter 'ka'?" },
    { "correctAnswer": "ま", "options": ["ま", "み", "む", "め"], "question": "What is the pronunciation of 'ま' in hiragana?" },
    { "correctAnswer": "む", "options": ["む", "め", "も", "ま"], "question": "In the hiragana syllabary, which character is equivalent to the English letter 'mu'?" }
    { "correctAnswer": "ね", "options": ["ね", "ぬ", "ひ", "は"], "question": "What is the pronunciation of 'ね' in hiragana?" },
    { "correctAnswer": "の", "options": ["の", "ね", "な", "に"], "question": "In hiragana, which character is equivalent to the English letter 'no'?" },
    { "correctAnswer": "さ", "options": ["さ", "し", "す", "せ"], "question": "What is the pronunciation of 'さ' in hiragana?" },
    { "correctAnswer": "れ", "options": ["れ", "る", "ろ", "ら"], "question": "In hiragana, which character is equivalent to the English letter 're'?" },
    { "correctAnswer": "む", "options": ["む", "め", "も", "ま"], "question": "What is the pronunciation of 'む' in hiragana?" },
    { "correctAnswer": "お", "options": ["お", "お", "え", "い"], "question": "Which hiragana character represents the vowel sound 'o'?" },
    { "correctAnswer": "ふ", "options": ["ふ", "ひ", "ほ", "へ"], "question": "What is the pronunciation of 'ふ' in hiragana?" },
    { "correctAnswer": "の", "options": ["の", "ね", "な, "に"], "question": "In hiragana, which character is equivalent to the English letter 'no'?" },
    { "correctAnswer": "さ", "options": ["さ", "し", "す", "せ"], "question": "What is the pronunciation of 'さ' in hiragana?" },
    { "correctAnswer": "し", "options": ["し", "す", "せ", "そ"], "question": "In hiragana, which character is equivalent to the English letter 'shi'?" },
    { "correctAnswer": "え", "options": ["え", "お", "い", "う"], "question": "Which hiragana character represents the vowel sound 'e'?" },
    { "correctAnswer": "の", "options": ["の", "ね", "な", "に"], "question": "What is the pronunciation of 'の' in hiragana?" },
    { "correctAnswer": "く", "options": ["く", "き", "か", "け"], "question": "In hiragana, which character is equivalent to the English letter 'ku'?" },
    { "correctAnswer": "た", "options": ["た", "ち", "つ", "て"], "question": "What is the pronunciation of 'た' in hiragana?" },
    { "correctAnswer": "に", "options": ["に", "ね", "の", "な"], "question": "In hiragana, which character is equivalent to the English letter 'ni'?" },
    { "correctAnswer": "や", "options": ["や", "ゆ", "よ", "い"], "question": "What is the pronunciation of 'や' in hiragana?" },
    { "correctAnswer": "え", "options": ["え", "お", "い", "う"], "question": "What is the pronunciation of 'え' in hiragana?" },
    { "correctAnswer": "お", "options": ["お", "お", "え", "い"], "question": "Which hiragana character represents the vowel sound 'o'?" },
    { "correctAnswer": "す", "options": ["す", "せ", "そ", "さ"], "question": "In hiragana, which character is equivalent to the English letter 'su'?" },
    { "correctAnswer": "る", "options": ["る", "れ", "ろ", "ら"], "question": "What is the pronunciation of 'る' in hiragana?" },
    { "correctAnswer": "う", "options": ["う", "え", "お", "い"], "question": "In hiragana, which character represents the vowel sound 'u'?" },
    { "correctAnswer": "は", "options": ["は", "ひ", "ほ", "へ"], "question": "What is the pronunciation of 'は' in hiragana?" },
    { "correctAnswer": "に", "options": ["に", "ね", "の", "な"], "question": "What is the pronunciation of 'に' in hiragana?" },
    { "correctAnswer": "つ", "options": ["つ", "て", "と", "た"], "question": "Which hiragana character is equivalent to the English letter 'tsu'?" },
    { "correctAnswer": "え", "options": ["え", "お", "い", "う"], "question": "What is the pronunciation of 'え' in hiragana?" },
    { "correctAnswer": "み", "options": ["み", "む", "め", "も"], "question": "In hiragana, which character is equivalent to the English letter 'mi'?" },
   
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
    { "correctAnswer": "ブ", "options": ["ブ", "ベ", "ボ", "パ"], "question": "In katakana, which character is equivalent to the English letter 'bu'?" },
    { "correctAnswer": "キャ", "options": ["キャ", "キュ", "キョ", "ケィ"], "question": "What katakana combination represents the sound 'kya'?" },
    { "correctAnswer": "シュ", "options": ["シュ", "ショ", "シャ", "ス"], "question": "In katakana, which combination represents the sound 'shu'?" },
    { "correctAnswer": "ニョ", "options": ["ニョ", "ニャ", "ニュ", "ノ"], "question": "Which katakana combination represents the sound 'nyo'?" },
    { "correctAnswer": "メ", "options": ["メ", "ミ", "マ", "モ"], "question": "In katakana, which character is equivalent to the English letter 'me'?" },
    { "correctAnswer": "レ", "options": ["レ", "リ", "ル", "ロ"], "question": "What is the pronunciation of 'レ' in katakana?" },
    { "correctAnswer": "キ", "options": ["キ", "ク", "ケ", "コ"], "question": "In katakana, which character is equivalent to the English letter 'ki'?" },
    { "correctAnswer": "ン", "options": ["ン", "ヌ", "ネ", "ノ"], "question": "What is the pronunciation of 'ン' in katakana?" },
    { "correctAnswer": "ソ", "options": ["ソ", "サ", "ス", "セ"], "question": "In katakana, which character is equivalent to the English letter 'so'?" },
    { "correctAnswer": "ヒ", "options": ["ヒ", "フ", "ヘ", "ホ"], "question": "What is the pronunciation of 'ヒ' in katakana?" },
    { "correctAnswer": "アイ", "options": ["アイ", "アウ", "アエ", "アオ"], "question": "Which katakana combination represents the sound 'ai'?" },
    { "correctAnswer": "サ", "options": ["サ", "シ", "ス", "セ"], "question": "In katakana, which character is equivalent to the English letter 'sa'?" },
    { "correctAnswer": "ン", "options": ["ン", "ヌ", "ネ", "ノ"], "question": "In katakana, which character is used as a nasal sound?" },
    { "correctAnswer": "リョ", "options": ["リョ", "リャ", "リュ", "レィ"], "question": "Which katakana combination represents the sound 'ryo'?" },
    { "correctAnswer": "ケ", "options": ["ケ", "キ", "コ", "ク"], "question": "What is the pronunciation of 'ケ' in katakana?" },
    { "correctAnswer": "ウェ", "options": ["ウェ", "ウィ", "ウォ", "ウ"], "question": "Which katakana combination represents the sound 'we'?" },
    { "correctAnswer": "ゴ", "options": ["ゴ", "ギ", "グ", "ゲ"], "question": "In katakana, which character is equivalent to the English letter 'go'?" },
    { "correctAnswer": "フィ", "options": ["フィ", "ファ", "フェ", "フォ"], "question": "Which katakana combination represents the sound 'fi'?" },
    { "correctAnswer": "イェ", "options": ["イェ", "イャ", "イュ", "イ"], "question": "What katakana combination represents the sound 'ye'?" },
    { "correctAnswer": "メ", "options": ["メ", "ミ", "マ", "モ"], "question": "In katakana, which character is equivalent to the English letter 'me'?" },
    { "correctAnswer": "ク", "options": ["ク", "ケ", "コ", "キ"], "question": "What is the pronunciation of 'ク' in katakana?" },
    { "correctAnswer": "シ", "options": ["シ", "ス", "セ", "ソ"], "question": "In katakana, which character is equivalent to the English letter 'shi'?" },
    { "correctAnswer": "ラ", "options": ["ラ", "リ", "ル", "レ"], "question": "What is the pronunciation of 'ラ' in katakana?" },
    { "correctAnswer": "ヴァ", "options": ["ヴァ", "ヴィ", "ヴ", "ヴェ"], "question": "Which katakana combination represents the sound 'va'?" },
    { "correctAnswer": "オ", "options": ["オ", "イ", "ウ", "エ"], "question": "In katakana, which character is equivalent to the English letter 'o'?" },
    { "correctAnswer": "セ", "options": ["セ", "サ", "ソ", "ス"], "question": "What is the pronunciation of 'セ' in katakana?" },
    { "correctAnswer": "キョ", "options": ["キョ", "キャ", "キュ", "ケィ"], "question": "Which katakana combination represents the sound 'kyo'?" },
    { "correctAnswer": "イ", "options": ["イ", "エ", "オ", "ウ"], "question": "In katakana, which character is equivalent to the English letter 'i'?" },
    { "correctAnswer": "ネ", "options": ["ネ", "ヌ", "ノ", "ナ"], "question": "What is the pronunciation of 'ネ' in katakana?" },
    { "correctAnswer": "タ", "options": ["タ", "チ", "ツ", "テ"], "question": "In katakana, which character is equivalent to the English letter 'ta'?" },
    { "correctAnswer": "ミャ", "options": ["ミャ", "ミュ", "ミョ", "メィ"], "question": "Which katakana combination represents the sound 'mya'?" },
    { "correctAnswer": "ウォ", "options": ["ウォ", "ウィ", "ウェ", "ウ"], "question": "What katakana combination represents the sound 'wo'?" },
    { "correctAnswer": "キ", "options": ["キ", "ク", "ケ", "コ"], "question": "In katakana, which character is equivalent to the English letter 'ki'?" },
    { "correctAnswer": "サ", "options": ["サ", "シ", "ス", "セ"], "question": "What is the pronunciation of 'サ' in katakana?" },
    { "correctAnswer": "トゥ", "options": ["トゥ", "トャ", "トュ", "トョ"], "question": "Which katakana combination represents the sound 'tu'?" },
    { "correctAnswer": "ソ", "options": ["ソ", "サ", "ス", "セ"], "question": "In katakana, which character is equivalent to the English letter 'so'?" },
    { "correctAnswer": "ム", "options": ["ム", "メ", "モ", "マ"], "question": "What is the pronunciation of 'ム' in katakana?" },
    { "correctAnswer": "リ", "options": ["リ", "レ", "ル", "ロ"], "question": "In katakana, which character is equivalent to the English letter 'ri'?" },
    { "correctAnswer": "ヒョ", "options": ["ヒョ", "ヒャ", "ヒュ", "ヘィ"], "question": "Which katakana combination represents the sound 'hyo'?" },
    { "correctAnswer": "ト", "options": ["ト", "タ", "チ", "テ"], "question": "What is the pronunciation of 'ト' in katakana?" },
    { "correctAnswer": "リュ", "options": ["リュ", "リョ", "リャ", "レィ"], "question": "Which katakana combination represents the sound 'ryu'?" },
    { "correctAnswer": "ヴ", "options": ["ヴ", "ヴァ", "ヴィ", "ヴェ"], "question": "In katakana, which character represents the sound 'vu'?" },
    { "correctAnswer": "ン", "options": ["ン", "ヌ", "ネ", "ノ"], "question": "What is the pronunciation of 'ン' in katakana?" },
    { "correctAnswer": "キュ", "options": ["キュ", "キョ", "キャ", "ケィ"], "question": "Which katakana combination represents the sound 'kyu'?" },
    { "correctAnswer": "フ", "options": ["フ", "ヘ", "ホ", "ハ"], "question": "In katakana, which character is equivalent to the English letter 'fu'?" },
    { "correctAnswer": "エ", "options": ["エ", "オ", "イ", "ウ"], "question": "What is the pronunciation of 'エ' in katakana?" },
    { "correctAnswer": "ノ", "options": ["ノ", "ヌ", "ネ", "ナ"], "question": "In katakana, which character is equivalent to the English letter 'no'?" },
    { "correctAnswer": "ユ", "options": ["ユ", "ヨ", "イ", "ヤ"], "question": "What is the pronunciation of 'ユ' in katakana?" },
    { "correctAnswer": "ス", "options": ["ス", "セ", "ソ", "サ"], "question": "In katakana, which character is equivalent to the English letter 'su'?" },
    { "correctAnswer": "ケ", "options": ["ケ", "キ", "コ", "ク"], "question": "What is the pronunciation of 'ケ' in katakana?" },
    { "correctAnswer": "ヴェ", "options": ["ヴェ", "ヴァ", "ヴィ", "ヴ"], "question": "Which katakana combination represents the sound 've'?" },
    { "correctAnswer": "キョ", "options": ["キョ", "キャ", "キュ", "ケィ"], "question": "What katakana combination represents the sound 'kyo'?" },
    { "correctAnswer": "フェ", "options": ["フェ", "ファ", "フィ", "フォ"], "question": "Which katakana combination represents the sound 'fe'?" },
    { "correctAnswer": "セ", "options": ["セ", "サ", "ソ", "ス"], "question": "In katakana, which character is equivalent to the English letter 'se'?" }
    // Add more questions for k02
  ]

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
    { "correctAnswer": "土", "options": ["土", "木", "火", "水"], "question": "Which kanji character means 'earth' or 'soil'?" },
    { "correctAnswer": "田", "options": ["田", "川", "山", "森"], "question": "What is the meaning of the kanji character '田'?" },
    { "correctAnswer": "天", "options": ["天", "地", "海", "空"], "question": "Which kanji character means 'heaven' or 'sky'?" },
    { "correctAnswer": "生", "options": ["生", "死", "亡", "活"], "question": "What is the meaning of the kanji character '生'?" },
    { "correctAnswer": "月", "options": ["月", "日", "年", "時"], "question": "Which kanji character means 'moon'?" },
    { "correctAnswer": "火", "options": ["火", "水", "風", "土"], "question": "What is the meaning of the kanji character '火'?" },
    { "correctAnswer": "女", "options": ["女", "男", "子", "人"], "question": "Which kanji character means 'woman'?" },
    { "correctAnswer": "男", "options": ["男", "女", "子", "人"], "question": "What is the meaning of the kanji character '男'?" },
    { "correctAnswer": "子", "options": ["子", "女", "男", "人"], "question": "Which kanji character means 'child'?" },
    { "correctAnswer": "気", "options": ["気", "水", "火", "風"], "question": "What is the meaning of the kanji character '気'?" },
    { "correctAnswer": "川", "options": ["川", "田", "山", "森"], "question": "Which kanji character means 'river'?" },
    { "correctAnswer": "目", "options": ["目", "耳", "口", "手"], "question": "What is the meaning of the kanji character '目'?" },
    { "correctAnswer": "耳", "options": ["耳", "目", "口", "手"], "question": "Which kanji character means 'ear'?" },
    { "correctAnswer": "口", "options": ["口", "目", "耳", "手"], "question": "What is the meaning of the kanji character '口'?" },
    { "correctAnswer": "手", "options": ["手", "口", "目", "耳"], "question": "Which kanji character means 'hand'?" },
    { "correctAnswer": "足", "options": ["足", "手", "目", "口"], "question": "What is the meaning of the kanji character '足'?" },
    { "correctAnswer": "木", "options": ["木", "石", "金", "土"], "question": "Which kanji character means 'tree'?" },
    { "correctAnswer": "石", "options": ["石", "木", "金", "土"], "question": "What is the meaning of the kanji character '石'?" },
    { "correctAnswer": "金", "options": ["金", "木", "土", "水"], "question": "Which kanji character means 'gold' or 'money'?" },
    { "correctAnswer": "土", "options": ["土", "木", "火", "水"], "question": "What is the meaning of the kanji character '土'?" },
    { "correctAnswer": "水", "options": ["水", "火", "風", "土"], "question": "Which kanji character means 'water'?" },
    { "correctAnswer": "日", "options": ["日", "月", "年", "時"], "question": "What is the meaning of the kanji character '日'?" },
    { "correctAnswer": "月", "options": ["月", "日", "年", "時"], "question": "Which kanji character means 'moon'?" },
    { "correctAnswer": "年", "options": ["年", "月", "日", "時"], "question": "What is the meaning of the kanji character '年'?" },
    { "correctAnswer": "時", "options": ["時", "分", "秒", "日"], "question": "Which kanji character means 'time' or 'hour'?" },
    { "correctAnswer": "分", "options": ["分", "時", "秒", "日"], "question": "What is the meaning of the kanji character '分'?" },
    { "correctAnswer": "秒", "options": ["秒", "時", "分", "日"], "question": "Which kanji character means 'second'?" },
    { "correctAnswer": "火曜日", "options": ["火曜日", "水曜日", "木曜日", "金曜日"], "question": "What is the Japanese word for 'Tuesday'?" },
    { "correctAnswer": "水曜日", "options": ["水曜日", "火曜日", "木曜日", "金曜日"], "question": "Which Japanese word means 'Wednesday'?" },
    { "correctAnswer": "木曜日", "options": ["木曜日", "水曜日", "火曜日", "金曜日"], "question": "What is the Japanese word for 'Thursday'?" },
    { "correctAnswer": "金曜日", "options": ["金曜日", "水曜日", "木曜日", "火曜日"], "question": "Which Japanese word means 'Friday'?" },
    { "correctAnswer": "土曜日", "options": ["土曜日", "日曜日", "月曜日", "水曜日"], "question": "What is the Japanese word for 'Saturday'?" },
    { "correctAnswer": "日曜日", "options": ["日曜日", "土曜日", "月曜日", "水曜日"], "question": "Which Japanese word means 'Sunday'?" },
    { "correctAnswer": "一", "options": ["一", "二", "三", "四"], "question": "What is the meaning of the kanji character '一'?" },
    { "correctAnswer": "二", "options": ["二", "一", "三", "四"], "question": "Which kanji character means 'two'?" },
    { "correctAnswer": "三", "options": ["三", "一", "二", "四"], "question": "What is the meaning of the kanji character '三'?" },
    { "correctAnswer": "四", "options": ["四", "一", "二", "三"], "question": "Which kanji character means 'four'?" },
    { "correctAnswer": "五", "options": ["五", "一", "二", "三"], "question": "What is the meaning of the kanji character '五'?" },
    { "correctAnswer": "六", "options": ["六", "一", "二", "三"], "question": "Which kanji character means 'six'?" },
    { "correctAnswer": "七", "options": ["七", "一", "二", "三"], "question": "What is the meaning of the kanji character '七'?" },
    { "correctAnswer": "八", "options": ["八", "一", "二", "三"], "question": "Which kanji character means 'eight'?" },
    { "correctAnswer": "九", "options": ["九", "一", "二", "三"], "question": "What is the meaning of the kanji character '九'?" },
    { "correctAnswer": "十", "options": ["十", "一", "二", "三"], "question": "Which kanji character means 'ten'?" },
    { "correctAnswer": "百", "options": ["百", "千", "万", "一"], "question": "What is the meaning of the kanji character '百'?" },
    { "correctAnswer": "千", "options": ["千", "百", "万", "一"], "question": "Which kanji character means 'thousand'?" },
    { "correctAnswer": "万", "options": ["万", "千", "百", "一"], "question": "What is the meaning of the kanji character '万'?" },
    { "correctAnswer": "円", "options": ["円", "ドル", "ユーロ", "ポンド"], "question": "Which kanji character means 'yen'?" },
    { "correctAnswer": "日本", "options": ["日本", "中国", "韓国", "アメリカ"], "question": "What is the Japanese word for 'Japan'?" },
    { "correctAnswer": "東京", "options": ["東京", "大阪", "京都", "福岡"], "question": "Which Japanese city is represented by the kanji characters '東京'?" },
    { "correctAnswer": "学校", "options": ["学校", "学生", "勉強", "教室"], "question": "What does the compound word '学校' mean in English?" },
    { "correctAnswer": "春", "options": ["春", "夏", "秋", "冬"], "question": "Which kanji character represents the season 'spring'?" },
    { "correctAnswer": "夏", "options": ["夏", "春", "秋", "冬"], "question": "What is the meaning of the kanji character '夏'?" },
    { "correctAnswer": "秋", "options": ["秋", "春", "夏", "冬"], "question": "Which kanji character represents the season 'autumn'?" },
    { "correctAnswer": "冬", "options": ["冬", "春", "夏", "秋"], "question": "What is the meaning of the kanji character '冬'?" },
    { "correctAnswer": "花", "options": ["花", "木", "草", "葉"], "question": "Which kanji character means 'flower'?" },
    { "correctAnswer": "鳥", "options": ["鳥", "犬", "猫", "魚"], "question": "What is the meaning of the kanji character '鳥'?" },
    { "correctAnswer": "雨", "options": ["雨", "雪", "晴", "曇"], "question": "Which kanji character means 'rain'?" },
    { "correctAnswer": "雪", "options": ["雪", "雨", "晴", "曇"], "question": "What is the meaning of the kanji character '雪'?" },
    { "correctAnswer": "晴", "options": ["晴", "雨", "雪", "曇"], "question": "Which kanji character means 'clear' or 'fine' weather?" },
    { "correctAnswer": "曇", "options": ["曇", "雨", "雪", "晴"], "question": "What is the meaning of the kanji character '曇'?" },
    { "correctAnswer": "海", "options": ["海", "川", "湖", "池"], "question": "Which kanji character means 'sea'?" },
    { "correctAnswer": "山", "options": ["山", "川", "田", "森"], "question": "What is the meaning of the kanji character '山'?" },
    { "correctAnswer": "川", "options": ["川", "山", "田", "森"], "question": "Which kanji character means 'river'?" },
    { "correctAnswer": "森", "options": ["森", "山", "川", "田"], "question": "What is the meaning of the kanji character '森'?" },
    { "correctAnswer": "道路", "options": ["道路", "鉄道", "空港", "港"], "question": "What does the compound word '道路' mean in English?" },
    { "correctAnswer": "駅", "options": ["駅", "銀行", "図書館", "病院"], "question": "Which Japanese term refers to a train station?" },
    { "correctAnswer": "飛行機", "options": ["飛行機", "電車", "自転車", "車"], "question": "What does the compound word '飛行機' mean in English?" },
    { "correctAnswer": "自動車", "options": ["自動車", "電車", "飛行機", "自転車"], "question": "Which Japanese term refers to a car?" },
    { "correctAnswer": "靴", "options": ["靴", "帽子", "バッグ", "時計"], "question": "Which kanji character means 'shoes'?" },
    { "correctAnswer": "帽子", "options": ["帽子", "靴", "バッグ", "時計"], "question": "What is the meaning of the kanji character '帽子'?" },
    { "correctAnswer": "バッグ", "options": ["バッグ", "靴", "帽子", "時計"], "question": "Which katakana term refers to a bag?" },
    { "correctAnswer": "時計", "options": ["時計", "靴", "帽子", "バッグ"], "question": "What does the kanji character '時計' mean in English?" },
    { "correctAnswer": "食べ物", "options": ["食べ物", "飲み物", "本", "新聞"], "question": "What does the compound word '食べ物' mean in English?" },
    { "correctAnswer": "飲み物", "options": ["飲み物", "食べ物", "本", "新聞"], "question": "Which Japanese term refers to a drink?" },
    { "correctAnswer": "本", "options": ["本", "新聞", "食べ物", "飲み物"], "question": "What does the kanji character '本' mean in English?" },
    { "correctAnswer": "新聞", "options": ["新聞", "本", "食べ物", "飲み物"], "question": "Which kanji character means 'newspaper'?" },
    { "correctAnswer": "電話", "options": ["電話", "テレビ", "ラジオ", "コンピュータ"], "question": "What does the compound word '電話' mean in English?" },
    { "correctAnswer": "テレビ", "options": ["テレビ", "電話", "ラジオ", "コンピュータ"], "question": "Which katakana term refers to a television?" },
    { "correctAnswer": "ラジオ", "options": ["ラジオ", "電話", "テレビ", "コンピュータ"], "question": "What does the katakana term 'ラジオ' mean in English?" },
    { "correctAnswer": "コンピュータ", "options": ["コンピュータ", "電話", "テレビ", "ラジオ"], "question": "Which katakana term refers to a computer?" },
    { "correctAnswer": "学生", "options": ["学生", "先生", "教室", "校舎"], "question": "What does the compound word '学生' mean in English?" },
    { "correctAnswer": "先生", "options": ["先生", "学生", "教室", "校舎"], "question": "Which Japanese term refers to a teacher?" },
    { "correctAnswer": "教室", "options": ["教室", "学生", "先生", "校舎"], "question": "What does the kanji character '教室' mean in English?" },
    { "correctAnswer": "校舎", "options": ["校舎", "学生", "先生", "教室"], "question": "Which kanji character means 'school building'?" }
    // Add more questions for j03
  ]
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
