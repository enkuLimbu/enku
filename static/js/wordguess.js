document.addEventListener("DOMContentLoaded", function() {
// Get the required HTML elements
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const feedbackMessageElement = document.getElementById('feedback-message');
const correctCountElement = document.getElementById('correct-count');
const wrongCountElement = document.getElementById('wrong-count');
const tryAgainButton = document.getElementById('try-again-button');

// Get the code from the query parameter or the window.quizCode variable
var urlParams = new URLSearchParams(window.location.search);
var codeFromUrl = urlParams.get('code');
var quizCode = codeFromUrl || window.quizCode || "h01"; // Use code from URL, window.quizCode variable, or default to "h01"

// Game state variables
let score = 0;
let currentQuestionIndex = 0;
let currentCategory = quizCode;

  // Define question sets
  var questionSets = {
"hira01": [
{"correctAnswer": "あ", "options": ["あ", "い", "う", "え"], "question": "What is the pronunciation of this hiragana character: aa"},
{"correctAnswer": "い", "options": ["い", "う", "え", "お"], "question": "What is the pronunciation of this hiragana character: ee"},
{"correctAnswer": "う", "options": ["う", "え", "お", "あ"], "question": "What is the pronunciation of this hiragana character: oo"},
{"correctAnswer": "え", "options": ["え", "お", "あ", "い"], "question": "What is the pronunciation of this hiragana character: eh"},
{"correctAnswer": "お", "options": ["お", "あ", "い", "う"], "question": "What is the pronunciation of this hiragana character: oh"},
{"correctAnswer": "か", "options": ["か", "き", "く", "け"], "question": "What is the pronunciation of this hiragana character: ka"},
{"correctAnswer": "き", "options": ["き", "く", "け", "こ"], "question": "What is the pronunciation of this hiragana character: ki"},
{"correctAnswer": "く", "options": ["く", "け", "こ", "さ"], "question": "What is the pronunciation of this hiragana character: ku"},
{"correctAnswer": "け", "options": ["け", "こ", "さ", "し"], "question": "What is the pronunciation of this hiragana character: ke"},
{"correctAnswer": "こ", "options": ["こ", "さ", "し", "す"], "question": "What is the pronunciation of this hiragana character: ko"},
{"correctAnswer": "さ", "options": ["さ", "し", "す", "せ"], "question": "What is the pronunciation of this hiragana character: sa"},
{"correctAnswer": "し", "options": ["し", "す", "せ", "そ"], "question": "What is the pronunciation of this hiragana character: shi"},
{"correctAnswer": "す", "options": ["す", "せ", "そ", "た"], "question": "What is the pronunciation of this hiragana character: su"},
{"correctAnswer": "せ", "options": ["せ", "そ", "た", "ち"], "question": "What is the pronunciation of this hiragana character: se"},
{"correctAnswer": "そ", "options": ["そ", "た", "ち", "つ"], "question": "What is the pronunciation of this hiragana character: so"},
{"correctAnswer": "た", "options": ["た", "ち", "つ", "て"], "question": "What is the pronunciation of this hiragana character: ta"},
{"correctAnswer": "ち", "options": ["ち", "つ", "て", "と"], "question": "What is the pronunciation of this hiragana character: chi"},
{"correctAnswer": "つ", "options": ["つ", "て", "と", "な"], "question": "What is the pronunciation of this hiragana character: tsu"},
{"correctAnswer": "て", "options": ["て", "と", "な", "に"], "question": "What is the pronunciation of this hiragana character: te"},
{"correctAnswer": "と", "options": ["と", "な", "に", "ぬ"], "question": "What is the pronunciation of this hiragana character: to"},
{"correctAnswer": "な", "options": ["な", "に", "ぬ", "ね"], "question": "What is the pronunciation of this hiragana character: na"},
{"correctAnswer": "に", "options": ["に", "ぬ", "ね", "の"], "question": "What is the pronunciation of this hiragana character: ni"},
{"correctAnswer": "ぬ", "options": ["ぬ", "ね", "の", "は"], "question": "What is the pronunciation of this hiragana character: nu"},
{"correctAnswer": "ね", "options": ["ね", "の", "は", "ひ"], "question": "What is the pronunciation of this hiragana character: ne"},
{"correctAnswer": "の", "options": ["の", "は", "ひ", "ふ"], "question": "What is the pronunciation of this hiragana character: no"},
{"correctAnswer": "は", "options": ["は", "ひ", "ふ", "へ"], "question": "What is the pronunciation of this hiragana character: ha"},
{"correctAnswer": "ひ", "options": ["ひ", "ふ", "へ", "ほ"], "question": "What is the pronunciation of this hiragana character: hi"},
{"correctAnswer": "ふ", "options": ["ふ", "へ", "ほ", "ま"], "question": "What is the pronunciation of this hiragana character: fu"},
{"correctAnswer": "へ", "options": ["へ", "ほ", "ま", "み"], "question": "What is the pronunciation of this hiragana character: he"},
{"correctAnswer": "ほ", "options": ["ほ", "ま", "み", "む"], "question": "What is the pronunciation of this hiragana character: ho"},
{"correctAnswer": "ま", "options": ["ま", "み", "む", "め"], "question": "What is the pronunciation of this hiragana character: ma"},
{"correctAnswer": "み", "options": ["み", "む", "め", "も"], "question": "What is the pronunciation of this hiragana character: mi"},
{"correctAnswer": "む", "options": ["む", "め", "も", "や"], "question": "What is the pronunciation of this hiragana character: mu"},
{"correctAnswer": "め", "options": ["め", "も", "や", "ゆ"], "question": "What is the pronunciation of this hiragana character: me"},
{"correctAnswer": "も", "options": ["も", "や", "ゆ", "よ"], "question": "What is the pronunciation of this hiragana character: mo"},
{"correctAnswer": "や", "options": ["や", "ゆ", "よ", "ら"], "question": "What is the pronunciation of this hiragana character: ya"},
{"correctAnswer": "ゆ", "options": ["ゆ", "よ", "ら", "り"], "question": "What is the pronunciation of this hiragana character: yu"},
{"correctAnswer": "よ", "options": ["よ", "ら", "り", "る"], "question": "What is the pronunciation of this hiragana character: yo"},
{"correctAnswer": "ら", "options": ["ら", "り", "る", "れ"], "question": "What is the pronunciation of this hiragana character: ra"},
{"correctAnswer": "り", "options": ["り", "る", "れ", "ろ"], "question": "What is the pronunciation of this hiragana character: ri"},
{"correctAnswer": "る", "options": ["る", "れ", "ろ", "わ"], "question": "What is the pronunciation of this hiragana character: ru"},
{"correctAnswer": "れ", "options": ["れ", "ろ", "わ", "を"], "question": "What is the pronunciation of this hiragana character: re"},
{"correctAnswer": "ろ", "options": ["ろ", "わ", "を", "ん"], "question": "What is the pronunciation of this hiragana character: ro"},
{"correctAnswer": "わ", "options": ["わ", "を", "ん", "が"], "question": "What is the pronunciation of this hiragana character: wa"},
{"correctAnswer": "を", "options": ["を", "ん", "が", "ぎ"], "question": "What is the pronunciation of this hiragana character: wo"},
{"correctAnswer": "ん", "options": ["ん", "が", "ぎ", "ぐ"], "question": "What is the pronunciation of this hiragana character: n"},
{"correctAnswer": "が", "options": ["が", "ぎ", "ぐ", "げ"], "question": "What is the pronunciation of this hiragana character: ga"},
{"correctAnswer": "ぎ", "options": ["ぎ", "ぐ", "げ", "ご"], "question": "What is the pronunciation of this hiragana character: gi"},
{"correctAnswer": "ぐ", "options": ["ぐ", "げ", "ご", "ざ"], "question": "What is the pronunciation of this hiragana character: gu"},
{"correctAnswer": "げ", "options": ["げ", "ご", "ざ", "じ"], "question": "What is the pronunciation of this hiragana character: ge"},
{"correctAnswer": "ご", "options": ["ご", "ざ", "じ", "ず"], "question": "What is the pronunciation of this hiragana character: go"},
{"correctAnswer": "ざ", "options": ["ざ", "じ", "ず", "ぜ"], "question": "What is the pronunciation of this hiragana character: za"},
{"correctAnswer": "じ", "options": ["じ", "ず", "ぜ", "ぞ"], "question": "What is the pronunciation of this hiragana character: ji"},
{"correctAnswer": "ず", "options": ["ず", "ぜ", "ぞ", "だ"], "question": "What is the pronunciation of this hiragana character: zu"},
{"correctAnswer": "ぜ", "options": ["ぜ", "ぞ", "だ", "ぢ"], "question": "What is the pronunciation of this hiragana character: ze"},
{"correctAnswer": "ぞ", "options": ["ぞ", "だ", "ぢ", "づ"], "question": "What is the pronunciation of this hiragana character: zo"},
{"correctAnswer": "だ", "options": ["だ", "ぢ", "づ", "で"], "question": "What is the pronunciation of this hiragana character: da"},
{"correctAnswer": "ぢ", "options": ["ぢ", "づ", "で", "ど"], "question": "What is the pronunciation of this hiragana character: ji/di"},
{"correctAnswer": "づ", "options": ["づ", "で", "ど", "ば"], "question": "What is the pronunciation of this hiragana character: zu/dzu"},
{"correctAnswer": "で", "options": ["で", "ど", "ば", "び"], "question": "What is the pronunciation of this hiragana character: de"},
{"correctAnswer": "ど", "options": ["ど", "ば", "び", "ぶ"], "question": "What is the pronunciation of this hiragana character: do"},
{"correctAnswer": "ば", "options": ["ば", "び", "ぶ", "べ"], "question": "What is the pronunciation of this hiragana character: ba"},
{"correctAnswer": "び", "options": ["び", "ぶ", "べ", "ぼ"], "question": "What is the pronunciation of this hiragana character: bi"},
{"correctAnswer": "あ", "options": ["あ", "い", "う", "え"], "question": "What is the pronunciation of this hiragana character: aa"},
{"correctAnswer": "い", "options": ["い", "う", "え", "お"], "question": "What is the pronunciation of this hiragana character: ee"},
{"correctAnswer": "う", "options": ["う", "え", "お", "あ"], "question": "What is the pronunciation of this hiragana character: oo"},
{"correctAnswer": "え", "options": ["え", "お", "あ", "い"], "question": "What is the pronunciation of this hiragana character: eh"},
{"correctAnswer": "お", "options": ["お", "あ", "い", "う"], "question": "What is the pronunciation of this hiragana character: oh"},
{"correctAnswer": "か", "options": ["か", "き", "く", "け"], "question": "What is the pronunciation of this hiragana character: ka"},
{"correctAnswer": "き", "options": ["き", "く", "け", "こ"], "question": "What is the pronunciation of this hiragana character: ki"},
{"correctAnswer": "く", "options": ["く", "け", "こ", "さ"], "question": "What is the pronunciation of this hiragana character: ku"},
{"correctAnswer": "け", "options": ["け", "こ", "さ", "し"], "question": "What is the pronunciation of this hiragana character: ke"},
{"correctAnswer": "こ", "options": ["こ", "さ", "し", "す"], "question": "What is the pronunciation of this hiragana character: ko"},
{"correctAnswer": "さ", "options": ["さ", "し", "す", "せ"], "question": "What is the pronunciation of this hiragana character: sa"},
{"correctAnswer": "し", "options": ["し", "す", "せ", "そ"], "question": "What is the pronunciation of this hiragana character: shi"},
{"correctAnswer": "す", "options": ["す", "せ", "そ", "た"], "question": "What is the pronunciation of this hiragana character: su"},
{"correctAnswer": "せ", "options": ["せ", "そ", "た", "ち"], "question": "What is the pronunciation of this hiragana character: se"},
{"correctAnswer": "そ", "options": ["そ", "た", "ち", "つ"], "question": "What is the pronunciation of this hiragana character: so"},
{"correctAnswer": "た", "options": ["た", "ち", "つ", "て"], "question": "What is the pronunciation of this hiragana character: ta"},
{"correctAnswer": "ち", "options": ["ち", "つ", "て", "と"], "question": "What is the pronunciation of this hiragana character: chi"},
{"correctAnswer": "つ", "options": ["つ", "て", "と", "な"], "question": "What is the pronunciation of this hiragana character: tsu"},
{"correctAnswer": "て", "options": ["て", "と", "な", "に"], "question": "What is the pronunciation of this hiragana character: te"},
{"correctAnswer": "と", "options": ["と", "な", "に", "ぬ"], "question": "What is the pronunciation of this hiragana character: to"},
{"correctAnswer": "な", "options": ["な", "に", "ぬ", "ね"], "question": "What is the pronunciation of this hiragana character: na"},
{"correctAnswer": "に", "options": ["に", "ぬ", "ね", "の"], "question": "What is the pronunciation of this hiragana character: ni"},
{"correctAnswer": "ぬ", "options": ["ぬ", "ね", "の", "は"], "question": "What is the pronunciation of this hiragana character: nu"},
{"correctAnswer": "ね", "options": ["ね", "の", "は", "ひ"], "question": "What is the pronunciation of this hiragana character: ne"},
{"correctAnswer": "の", "options": ["の", "は", "ひ", "ふ"], "question": "What is the pronunciation of this hiragana character: no"},
{"correctAnswer": "は", "options": ["は", "ひ", "ふ", "へ"], "question": "What is the pronunciation of this hiragana character: ha"},
{"correctAnswer": "ひ", "options": ["ひ", "ふ", "へ", "ほ"], "question": "What is the pronunciation of this hiragana character: hi"},
{"correctAnswer": "ふ", "options": ["ふ", "へ", "ほ", "ま"], "question": "What is the pronunciation of this hiragana character: fu"},
{"correctAnswer": "へ", "options": ["へ", "ほ", "ま", "み"], "question": "What is the pronunciation of this hiragana character: he"},
{"correctAnswer": "ほ", "options": ["ほ", "ま", "み", "む"], "question": "What is the pronunciation of this hiragana character: ho"},
{"correctAnswer": "ま", "options": ["ま", "み", "む", "め"], "question": "What is the pronunciation of this hiragana character: ma"},
{"correctAnswer": "み", "options": ["み", "む", "め", "も"], "question": "What is the pronunciation of this hiragana character: mi"},
{"correctAnswer": "む", "options": ["む", "め", "も", "や"], "question": "What is the pronunciation of this hiragana character: mu"},
{"correctAnswer": "め", "options": ["め", "も", "や", "ゆ"], "question": "What is the pronunciation of this hiragana character: me"},
{"correctAnswer": "も", "options": ["も", "や", "ゆ", "よ"], "question": "What is the pronunciation of this hiragana character: mo"},
{"correctAnswer": "や", "options": ["や", "ゆ", "よ", "ら"], "question": "What is the pronunciation of this hiragana character: ya"},
{"correctAnswer": "ゆ", "options": ["ゆ", "よ", "ら", "り"], "question": "What is the pronunciation of this hiragana character: yu"},
{"correctAnswer": "よ", "options": ["よ", "ら", "り", "る"], "question": "What is the pronunciation of this hiragana character: yo"},
{"correctAnswer": "ら", "options": ["ら", "り", "る", "れ"], "question": "What is the pronunciation of this hiragana character: ra"},
{"correctAnswer": "り", "options": ["り", "る", "れ", "ろ"], "question": "What is the pronunciation of this hiragana character: ri"},
{"correctAnswer": "る", "options": ["る", "れ", "ろ", "わ"], "question": "What is the pronunciation of this hiragana character: ru"},
{"correctAnswer": "れ", "options": ["れ", "ろ", "わ", "を"], "question": "What is the pronunciation of this hiragana character: re"},
{"correctAnswer": "ろ", "options": ["ろ", "わ", "を", "ん"], "question": "What is the pronunciation of this hiragana character: ro"},
{"correctAnswer": "わ", "options": ["わ", "を", "ん", "が"], "question": "What is the pronunciation of this hiragana character: wa"},
{"correctAnswer": "を", "options": ["を", "ん", "が", "ぎ"], "question": "What is the pronunciation of this hiragana character: wo"},
{"correctAnswer": "ん", "options": ["ん", "が", "ぎ", "ぐ"], "question": "What is the pronunciation of this hiragana character: n"},
{"correctAnswer": "が", "options": ["が", "ぎ", "ぐ", "げ"], "question": "What is the pronunciation of this hiragana character: ga"},
{"correctAnswer": "ぎ", "options": ["ぎ", "ぐ", "げ", "ご"], "question": "What is the pronunciation of this hiragana character: gi"},
{"correctAnswer": "ぐ", "options": ["ぐ", "げ", "ご", "ざ"], "question": "What is the pronunciation of this hiragana character: gu"},
{"correctAnswer": "げ", "options": ["げ", "ご", "ざ", "じ"], "question": "What is the pronunciation of this hiragana character: ge"},
{"correctAnswer": "ご", "options": ["ご", "ざ", "じ", "ず"], "question": "What is the pronunciation of this hiragana character: go"},
{"correctAnswer": "ざ", "options": ["ざ", "じ", "ず", "ぜ"], "question": "What is the pronunciation of this hiragana character: za"},
{"correctAnswer": "じ", "options": ["じ", "ず", "ぜ", "ぞ"], "question": "What is the pronunciation of this hiragana character: ji"},
{"correctAnswer": "ず", "options": ["ず", "ぜ", "ぞ", "だ"], "question": "What is the pronunciation of this hiragana character: zu"},
{"correctAnswer": "ぜ", "options": ["ぜ", "ぞ", "だ", "ぢ"], "question": "What is the pronunciation of this hiragana character: ze"},
{"correctAnswer": "ぞ", "options": ["ぞ", "だ", "ぢ", "づ"], "question": "What is the pronunciation of this hiragana character: zo"},
{"correctAnswer": "だ", "options": ["だ", "ぢ", "づ", "で"], "question": "What is the pronunciation of this hiragana character: da"},
{"correctAnswer": "ぢ", "options": ["ぢ", "づ", "で", "ど"], "question": "What is the pronunciation of this hiragana character: ji/di"},
{"correctAnswer": "づ", "options": ["づ", "で", "ど", "ば"], "question": "What is the pronunciation of this hiragana character: zu/dzu"},
{"correctAnswer": "で", "options": ["で", "ど", "ば", "び"], "question": "What is the pronunciation of this hiragana character: de"},
{"correctAnswer": "ど", "options": ["ど", "ば", "び", "ぶ"], "question": "What is the pronunciation of this hiragana character: do"},
{"correctAnswer": "ば", "options": ["ば", "び", "ぶ", "べ"], "question": "What is the pronunciation of this hiragana character: ba"},
{"correctAnswer": "び", "options": ["び", "ぶ", "べ", "ぼ"], "question": "What is the pronunciation of this hiragana character: bi"},
{"correctAnswer": "ぶ", "options": ["ぶ", "べ", "ぼ", "ぱ"], "question": "What is the pronunciation of this hiragana character: bu"},
{"correctAnswer": "べ", "options": ["べ", "ぼ", "ぱ", "ぴ"], "question": "What is the pronunciation of this hiragana character: be"},
{"correctAnswer": "ぼ", "options": ["ぼ", "ぱ", "ぴ", "ぷ"], "question": "What is the pronunciation of this hiragana character: bo"},
{"correctAnswer": "ぱ", "options": ["ぱ", "ぴ", "ぷ", "ぺ"], "question": "What is the pronunciation of this hiragana character: pa"},
{"correctAnswer": "ぴ", "options": ["ぴ", "ぷ", "ぺ", "ぽ"], "question": "What is the pronunciation of this hiragana character: pi"},
{"correctAnswer": "ぷ", "options": ["ぷ", "ぺ", "ぽ", "へ"], "question": "What is the pronunciation of this hiragana character: pu"},
{"correctAnswer": "ぺ", "options": ["ぺ", "ぽ", "へ", "ほ"], "question": "What is the pronunciation of this hiragana character: pe"},
{"correctAnswer": "ぽ", "options": ["ぽ", "へ", "ほ", "ま"], "question": "What is the pronunciation of this hiragana character: po"},
{"correctAnswer": "ぶ", "options": ["ぶ", "べ", "ぼ", "ぱ"], "question": "What is the pronunciation of this hiragana character: bu"},
{"correctAnswer": "べ", "options": ["べ", "ぼ", "ぱ", "ぴ"], "question": "What is the pronunciation of this hiragana character: be"},
{"correctAnswer": "ぼ", "options": ["ぼ", "ぱ", "ぴ", "ぷ"], "question": "What is the pronunciation of this hiragana character: bo"},
{"correctAnswer": "ぱ", "options": ["ぱ", "ぴ", "ぷ", "ぺ"], "question": "What is the pronunciation of this hiragana character: pa"},
{"correctAnswer": "ぴ", "options": ["ぴ", "ぷ", "ぺ", "ぽ"], "question": "What is the pronunciation of this hiragana character: pi"},
{"correctAnswer": "ぷ", "options": ["ぷ", "ぺ", "ぽ", "へ"], "question": "What is the pronunciation of this hiragana character: pu"},
{"correctAnswer": "ぺ", "options": ["ぺ", "ぽ", "へ", "ほ"], "question": "What is the pronunciation of this hiragana character: pe"},
{"correctAnswer": "ぽ", "options": ["ぽ", "へ", "ほ", "ま"], "question": "What is the pronunciation of this hiragana character: po"}
 ],

"hira11": 
[
  {"correctAnswer": "o-u", "options": ["a-i", "e-i", "o-u", "u-e"], "question": "What is the extended sound for おう?"},
  {"correctAnswer": "gan", "options": ["zen", "kan", "gen", "gan"], "question": "How is がん pronounced in English?"},
  {"correctAnswer": "ha-mu", "options": ["ha-mo", "he-mu", "ho-mu", "ha-mu"], "question": "What is the Hiragana representation for はむ?"},
  {"correctAnswer": "oil", "options": ["air", "oil", "sun", "moon"], "question": "How is おい pronounced in English?"},
  {"correctAnswer": "kin-pen-betsu", "options": ["kin-fun-betsu", "kin-pen-betsu", "gin-pen-getsu", "kan-pen-betsu"], "question": "Break down the Hiragana characters for きんぴんべつ."},
  {"correctAnswer": "sakura no hana ga", "options": ["hana no sakura ga", "ga hana no sakura", "sakura no hana ga", "ga sakura no hana"], "question": "Arrange the Hiragana characters for さくらのはなが."},
  {"correctAnswer": "neko ga inu o oikakemasu", "options": ["neko o inu ga oikakemasu", "ga inu oikakemasu neko", "neko ga inu o oikakemasu", "oikakemasu inu neko ga"], "question": "Construct the sentence ねこがいぬを おいかけます in English."},
  {"correctAnswer": "tetsu", "options": ["ta-tsu", "te-tsu", "to-tsu", "tetsu"], "question": "What is the result when you combine て and つ?"},
  {"correctAnswer": "hamu", "options": ["hi-mu", "he-mu", "ha-mu", "ho-mu"], "question": "What is the result when you combine は and む?"},
  {"correctAnswer": "oikakemasu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is おいかけます pronounced in English?"},
  {"correctAnswer": "yo-ru", "options": ["ya-ru", "yu-ru", "yo-ru", "yi-ru"], "question": "How is よる pronounced in English?"},
  {"correctAnswer": "to-tsu", "options": ["ta-tsu", "te-tsu", "to-tsu", "ti-tsu"], "question": "What is the result when you combine と and つ?"},
  {"correctAnswer": "oi", "options": ["ai", "oi", "ui", "ei"], "question": "How is おい pronounced in English?"},
  {"correctAnswer": "sakura", "options": ["hana", "momo", "sakura", "kaze"], "question": "What is the seasonal word for cherry blossoms?"},
  {"correctAnswer": "tsu", "options": ["ta", "chi", "tsu", "te"], "question": "What is the Hiragana character for つ?"},
  {"correctAnswer": "tō-kyō", "options": ["tō-kyō", "o-sa-ka", "kyō-to", "fu-ku-o-ka"], "question": "How is とうきょう pronounced in English?"},
  {"correctAnswer": "kumquat", "options": ["lemon", "kumquat", "apple", "banana"], "question": "How is さくら pronounced in English?"},
  {"correctAnswer": "yo-ru", "options": ["ya-ru", "yu-ru", "yo-ru", "yi-ru"], "question": "How is よる pronounced in English?"},
  {"correctAnswer": "nu", "options": ["na", "ni", "nu", "ne"], "question": "What is the Hiragana character for ぬ?"},
  {"correctAnswer": "oikakemasu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is おいかけます pronounced in English?"},
  {"correctAnswer": "oikakemashu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is おいかけます pronounced in English?"},
  {"correctAnswer": "e-i", "options": ["a-i", "e-i", "o-u", "u-e"], "question": "What is the extended sound for えい?"},
  {"correctAnswer": "shu", "options": ["sa", "shi", "su", "shu"], "question": "What is the Hiragana character for しゅ?"},
  {"correctAnswer": "hi-mo", "options": ["hi-mu", "he-mo", "ho-mu", "ha-mo"], "question": "What is the result when you combine ひ and も?"},
  {"correctAnswer": "sakura no hana ga", "options": ["hana no sakura ga", "ga hana no sakura", "sakura no hana ga", "ga sakura no hana"], "question": "Arrange the Hiragana characters for さくらのはなが."},
  {"correctAnswer": "ni", "options": ["na", "ni", "nu", "ne"], "question": "What is the Hiragana character for に?"},
  {"correctAnswer": "chi-hi", "options": ["ta-hi", "chi-hi", "tsu-hi", "te-hi"], "question": "What is the result when you combine ち and ひ?"},
  {"correctAnswer": "oikakemashu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is おいかけます pronounced in English?"},
  {"correctAnswer": "ki-mo-no", "options": ["ka-mo-no", "ki-mo-no", "ku-mo-no", "ke-mo-no"], "question": "What is the result when you combine き and も?"},
  {"correctAnswer": "tō-kyō", "options": ["tō-kyō", "o-sa-ka", "kyō-to", "fu-ku-o-ka"], "question": "How is とうきょう pronounced in English?"},
  {"correctAnswer": "ka-ze", "options": ["ka-ze", "ki-ze", "ku-ze", "ke-ze"], "question": "What is the result when you combine か and ぜ?"},
  {"correctAnswer": "e-i", "options": ["a-i", "e-i", "o-u", "u-e"], "question": "What is the extended sound for えい?"},
  {"correctAnswer": "ho-ru", "options": ["ha-ru", "hi-ru", "hu-ru", "ho-ru"], "question": "What is the result when you combine ほ and る?"},
  {"correctAnswer": "oikakemasu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is おいかけます pronounced in English?"},
  {"correctAnswer": "u-e", "options": ["a-i", "e-i", "o-u", "u-e"], "question": "What is the extended sound for うえ?"},
  {"correctAnswer": "hi-ro-i", "options": ["ha-ro-i", "hi-ro-i", "hu-ro-i", "ho-ro-i"], "question": "What is the result when you combine ひ and ろ?"},
  {"correctAnswer": "oikakemashu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is おいかけます pronounced in English?"},
  {"correctAnswer": "mo-mo", "options": ["ma-ma", "mi-mi", "mu-mu", "mo-mo"], "question": "What is the result when you combine も and も?"},
  {"correctAnswer": "yo-ru", "options": ["ya-ru", "yu-ru", "yo-ru", "yi-ru"], "question": "How is よる pronounced in English?"},
  {"correctAnswer": "nu", "options": ["na", "ni", "nu", "ne"], "question": "What is the Hiragana character for ぬ?"},
  {"correctAnswer": "oikakemashu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is おいかけます pronounced in English?"},
  {"correctAnswer": "ku-ki", "options": ["ka-ki", "ki-ki", "ku-ki", "ke-ki"], "question": "What is the result when you combine く and き?"},
  {"correctAnswer": "tō-kyō", "options": ["tō-kyō", "o-sa-ka", "kyō-to", "fu-ku-o-ka"], "question": "How is とうきょう pronounced in English?"},
  {"correctAnswer": "ya-ku", "options": ["ya-ka", "yu-ku", "yo-ku", "yi-ku"], "question": "What is the result when you combine や and く?"},
  {"correctAnswer": "i-e", "options": ["a-i", "e-i", "o-u", "u-e"], "question": "What is the extended sound for いえ?"},
  {"correctAnswer": "te-le-bi", "options": ["ta-le-bi", "chi-le-bi", "tsu-le-bi", "te-le-bi"], "question": "What is the result when you combine て and れ and び?"},
  {"correctAnswer": "oikakemashu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is おいかけます pronounced in English?"},
  {"correctAnswer": "ta-chi", "options": ["ta-chi", "chi-chi", "tsu-chi", "te-chi"], "question": "What is the result when you combine た and ち?"},
  {"correctAnswer": "ho-ru", "options": ["ha-ru", "hi-ru", "hu-ru", "ho-ru"], "question": "What is the result when you combine ほ and る?"},
  {"correctAnswer": "oikakemashu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is おいかけます pronounced in English?"}
],
"hira21":[
{"correctAnswer": "かのじょ", "options": ["あのひと", "あいしてる", "かのじょ", "いつも"], "question": "How is 'she' pronounced in hiragana?"},
{"correctAnswer": "さくら", "options": ["たいよう", "ふぉん", "さくら", "りんご"], "question": "How is 'cherry blossoms(sakura)' pronounced in hiragana?"},
{"correctAnswer": "に", "options": ["の", "ぬ", "な", "に"], "question": "What is the pronunciation of this Hiragana character: ni?"},
{"correctAnswer": "かぜ", "options": ["くるま", "ねこ", "かぜ", "おんがく"], "question": "How is 'wind(kaze)' pronounced in hiragana?"},
{"correctAnswer": "もも", "options": ["さくら", "かばん", "もも", "ともだち"], "question": "How is 'peach(momo)' pronounced in hiragana?"},
{"correctAnswer": "たてもの", "options": ["てがみ", "おうち", "たてもの", "かさ"], "question": "How is 'building(tatemono)' pronounced in hiragana?"},
{"correctAnswer": "ひる", "options": ["くるま", "にちよう", "たいよう", "ひる"], "question": "How is 'noon(hiru)' pronounced in hiragana?"},
{"correctAnswer": "みず", "options": ["すいか", "やさい", "れいぞうこ", "みず"], "question": "How is 'water(mizu)' pronounced in hiragana?"},
{"correctAnswer": "ねこ", "options": ["ははおや", "ねこ", "あね", "いぬ"], "question": "How is 'cat(neko)' pronounced in hiragana?"},
{"correctAnswer": "いぬ", "options": ["くじら", "いぬ", "あさごはん", "しょうゆ"], "question": "How is 'dog(inu)' pronounced in hiragana?"},
{"correctAnswer": "はな", "options": ["ねこ", "ははおや", "はな", "おとうと"], "question": "How is 'flower(hana)' pronounced in hiragana?"},
{"correctAnswer": "きのこ", "options": ["はし", "あさごはん", "てがみ", "きのこ"], "question": "How is 'mushroom(kinoko)' pronounced in hiragana?"},
{"correctAnswer": "おしゃべり", "options": ["はし", "ほん", "おしゃべり", "りんご"], "question": "How is 'chatting(oshaberi)' pronounced in hiragana?"},
{"correctAnswer": "やさい", "options": ["うみ", "せんせい", "やさい", "おとうと"], "question": "How is 'vegetable(yasai)' pronounced in hiragana?"},
{"correctAnswer": "あめ", "options": ["くも", "おとうと", "あめ", "はな"], "question": "How is 'rain(ame)' pronounced in hiragana?"},
{"correctAnswer": "にわ", "options": ["おもちゃ", "てがみ", "いぬ", "にわ"], "question": "How is 'garden(niwa)' pronounced in hiragana?"},
{"correctAnswer": "かばん", "options": ["しゃしん", "かばん", "おもちゃ", "はな"], "question": "How is 'bag(kaban)' pronounced in hiragana?"},
{"correctAnswer": "でんわ", "options": ["ひる", "ねこ", "いぬ", "でんわ"], "question": "How is 'telephone(denwa)' pronounced in hiragana?"},
{"correctAnswer": "あかい", "options": ["おばあさん", "さんぽ", "あかい", "しごと"], "question": "How is 'red(akai)' pronounced in hiragana?"},
{"correctAnswer": "ともだち", "options": ["さんぽ", "あかい", "しんぶん", "ともだち"], "question": "How is 'friend(tomodachi)' pronounced in hiragana?"},
{"correctAnswer": "ははおや", "options": ["ひる", "いぬ", "ははおや", "さんぽ"], "question": "How is 'mother' pronounced in hiragana?"},
{"correctAnswer": "あおい", "options": ["さんぽ", "ひる", "あおい", "しんぶん"], "question": "How is 'blue' pronounced in hiragana?"},
{"correctAnswer": "こども", "options": ["さんぽ", "いぬ", "こども", "さん"], "question": "How is 'child' pronounced in hiragana?"},
{"correctAnswer": "としょかん", "options": ["さん", "さんぽ", "としょかん", "さんしょ"], "question": "How is 'library' pronounced in hiragana?"},
{"correctAnswer": "せんせい", "options": ["さんしょ", "さん", "せんせい", "さんぽ"], "question": "How is 'teacher' pronounced in hiragana?"},
{"correctAnswer": "かれし", "options": ["さんぽ", "さんしょ", "かれし", "さん"], "question": "How is 'boyfriend' pronounced in hiragana?"},
{"correctAnswer": "ひと", "options": ["さんしょ", "さんぽ", "ひと", "さん"], "question": "How is 'person' pronounced in hiragana?"},
{"correctAnswer": "くじら", "options": ["さん", "さんぽ", "くじら", "さんしょ"], "question": "How is 'whale' pronounced in hiragana?"},
{"correctAnswer": "きつね", "options": ["さんしょ", "さん", "きつね", "さんぽ"], "question": "How is 'fox' pronounced in hiragana?"},
{"correctAnswer": "おとうと", "options": ["さんしょ", "さんぽ", "おとうと", "さん"], "question": "How is 'younger brother' pronounced in hiragana?"},
{"correctAnswer": "あね", "options": ["さんしょ", "さん", "あね", "さんぽ"], "question": "How is 'older sister' pronounced in hiragana?"},
{"correctAnswer": "りんご", "options": ["さんしょ", "さんぽ", "りんご", "さん"], "question": "How is 'apple' pronounced in hiragana?"},
{"correctAnswer": "おばあさん", "options": ["さんしょ", "さんぽ", "おばあさん", "さん"], "question": "How is 'grandmother' pronounced in hiragana?"},
{"correctAnswer": "きのう", "options": ["さんしょ", "さんぽ", "きのう", "さん"], "question": "How is 'yesterday' pronounced in hiragana?"},
{"correctAnswer": "あした", "options": ["さんしょ", "さんぽ", "あした", "さん"], "question": "How is 'tomorrow' pronounced in hiragana?"},
{"correctAnswer": "あさごはん", "options": ["さんしょ", "さんぽ", "あさごはん", "さん"], "question": "How is 'breakfast' pronounced in hiragana?"},
{"correctAnswer": "ばんごはん", "options": ["さんしょ", "さんぽ", "ばんごはん", "さん"], "question": "How is 'dinner' pronounced in hiragana?"},
{"correctAnswer": "りょこう", "options": ["さんしょ", "さんぽ", "りょこう", "さん"], "question": "How is 'travel' pronounced in hiragana?"},
{"correctAnswer": "かぞく", "options": ["さんしょ", "さんぽ", "かぞく", "さん"], "question": "How is 'family' pronounced in hiragana?"},
{"correctAnswer": "しごと", "options": ["さんしょ", "さんぽ", "しごと", "さん"], "question": "How is 'work' pronounced in hiragana?"},
{"correctAnswer": "しんぶん", "options": ["さんしょ", "さんぽ", "しんぶん", "さん"], "question": "How is 'newspaper' pronounced in hiragana?"},
{"correctAnswer": "ざっし", "options": ["さんしょ", "さんぽ", "ざっし", "さん"], "question": "How is 'magazine' pronounced in hiragana?"},
{"correctAnswer": "かがく", "options": ["さんしょ", "さんぽ", "かがく", "さん"], "question": "How is 'science' pronounced in hiragana?"},
{"correctAnswer": "れいぞうこ", "options": ["さんしょ", "さんぽ", "れいぞうこ", "さん"], "question": "How is 'refrigerator' pronounced in hiragana?"},
{"correctAnswer": "でんき", "options": ["さんしょ", "さんぽ", "でんき", "さん"], "question": "How is 'electricity' pronounced in hiragana?"},
{"correctAnswer": "くるま", "options": ["さんしょ", "さんぽ", "くるま", "さん"], "question": "How is 'car' pronounced in hiragana?"},
{"correctAnswer": "しゃしん", "options": ["さんしょ", "さんぽ", "しゃしん", "さん"], "question": "How is 'photograph' pronounced in hiragana?"},
{"correctAnswer": "うみ", "options": ["さんしょ", "さんぽ", "うみ", "さん"], "question": "How is 'sea' pronounced in hiragana?"},
{"correctAnswer": "くも", "options": ["さんしょ", "さんぽ", "くも", "さん"], "question": "How is 'cloud' pronounced in hiragana?"},
{"correctAnswer": "りょかん", "options": ["さんしょ", "さんぽ", "りょかん", "さん"], "question": "How is 'inn' pronounced in hiragana?"},
{"correctAnswer": "はし", "options": ["さんしょ", "さんぽ", "はし", "さん"], "question": "How is 'chopsticks' pronounced in hiragana?"},
{"correctAnswer": "ほん", "options": ["さんしょ", "さんぽ", "ほん", "さん"], "question": "How is 'book' pronounced in hiragana?"},
{"correctAnswer": "ほんだな", "options": ["さんしょ", "さんぽ", "ほんだな", "さん"], "question": "How is 'bookshelf' pronounced in hiragana?"},
{"correctAnswer": "すいか", "options": ["さんしょ", "さんぽ", "すいか", "さん"], "question": "How is 'watermelon' pronounced in hiragana?"},
{"correctAnswer": "やさい", "options": ["さんしょ", "さんぽ", "やさい", "さん"], "question": "How is 'vegetables' pronounced in hiragana?"},
{"correctAnswer": "くつ", "options": ["さんしょ", "さんぽ", "くつ", "さん"], "question": "How is 'shoes' pronounced in hiragana?"},
{"correctAnswer": "かさ", "options": ["さんしょ", "さんぽ", "かさ", "さん"], "question": "How is 'umbrella' pronounced in hiragana?"},
{"correctAnswer": "てがみ", "options": ["さんしょ", "さんぽ", "てがみ", "さん"], "question": "How is 'letter' pronounced in hiragana?"},
{"correctAnswer": "おもちゃ", "options": ["さんしょ", "さんぽ", "おもちゃ", "さん"], "question": "How is 'toy' pronounced in hiragana?"},
{"correctAnswer": "とけい", "options": ["さんしょ", "さんぽ", "とけい", "さん"], "question": "How is 'clock' pronounced in hiragana?"}
    ],

"kata02": [
{"correctAnswer": "ア", "options": ["ア", "イ", "ウ", "エ"], "question": "What is the pronunciation of this katakana character: a"},
{"correctAnswer": "イ", "options": ["イ", "ウ", "エ", "オ"], "question": "What is the pronunciation of this katakana character: i"},
{"correctAnswer": "ウ", "options": ["ウ", "エ", "オ", "ア"], "question": "What is the pronunciation of this katakana character: u"},
{"correctAnswer": "エ", "options": ["エ", "オ", "ア", "イ"], "question": "What is the pronunciation of this katakana character: e"},
{"correctAnswer": "オ", "options": ["オ", "ア", "イ", "ウ"], "question": "What is the pronunciation of this katakana character: o"},
{"correctAnswer": "カ", "options": ["カ", "キ", "ク", "ケ"], "question": "What is the pronunciation of this katakana character: ka"},
{"correctAnswer": "キ", "options": ["キ", "ク", "ケ", "コ"], "question": "What is the pronunciation of this katakana character: ki"},
{"correctAnswer": "ク", "options": ["ク", "ケ", "コ", "サ"], "question": "What is the pronunciation of this katakana character: ku"},
{"correctAnswer": "ケ", "options": ["ケ", "コ", "サ", "シ"], "question": "What is the pronunciation of this katakana character: ke"},
{"correctAnswer": "コ", "options": ["コ", "サ", "シ", "ス"], "question": "What is the pronunciation of this katakana character: ko"},
{"correctAnswer": "サ", "options": ["サ", "シ", "ス", "セ"], "question": "What is the pronunciation of this katakana character: sa"},
{"correctAnswer": "シ", "options": ["シ", "ス", "セ", "ソ"], "question": "What is the pronunciation of this katakana character: shi"},
{"correctAnswer": "ス", "options": ["ス", "セ", "ソ", "タ"], "question": "What is the pronunciation of this katakana character: su"},
{"correctAnswer": "セ", "options": ["セ", "ソ", "タ", "チ"], "question": "What is the pronunciation of this katakana character: se"},
{"correctAnswer": "ソ", "options": ["ソ", "タ", "チ", "ツ"], "question": "What is the pronunciation of this katakana character: so"},
{"correctAnswer": "タ", "options": ["タ", "チ", "ツ", "テ"], "question": "What is the pronunciation of this katakana character: ta"},
{"correctAnswer": "チ", "options": ["チ", "ツ", "テ", "ト"], "question": "What is the pronunciation of this katakana character: chi"},
{"correctAnswer": "ツ", "options": ["ツ", "テ", "ト", "ナ"], "question": "What is the pronunciation of this katakana character: tsu"},
{"correctAnswer": "テ", "options": ["テ", "ト", "ナ", "ニ"], "question": "What is the pronunciation of this katakana character: te"},
{"correctAnswer": "ト", "options": ["ト", "ナ", "ニ", "ヌ"], "question": "What is the pronunciation of this katakana character: to"},
{"correctAnswer": "ナ", "options": ["ナ", "ニ", "ヌ", "ネ"], "question": "What is the pronunciation of this katakana character: na"},
{"correctAnswer": "ニ", "options": ["ニ", "ヌ", "ネ", "ノ"], "question": "What is the pronunciation of this katakana character: ni"},
{"correctAnswer": "ヌ", "options": ["ヌ", "ネ", "ノ", "ハ"], "question": "What is the pronunciation of this katakana character: nu"},
{"correctAnswer": "ネ", "options": ["ネ", "ノ", "ハ", "ヒ"], "question": "What is the pronunciation of this katakana character: ne"},
{"correctAnswer": "ノ", "options": ["ノ", "ハ", "ヒ", "フ"], "question": "What is the pronunciation of this katakana character: no"},
{"correctAnswer": "ハ", "options": ["ハ", "ヒ", "フ", "ヘ"], "question": "What is the pronunciation of this katakana character: ha"},
{"correctAnswer": "ヒ", "options": ["ヒ", "フ", "ヘ", "ホ"], "question": "What is the pronunciation of this katakana character: hi"},
{"correctAnswer": "フ", "options": ["フ", "ヘ", "ホ", "マ"], "question": "What is the pronunciation of this katakana character: fu"},
{"correctAnswer": "ヘ", "options": ["ヘ", "ホ", "マ", "ミ"], "question": "What is the pronunciation of this katakana character: he"},
{"correctAnswer": "ホ", "options": ["ホ", "マ", "ミ", "ム"], "question": "What is the pronunciation of this katakana character: ho"},
{"correctAnswer": "マ", "options": ["マ", "ミ", "ム", "メ"], "question": "What is the pronunciation of this katakana character: ma"},
{"correctAnswer": "ミ", "options": ["ミ", "ム", "メ", "モ"], "question": "What is the pronunciation of this katakana character: mi"},
{"correctAnswer": "ム", "options": ["ム", "メ", "モ", "ヤ"], "question": "What is the pronunciation of this katakana character: mu"},
{"correctAnswer": "メ", "options": ["メ", "モ", "ヤ", "ユ"], "question": "What is the pronunciation of this katakana character: me"},
{"correctAnswer": "モ", "options": ["モ", "ヤ", "ユ", "ヨ"], "question": "What is the pronunciation of this katakana character: mo"},
{"correctAnswer": "ヤ", "options": ["ヤ", "ユ", "ヨ", "ラ"], "question": "What is the pronunciation of this katakana character: ya"},
{"correctAnswer": "ユ", "options": ["ユ", "ヨ", "ラ", "リ"], "question": "What is the pronunciation of this katakana character: yu"},
{"correctAnswer": "ヨ", "options": ["ヨ", "ラ", "リ", "ル"], "question": "What is the pronunciation of this katakana character: yo"},
{"correctAnswer": "ラ", "options": ["ラ", "リ", "ル", "レ"], "question": "What is the pronunciation of this katakana character: ra"},
{"correctAnswer": "リ", "options": ["リ", "ル", "レ", "ロ"], "question": "What is the pronunciation of this katakana character: ri"},
{"correctAnswer": "ル", "options": ["ル", "レ", "ロ", "ワ"], "question": "What is the pronunciation of this katakana character: ru"},
{"correctAnswer": "レ", "options": ["レ", "ロ", "ワ", "ヲ"], "question": "What is the pronunciation of this katakana character: re"},
{"correctAnswer": "ロ", "options": ["ロ", "ワ", "ヲ", "ン"], "question": "What is the pronunciation of this katakana character: ro"},
{"correctAnswer": "ワ", "options": ["ワ", "ヲ", "ン", "ガ"], "question": "What is the pronunciation of this katakana character: wa"},
{"correctAnswer": "ヲ", "options": ["ヲ", "ン", "ガ", "ギ"], "question": "What is the pronunciation of this katakana character: wo"},
{"correctAnswer": "ン", "options": ["ン", "ガ", "ギ", "グ"], "question": "What is the pronunciation of this katakana character: n"},
{"correctAnswer": "ガ", "options": ["ガ", "ギ", "グ", "ゲ"], "question": "What is the pronunciation of this katakana character: ga"},
{"correctAnswer": "ギ", "options": ["ギ", "グ", "ゲ", "ゴ"], "question": "What is the pronunciation of this katakana character: gi"},
{"correctAnswer": "グ", "options": ["グ", "ゲ", "ゴ", "ザ"], "question": "What is the pronunciation of this katakana character: gu"},
{"correctAnswer": "ゲ", "options": ["ゲ", "ゴ", "ザ", "ジ"], "question": "What is the pronunciation of this katakana character: ge"},
{"correctAnswer": "ゴ", "options": ["ゴ", "ザ", "ジ", "ズ"], "question": "What is the pronunciation of this katakana character: go"},
{"correctAnswer": "ザ", "options": ["ザ", "ジ", "ズ", "ゼ"], "question": "What is the pronunciation of this katakana character: za"},
{"correctAnswer": "ジ", "options": ["ジ", "ズ", "ゼ", "ゾ"], "question": "What is the pronunciation of this katakana character: ji"},
{"correctAnswer": "ズ", "options": ["ズ", "ゼ", "ゾ", "ダ"], "question": "What is the pronunciation of this katakana character: zu"},
{"correctAnswer": "ゼ", "options": ["ゼ", "ゾ", "ダ", "ヂ"], "question": "What is the pronunciation of this katakana character: ze"},
{"correctAnswer": "ゾ", "options": ["ゾ", "ダ", "ヂ", "ヅ"], "question": "What is the pronunciation of this katakana character: zo"},
{"correctAnswer": "ダ", "options": ["ダ", "ヂ", "ヅ", "デ"], "question": "What is the pronunciation of this katakana character: da"},
{"correctAnswer": "ヂ", "options": ["ヂ", "ヅ", "デ", "ド"], "question": "What is the pronunciation of this katakana character: ji/di"},
{"correctAnswer": "ヅ", "options": ["ヅ", "デ", "ド", "バ"], "question": "What is the pronunciation of this katakana character: zu/dzu"},
{"correctAnswer": "デ", "options": ["デ", "ド", "バ", "ビ"], "question": "What is the pronunciation of this katakana character: de"},
{"correctAnswer": "ド", "options": ["ド", "バ", "ビ", "ブ"], "question": "What is the pronunciation of this katakana character: do"},
{"correctAnswer": "バ", "options": ["バ", "ビ", "ブ", "ベ"], "question": "What is the pronunciation of this katakana character: ba"},
{"correctAnswer": "ビ", "options": ["ビ", "ブ", "ベ", "ボ"], "question": "What is the pronunciation of this katakana character: bi"},
{"correctAnswer": "ブ", "options": ["ブ", "ベ", "ボ", "パ"], "question": "What is the pronunciation of this katakana character: bu"},
{"correctAnswer": "ベ", "options": ["ベ", "ボ", "パ", "ピ"], "question": "What is the pronunciation of this katakana character: be"},
{"correctAnswer": "ボ", "options": ["ボ", "パ", "ピ", "プ"], "question": "What is the pronunciation of this katakana character: bo"},
{"correctAnswer": "パ", "options": ["パ", "ピ", "プ", "ペ"], "question": "What is the pronunciation of this katakana character: pa"},
{"correctAnswer": "ピ", "options": ["ピ", "プ", "ペ", "ポ"], "question": "What is the pronunciation of this katakana character: pi"},
{"correctAnswer": "プ", "options": ["プ", "ペ", "ポ", "ヘ"], "question": "What is the pronunciation of this katakana character: pu"},
{"correctAnswer": "ペ", "options": ["ペ", "ポ", "ヘ", "ホ"], "question": "What is the pronunciation of this katakana character: pe"},
{"correctAnswer": "ポ", "options": ["ポ", "ヘ", "ホ", "マ"], "question": "What is the pronunciation of this katakana character: po"}
    ],

"kata12":
[
  {"correctAnswer": "a-i", "options": ["a-i", "e-i", "o-u", "u-e"], "question": "What is the extended sound for アイ?"},
  {"correctAnswer": "kan", "options": ["zen", "kan", "gen", "gan"], "question": "How is ガン pronounced in English?"},
  {"correctAnswer": "ha-mu", "options": ["ha-mo", "he-mu", "ho-mu", "ha-mu"], "question": "What is the Katakana representation for ハム?"},
  {"correctAnswer": "air", "options": ["air", "oil", "sun", "moon"], "question": "How is エア pronounced in English?"},
  {"correctAnswer": "kin-pen-betsu", "options": ["kin-fun-betsu", "kin-pen-betsu", "gin-pen-getsu", "kan-pen-betsu"], "question": "Break down the Katakana characters for キンペンベツ."},
  {"correctAnswer": "sakura no hana ga", "options": ["hana no sakura ga", "ga hana no sakura", "sakura no hana ga", "ga sakura no hana"], "question": "Arrange the Katakana characters for サクラノハナガ."},
  {"correctAnswer": "neko ga inu o oikakemasu", "options": ["neko o inu ga oikakemasu", "ga inu oikakemasu neko", "neko ga inu o oikakemasu", "oikakemasu inu neko ga"], "question": "Construct the sentence ネコガイヌオオイカケマス in English."},
  {"correctAnswer": "tetsu", "options": ["ta-tsu", "te-tsu", "to-tsu", "tetsu"], "question": "What is the result when you combine テ and ツ?"},
  {"correctAnswer": "hamu", "options": ["hi-mu", "he-mu", "ha-mu", "ho-mu"], "question": "What is the result when you combine ハ and ム?"},
  {"correctAnswer": "oikakemasu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is オイカケマス pronounced in English?"},
  {"correctAnswer": "yo-ru", "options": ["ya-ru", "yu-ru", "yo-ru", "yi-ru"], "question": "How is ヨル pronounced in English?"},
  {"correctAnswer": "to-tsu", "options": ["ta-tsu", "te-tsu", "to-tsu", "ti-tsu"], "question": "What is the result when you combine ト and ツ?"},
  {"correctAnswer": "oi", "options": ["ai", "oi", "ui", "ei"], "question": "How is オイ pronounced in English?"},
  {"correctAnswer": "sakura", "options": ["hana", "momo", "sakura", "kaze"], "question": "What is the seasonal word for cherry blossoms?"},
  {"correctAnswer": "tsu", "options": ["ta", "chi", "tsu", "te"], "question": "What is the Katakana character for ツ?"},
  {"correctAnswer": "tō-kyō", "options": ["tō-kyō", "o-sa-ka", "kyō-to", "fu-ku-o-ka"], "question": "How is トウキョウ pronounced in English?"},
  {"correctAnswer": "kumquat", "options": ["lemon", "kumquat", "apple", "banana"], "question": "How is サクラ pronounced in English?"},
  {"correctAnswer": "yo-ru", "options": ["ya-ru", "yu-ru", "yo-ru", "yi-ru"], "question": "How is ヨル pronounced in English?"},
  {"correctAnswer": "nu", "options": ["na", "ni", "nu", "ne"], "question": "What is the Katakana character for ヌ?"},
  {"correctAnswer": "oikakemasu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is オイカケマス pronounced in English?"},
  {"correctAnswer": "oikakemashu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is オイカケマス pronounced in English?"},
  {"correctAnswer": "e-i", "options": ["a-i", "e-i", "o-u", "u-e"], "question": "What is the extended sound for エイ?"},
  {"correctAnswer": "shu", "options": ["sa", "shi", "su", "shu"], "question": "What is the Katakana character for シュ?"},
  {"correctAnswer": "hi-mo", "options": ["hi-mu", "he-mo", "ho-mu", "ha-mo"], "question": "What is the result when you combine ヒ and モ?"},
  {"correctAnswer": "sakura no hana ga", "options": ["hana no sakura ga", "ga hana no sakura", "sakura no hana ga", "ga sakura no hana"], "question": "Arrange the Katakana characters for サクラノハナガ."},
  {"correctAnswer": "ni", "options": ["na", "ni", "nu", "ne"], "question": "What is the Katakana character for ニ?"},
  {"correctAnswer": "chi-hi", "options": ["ta-hi", "chi-hi", "tsu-hi", "te-hi"], "question": "What is the result when you combine チ and ヒ?"},
  {"correctAnswer": "oikakemashu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is オイカケマス pronounced in English?"},
  {"correctAnswer": "ki-mo-no", "options": ["ka-mo-no", "ki-mo-no", "ku-mo-no", "ke-mo-no"], "question": "What is the result when you combine キ and モ?"},
  {"correctAnswer": "tō-kyō", "options": ["tō-kyō", "o-sa-ka", "kyō-to", "fu-ku-o-ka"], "question": "How is トウキョウ pronounced in English?"},
  {"correctAnswer": "ka-ze", "options": ["ka-ze", "ki-ze", "ku-ze", "ke-ze"], "question": "What is the result when you combine カ and ゼ?"},
  {"correctAnswer": "e-i", "options": ["a-i", "e-i", "o-u", "u-e"], "question": "What is the extended sound for エイ?"},
  {"correctAnswer": "ho-ru", "options": ["ha-ru", "hi-ru", "hu-ru", "ho-ru"], "question": "What is the result when you combine ホ and ル?"},
  {"correctAnswer": "oikakemasu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is オイカケマス pronounced in English?"},
  {"correctAnswer": "u-e", "options": ["a-i", "e-i", "o-u", "u-e"], "question": "What is the extended sound for ウエ?"},
  {"correctAnswer": "hi-ro-i", "options": ["ha-ro-i", "hi-ro-i", "hu-ro-i", "ho-ro-i"], "question": "What is the result when you combine ヒ and ロ?"},
  {"correctAnswer": "oikakemashu", "options": ["oikakemasu", "oikukemasu", "oikokemasu", "oikakemashu"], "question": "How is オイカケマス pronounced in English?"},
  {"correctAnswer": "ra-men", "options": ["ra-men", "ri-men", "ru-men", "ro-men"], "question": "What is the Katakana representation for ラーメン?"},
  {"correctAnswer": "ko-hi", "options": ["ka-hi", "ki-hi", "ku-hi", "ko-hi"], "question": "What is the result when you combine コ and ヒ?"},
  {"correctAnswer": "za-shi", "options": ["za-shi", "zi-shi", "zu-shi", "zo-shi"], "question": "What is the Katakana character for ザシ?"},
  {"correctAnswer": "hi-ka-ri", "options": ["ha-ka-ri", "hi-ka-ri", "hu-ka-ri", "ho-ka-ri"], "question": "What is the result when you combine ヒ and カリ?"},
  {"correctAnswer": "o-cha", "options": ["a-cha", "i-cha", "u-cha", "o-cha"], "question": "What is the Katakana representation for お茶?"},
  {"correctAnswer": "ka-re", "options": ["ka-re", "ki-re", "ku-re", "ko-re"], "question": "What is the Katakana representation for カレー?"},
  {"correctAnswer": "pi-n-su", "options": ["pi-n-su", "pe-n-su", "pu-n-su", "po-n-su"], "question": "What is the Katakana representation for ピンス?"},
  {"correctAnswer": "a-me-ri-ka", "options": ["a-me-ri-ka", "i-me-ri-ka", "u-me-ri-ka", "o-me-ri-ka"], "question": "What is the result when you combine アメリカ?"},
  {"correctAnswer": "o-o-do-re-su", "options": ["a-o-do-re-su", "i-o-do-re-su", "u-o-do-re-su", "o-o-do-re-su"], "question": "What is the Katakana representation for オードレス?"},
  {"correctAnswer": "ro-bi-n-su", "options": ["ra-bi-n-su", "ri-bi-n-su", "ru-bi-n-su", "ro-bi-n-su"], "question": "What is the result when you combine ロビンス?"},
  {"correctAnswer": "shi-ya-tsu", "options": ["sha-tsu", "shi-tsu", "shu-tsu", "sho-tsu"], "question": "What is the Katakana representation for シャツ?"},
  {"correctAnswer": "tsu-n-a-mi", "options": ["ta-n-a-mi", "chi-n-a-mi", "tsu-n-a-mi", "te-n-a-mi"], "question": "What is the result when you combine ツナミ?"},
  {"correctAnswer": "hi-tsu-ji", "options": ["ha-tsu-ji", "hi-tsu-ji", "hu-tsu-ji", "ho-tsu-ji"], "question": "What is the Katakana representation for ヒツジ?"},
  {"correctAnswer": "so-ni-", "options": ["sa-ni-", "shi-ni-", "su-ni-", "so-ni-"], "question": "What is the result when you combine ソニー?"},
  {"correctAnswer": "ka-me-ra", "options": ["ka-me-ra", "ki-me-ra", "ku-me-ra", "ko-me-ra"], "question": "What is the Katakana representation for カメラ?"},
  {"correctAnswer": "chi-ki-n", "options": ["cha-ki-n", "chi-ki-n", "chu-ki-n", "cho-ki-n"], "question": "What is the result when you combine チキン?"},
  {"correctAnswer": "ko-n-pyu-ta-", "options": ["ka-n-pyu-ta-", "ki-n-pyu-ta-", "ku-n-pyu-ta-", "ko-n-pyu-ta-"], "question": "What is the Katakana representation for コンピューター?"},
  {"correctAnswer": "su-pa-i-da-", "options": ["sa-pa-i-da-", "shi-pa-i-da-", "su-pa-i-da-", "so-pa-i-da-"], "question": "What is the result when you combine スパイダー?"},
  {"correctAnswer": "bi-ru", "options": ["ba-ru", "bi-ru", "bu-ru", "bo-ru"], "question": "What is the Katakana representation for ビール?"},
  {"correctAnswer": "sho-ko-ra-to", "options": ["sha-ko-ra-to", "shi-ko-ra-to", "shu-ko-ra-to", "sho-ko-ra-to"], "question": "What is the result when you combine ショコラト?"},
  {"correctAnswer": "ki-n-gu", "options": ["ka-n-gu", "ki-n-gu", "ku-n-gu", "ko-n-gu"], "question": "What is the Katakana representation for キング?"},
  {"correctAnswer": "mu-ju", "options": ["ma-ju", "mi-ju", "mu-ju", "me-ju"], "question": "What is the result when you combine ムジュ?"},
  {"correctAnswer": "ku-ri-e-i-ta-", "options": ["ka-ri-e-i-ta-", "ki-ri-e-i-ta-", "ku-ri-e-i-ta-", "ko-ri-e-i-ta-"], "question": "What is the Katakana representation for クリエイター?"},
  {"correctAnswer": "to-ma-to", "options": ["ta-ma-to", "chi-ma-to", "tsu-ma-to", "to-ma-to"], "question": "What is the result when you combine トマト?"},
  {"correctAnswer": "bu-ru-su", "options": ["ba-ru-su", "bi-ru-su", "bu-ru-su", "bo-ru-su"], "question": "What is the Katakana representation for ブルース?"},
  {"correctAnswer": "sa-n-do-i-chi", "options": ["sha-n-do-i-chi", "shi-n-do-i-chi", "su-n-do-i-chi", "so-n-do-i-chi"], "question": "What is the result when you combine サンドイッチ?"},
  {"correctAnswer": "ri-sa-chi", "options": ["ra-sa-chi", "ri-sa-chi", "ru-sa-chi", "ro-sa-chi"], "question": "What is the Katakana representation for リサチ?"},
  {"correctAnswer": "hambāgu", "options": ["hambāgu", "himubāgu", "humubāgu", "homubāgu"], "question": "What is the result when you combine ハンバーグ?"},
  {"correctAnswer": "ji-yo-i", "options": ["ja-yo-i", "ji-yo-i", "ju-yo-i", "jo-yo-i"], "question": "What is the Katakana representation for ジヨイ?"},
  {"correctAnswer": "a-i-su", "options": ["a-i-su", "i-i-su", "u-i-su", "e-i-su"], "question": "What is the result when you combine アイス?"},
  {"correctAnswer": "fōku", "options": ["fāku", "fīku", "fūku", "fēku"], "question": "What is the Katakana representation for フォーク?"},
  {"correctAnswer": "chi-a-i", "options": ["cha-a-i", "chi-a-i", "chu-a-i", "cho-a-i"], "question": "What is the result when you combine チアイ?"},
  {"correctAnswer": "tēburu", "options": ["tāburu", "tīburu", "tūburu", "tēburu"], "question": "What is the Katakana representation for テーブル?"},
  {"correctAnswer": "āto", "options": ["āto", "īto", "ūto", "ēto"], "question": "What is the result when you combine アート?"},
  {"correctAnswer": "sē-tā", "options": ["sētā", "sītā", "sūtā", "sētā"], "question": "What is the Katakana representation for セーター?"},
  {"correctAnswer": "pūru", "options": ["pāru", "pīru", "pūru", "pēru"], "question": "What is the result when you combine プール?"},
  {"correctAnswer": "ōbāru", "options": ["ōbāru", "ībāru", "ūbāru", "ēbāru"], "question": "What is the Katakana representation for オーバル?"}
],
"kata22":[
{"correctAnswer": "ジュース", "options": ["レモン", "アクセサリー", "ジュース", "ティッシュペーパー"], "question": "How is 'juice' (ju-su) pronounced in katakana?"},
{"correctAnswer": "コンピューター", "options": ["オフィス", "カジュアル", "デパート", "コンピューター"], "question": "How is 'computer' (konpyu-ta-) pronounced in katakana?"},
{"correctAnswer": "テレビ", "options": ["ラジオ", "サイクリング", "テレビ", "ラーメン"], "question": "How is 'television' (terebi) pronounced in katakana?"},
{"correctAnswer": "カメラ", "options": ["フォーク", "エアコン", "カメラ", "オリーブオイル"], "question": "How is 'camera' (kamera) pronounced in katakana?"},
{"correctAnswer": "オレンジ", "options": ["ジャケット", "トラック", "オレンジ", "サッカー"], "question": "How is 'orange' (orenji) pronounced in katakana?"},
{"correctAnswer": "ホテル", "options": ["ウェディングドレス", "ショッピング", "ホテル", "サンドイッチ"], "question": "How is 'hotel' (hoteru) pronounced in katakana?"},
{"correctAnswer": "タクシー", "options": ["フライドポテト", "コーヒー", "サイクリング", "タクシー"], "question": "How is 'taxi' (takushi-) pronounced in katakana?"},
{"correctAnswer": "コーヒー", "options": ["レストルーム", "ビール", "コーヒー", "ワイン"], "question": "How is 'coffee' (ko-hi-) pronounced in katakana?"},
{"correctAnswer": "アイスクリーム", "options": ["トラック", "アイスクリーム", "スーパー", "コンビニ"], "question": "How is 'ice cream' (aisukuri-mu) pronounced in katakana?"},
{"correctAnswer": "ハンバーガー", "options": ["ボールペン", "ハンバーガー", "ジュエリー", "デジタル"], "question": "How is 'hamburger' (hanba-ga-) pronounced in katakana?"},
{"correctAnswer": "ジャケット", "options": ["パスタ", "フォーク", "ジャケット", "ブリーフケース"], "question": "How is 'jacket' (jaketto) pronounced in katakana?"},
{"correctAnswer": "ハンドバッグ", "options": ["ジュース", "ハンドバッグ", "コンピューター", "サンドイッチ"], "question": "How is 'handbag' (handobaggu) pronounced in katakana?"},
{"correctAnswer": "スーパー", "options": ["エスカレーター", "ティッシュペーパー", "フライドポテト", "スーパー"], "question": "How is 'supermarket' (su-pa-) pronounced in katakana?"},
{"correctAnswer": "バナナ", "options": ["ボールペン", "シャンプー", "バナナ", "ワイン"], "question": "How is 'banana' (banana) pronounced in katakana?"},
{"correctAnswer": "サッカー", "options": ["ショッピング", "サッカー", "ラジオ", "アイスクリーム"], "question": "How is 'soccer' (sakka-) pronounced in katakana?"},
{"correctAnswer": "ラーメン", "options": ["ユニバーシティ", "シャンプー", "ラーメン", "ビデオゲーム"], "question": "How is 'ramen' (ra-men) pronounced in katakana?"},
{"correctAnswer": "ハンカチ", "options": ["コンビニ", "オフィス", "ハンカチ", "ボールペン"], "question": "How is 'handkerchief' (hankachi) pronounced in katakana?"},
{"correctAnswer": "バイオリン", "options": ["エアコン", "アクセサリー", "ハンバーガー", "バイオリン"], "question": "How is 'violin' (baiorin) pronounced in katakana?"},
{"correctAnswer": "コンビニ", "options": ["レモン", "コンビニ", "アクセサリー", "ワイン"], "question": "How is 'convenience store' (konbini) pronounced in katakana?"},
{"correctAnswer": "ワイン", "options": ["シャンプー", "ラジオ", "ワイン", "ジャケット"], "question": "How is 'wine' pronounced in katakana?"},
{"correctAnswer": "ビール", "options": ["アイスクリーム", "エスカレーター", "ビール", "デパート"], "question": "How is 'beer' pronounced in katakana?"},
{"correctAnswer": "チョコレート", "options": ["チョコレート", "レストラン", "テレビジョン", "フォーク"], "question": "How is 'chocolate' pronounced in katakana?"},
{"correctAnswer": "エスカレーター", "options": ["ジュース", "エスカレーター", "オフィス", "コンビニ"], "question": "How is 'escalator' pronounced in katakana?"},
{"correctAnswer": "サンドイッチ", "options": ["サンドイッチ", "バイオリン", "スポーツ", "カジュアル"], "question": "How is 'sandwich' pronounced in katakana?"},
{"correctAnswer": "ケーキ", "options": ["ケーキ", "オリーブオイル", "ショッピング", "ボールペン"], "question": "How is 'cake' pronounced in katakana?"},
{"correctAnswer": "ピザ", "options": ["ピザ", "ハンドバッグ", "ラーメン", "デジタル"], "question": "How is 'pizza' pronounced in katakana?"},
{"correctAnswer": "パスタ", "options": ["アイスクリーム", "パスタ", "ジャケット", "ウェディングドレス"], "question": "How is 'pasta' pronounced in katakana?"},
{"correctAnswer": "フライドポテト", "options": ["フライドポテト", "サッカー", "ジュエリー", "ホテル"], "question": "How is 'fried potato' pronounced in katakana?"},
{"correctAnswer": "ジュエリー", "options": ["ティッシュペーパー", "ジュエリー", "フォーク", "ラジオ"], "question": "How is 'jewelry' pronounced in katakana?"},
{"correctAnswer": "タクワン", "options": ["タクワン", "テレビ", "ユニバーシティ", "アイスクリーム"], "question": "How is 'pickled daikon radish' pronounced in katakana?"},
{"correctAnswer": "ヘルメット", "options": ["ヘルメット", "オレンジ", "スーパー", "コンビニ"], "question": "How is 'helmet' pronounced in katakana?"},
{"correctAnswer": "レモン", "options": ["バイオリン", "サンドイッチ", "アイスクリーム", "レモン"], "question": "How is 'lemon' pronounced in katakana?"},
{"correctAnswer": "オリーブオイル", "options": ["コーヒー", "オリーブオイル", "ジャケット", "ティッシュペーパー"], "question": "How is 'olive oil' pronounced in katakana?"},
{"correctAnswer": "エアコン", "options": ["エアコン", "ショッピング", "ボールペン", "サンドイッチ"], "question": "How is 'air conditioner' pronounced in katakana?"},
{"correctAnswer": "パーティー", "options": ["ハチミツ", "ティッシュペーパー", "パーティー", "アクセサリー"], "question": "How is 'party' pronounced in katakana?"},
{"correctAnswer": "ショッピング", "options": ["フライドポテト", "ショッピング", "ラジオ", "アクセサリー"], "question": "How is 'shopping' pronounced in katakana?"},
{"correctAnswer": "ヘルメット", "options": ["エスカレーター", "ジャケット", "ヘルメット", "ハンドバッグ"], "question": "How is 'helmet' pronounced in katakana?"},
{"correctAnswer": "ボールペン", "options": ["ピザ", "コンビニ", "ボールペン", "ワイン"], "question": "How is 'ballpoint pen' pronounced in katakana?"},
{"correctAnswer": "デパート", "options": ["デパート", "スーパー", "トラック", "アイスクリーム"], "question": "How is 'department store' pronounced in katakana?"},
{"correctAnswer": "レストルーム", "options": ["ユニバーシティ", "オフィス", "レストルーム", "ティッシュペーパー"], "question": "How is 'restroom' pronounced in katakana?"},
{"correctAnswer": "イヤホン", "options": ["レストラン", "ホテル", "イヤホン", "シャンプー"], "question": "How is 'earphones' pronounced in katakana?"},
{"correctAnswer": "ビデオゲーム", "options": ["オフィス", "アイスクリーム", "ビデオゲーム", "ジャケット"], "question": "How is 'video game' pronounced in katakana?"},
{"correctAnswer": "ウェディングドレス", "options": ["ハンカチ", "ウェディングドレス", "チョコレート", "エアコン"], "question": "How is 'wedding dress' pronounced in katakana?"},
{"correctAnswer": "ラジオ", "options": ["ハンバーガー", "ラーメン", "ラジオ", "サンドイッチ"], "question": "How is 'radio' pronounced in katakana?"},
{"correctAnswer": "ティッシュペーパー", "options": ["ティッシュペーパー", "パスタ", "オリーブオイル", "ショッピング"], "question": "How is 'tissue paper' pronounced in katakana?"},
{"correctAnswer": "ユニバーシティ", "options": ["ホテル", "アクセサリー", "コンピューター", "ユニバーシティ"], "question": "How is 'university' pronounced in katakana?"},
{"correctAnswer": "オフィス", "options": ["ジュエリー", "オフィス", "ジャケット", "テレビ"], "question": "How is 'office' pronounced in katakana?"},
{"correctAnswer": "カジュアル", "options": ["サンドイッチ", "カジュアル", "ボールペン", "チョコレート"], "question": "How is 'casual' pronounced in katakana?"},
{"correctAnswer": "コンビニ", "options": ["サイクリング", "パスタ", "コンビニ", "ティッシュペーパー"], "question": "How is 'convenience store' pronounced in katakana?"},
{"correctAnswer": "ジュース", "options": ["ハンカチ", "ジュース", "サッカー", "ボールペン"], "question": "How is 'juice' pronounced in katakana?"},
{"correctAnswer": "テレビジョン", "options": ["サッカー", "コンビニ", "テレビジョン", "エアコン"], "question": "How is 'television' pronounced in katakana?"},
{"correctAnswer": "サッカー", "options": ["アクセサリー", "サッカー", "ワイン", "ボールペン"], "question": "How is 'soccer' pronounced in katakana?"},
{"correctAnswer": "ボールペン", "options": ["ショッピング", "ハンドバッグ", "ボールペン", "ラーメン"], "question": "How is 'ballpoint pen' pronounced in katakana?"},
{"correctAnswer": "フライドポテト", "options": ["ヘルメット", "フライドポテト", "レストラン", "ウェディングドレス"], "question": "How is 'fried potato' pronounced in katakana?"},
{"correctAnswer": "ショッピング", "options": ["コーヒー", "ショッピング", "ボールペン", "アイスクリーム"], "question": "How is 'shopping' pronounced in katakana?"},
{"correctAnswer": "ラジオ", "options": ["ジャケット", "ティッシュペーパー", "ラジオ", "オフィス"], "question": "How is 'radio' pronounced in katakana?"},
{"correctAnswer": "サンドイッチ", "options": ["ジュース", "サンドイッチ", "ウェディングドレス", "コンビニ"], "question": "How is 'sandwich' pronounced in katakana?"},
{"correctAnswer": "ヘルメット", "options": ["パーティー", "アクセサリー", "ヘルメット", "アイスクリーム"], "question": "How is 'helmet' pronounced in katakana?"},
{"correctAnswer": "バイオリン", "options": ["バイオリン", "ハンドバッグ", "ラジオ", "サンドイッチ"], "question": "How is 'violin' pronounced in katakana?"},
{"correctAnswer": "デパート", "options": ["チョコレート", "デパート", "ワイン", "アクセサリー"], "question": "How is 'department store' pronounced in katakana?"},
{"correctAnswer": "ワイン", "options": ["フライドポテト", "サッカー", "ワイン", "エアコン"], "question": "How is 'wine' pronounced in katakana?"}
    ],

"khan03": [
{"correctAnswer": "一", "options": ["一", "二", "三", "四"], "question": "What is the kanji for the number 1?"},
{"correctAnswer": "二", "options": ["二", "三", "四", "五"], "question": "What is the kanji for the number 2?"},
{"correctAnswer": "三", "options": ["三", "四", "五", "六"], "question": "What is the kanji for the number 3?"},
{"correctAnswer": "四", "options": ["四", "五", "六", "七"], "question": "What is the kanji for the number 4?"},
{"correctAnswer": "五", "options": ["五", "六", "七", "八"], "question": "What is the kanji for the number 5?"},
{"correctAnswer": "六", "options": ["六", "七", "八", "九"], "question": "What is the kanji for the number 6?"},
{"correctAnswer": "七", "options": ["七", "八", "九", "十"], "question": "What is the kanji for the number 7?"},
{"correctAnswer": "八", "options": ["八", "九", "十", "百"], "question": "What is the kanji for the number 8?"},
{"correctAnswer": "九", "options": ["九", "十", "百", "千"], "question": "What is the kanji for the number 9?"},
{"correctAnswer": "十", "options": ["十", "百", "千", "万"], "question": "What is the kanji for the number 10?"},
{"correctAnswer": "百", "options": ["百", "千", "万", "円"], "question": "What is the kanji for the number 100?"},
{"correctAnswer": "千", "options": ["千", "万", "円", "時"], "question": "What is the kanji for the number 1000?"},
{"correctAnswer": "万", "options": ["万", "円", "時", "日"], "question": "What is the kanji for the number 10,000?"},
{"correctAnswer": "円", "options": ["円", "時", "日", "月"], "question": "What is the kanji for the Japanese currency Yen?"},
{"correctAnswer": "時", "options": ["時", "日", "月", "火"], "question": "What is the kanji for time or hour?"},
{"correctAnswer": "日", "options": ["日", "月", "火", "水"], "question": "What is the kanji for the sun or day?"},
{"correctAnswer": "月", "options": ["月", "火", "水", "木"], "question": "What is the kanji for the moon or month?"},
{"correctAnswer": "火", "options": ["火", "水", "木", "金"], "question": "What is the kanji for fire?"},
{"correctAnswer": "水", "options": ["水", "木", "金", "土"], "question": "What is the kanji for water?"},
{"correctAnswer": "木", "options": ["木", "金", "土", "天"], "question": "What is the kanji for tree or wood?"},
{"correctAnswer": "金", "options": ["金", "土", "天", "地"], "question": "What is the kanji for gold or money?"},
{"correctAnswer": "土", "options": ["土", "天", "地", "人"], "question": "What is the kanji for earth or soil?"},
{"correctAnswer": "天", "options": ["天", "地", "人", "父"], "question": "What is the kanji for heaven or sky?"},
{"correctAnswer": "地", "options": ["地", "人", "父", "母"], "question": "What is the kanji for ground or land?"},
{"correctAnswer": "人", "options": ["人", "父", "母", "子"], "question": "What is the kanji for person or human?"},
{"correctAnswer": "父", "options": ["父", "母", "子", "女"], "question": "What is the kanji for father?"},
{"correctAnswer": "母", "options": ["母", "子", "女", "兄"], "question": "What is the kanji for mother?"},
{"correctAnswer": "子", "options": ["子", "女", "兄", "姉"], "question": "What is the kanji for child or son/daughter?"},
{"correctAnswer": "女", "options": ["女", "兄", "姉", "弟"], "question": "What is the kanji for woman or female?"},
{"correctAnswer": "兄", "options": ["兄", "姉", "弟", "妹"], "question": "What is the kanji for older brother?"},
{"correctAnswer": "姉", "options": ["姉", "弟", "妹", "叔"], "question": "What is the kanji for older sister?"},
{"correctAnswer": "弟", "options": ["弟", "妹", "叔", "叔母"], "question": "What is the kanji for younger brother?"},
{"correctAnswer": "妹", "options": ["妹", "叔", "叔母", "叔父"], "question": "What is the kanji for younger sister?"},
{"correctAnswer": "叔", "options": ["叔", "叔母", "叔父", "伯"], "question": "What is the kanji for uncle (younger brother of one's parent)?"},
{"correctAnswer": "叔母", "options": ["叔母", "叔父", "伯", "伯母"], "question": "What is the kanji for aunt (wife of one's uncle)?"},
{"correctAnswer": "叔父", "options": ["叔父", "伯", "伯母", "従"], "question": "What is the kanji for uncle (older brother of one's parent)?"},
{"correctAnswer": "伯", "options": ["伯", "伯母", "従", "従姉"], "question": "What is the kanji for eldest brother (respectful term)?"},
{"correctAnswer": "伯母", "options": ["伯母", "従", "従姉", "従兄"], "question": "What is the kanji for eldest sister (respectful term)?"},
{"correctAnswer": "従", "options": ["従", "従姉", "従兄", "従妹"], "question": "What is the kanji for following or subordinate?"},
{"correctAnswer": "従姉", "options": ["従姉", "従兄", "従妹", "従弟"], "question": "What is the kanji for elder cousin sister?"},
{"correctAnswer": "従兄", "options": ["従兄", "従妹", "従弟", "従妹"], "question": "What is the kanji for elder cousin brother?"},
{"correctAnswer": "従妹", "options": ["従妹", "従弟", "従妹", "従弟"], "question": "What is the kanji for younger cousin sister?"},
{"correctAnswer": "従弟", "options": ["従弟", "従妹", "従弟", "友"], "question": "What is the kanji for younger cousin brother?"},
{"correctAnswer": "友", "options": ["友", "友達", "仕", "仕事"], "question": "What is the kanji for friend?"},
{"correctAnswer": "友達", "options": ["友達", "仕", "仕事", "仲良し"], "question": "What is the kanji for close friend?"},
{"correctAnswer": "仕", "options": ["仕", "仕事", "仲良し", "会社"], "question": "What is the kanji for work (v.)?"},
{"correctAnswer": "仕事", "options": ["仕事", "仲良し", "会社", "勉強"], "question": "What is the kanji for job or work (n.)?"},
{"correctAnswer": "仲良し", "options": ["仲良し", "会社", "勉強", "学校"], "question": "What is the kanji for close relationship or good friend?"},
{"correctAnswer": "会社", "options": ["会社", "勉強", "学校", "先生"], "question": "What is the kanji for company or corporation?"},
{"correctAnswer": "勉強", "options": ["勉強", "学校", "先生", "生徒"], "question": "What is the kanji for study (v.)?"},
{"correctAnswer": "学校", "options": ["学校", "先生", "生徒", "教育"], "question": "What is the kanji for school?"},
{"correctAnswer": "先生", "options": ["先生", "生徒", "教育", "試験"], "question": "What is the kanji for teacher?"},
{"correctAnswer": "生徒", "options": ["生徒", "教育", "試験", "教室"], "question": "What is the kanji for student?"},
{"correctAnswer": "教育", "options": ["教育", "試験", "教室", "本"], "question": "What is the kanji for education?"},
{"correctAnswer": "試験", "options": ["試験", "教室", "本", "読"], "question": "What is the kanji for examination or test?"},
{"correctAnswer": "教室", "options": ["教室", "本", "読", "書"], "question": "What is the kanji for classroom?"},
{"correctAnswer": "本", "options": ["本", "読", "書", "新聞"], "question": "What is the kanji for book?"},
{"correctAnswer": "読", "options": ["読", "書", "新聞", "言葉"], "question": "What is the kanji for read (v.)?"},
{"correctAnswer": "書", "options": ["書", "新聞", "言葉", "手紙"], "question": "What is the kanji for write (v.)?"},
{"correctAnswer": "新聞", "options": ["新聞", "言葉", "手紙", "雑誌"], "question": "What is the kanji for newspaper?"},
{"correctAnswer": "言葉", "options": ["言葉", "手紙", "雑誌", "音楽"], "question": "What is the kanji for language or word?"},
{"correctAnswer": "手紙", "options": ["手紙", "雑誌", "音楽", "写真"], "question": "What is the kanji for letter or mail?"},
{"correctAnswer": "雑誌", "options": ["雑誌", "音楽", "写真", "映画"], "question": "What is the kanji for magazine?"},
{"correctAnswer": "音楽", "options": ["音楽", "写真", "映画", "絵"], "question": "What is the kanji for music?"},
{"correctAnswer": "写真", "options": ["写真", "映画", "絵", "花"], "question": "What is the kanji for photograph?"},
{"correctAnswer": "映画", "options": ["映画", "絵", "花", "料理"], "question": "What is the kanji for movie?"},
{"correctAnswer": "絵", "options": ["絵", "花", "料理", "旅行"], "question": "What is the kanji for picture or drawing?"},
{"correctAnswer": "花", "options": ["花", "料理", "旅行", "車"], "question": "What is the kanji for flower?"},
{"correctAnswer": "料理", "options": ["料理", "旅行", "車", "飛行機"], "question": "What is the kanji for cooking or cuisine?"},
{"correctAnswer": "旅行", "options": ["旅行", "車", "飛行機", "海"], "question": "What is the kanji for travel?"},
{"correctAnswer": "車", "options": ["車", "飛行機", "海", "山"], "question": "What is the kanji for car?"},
{"correctAnswer": "飛行機", "options": ["飛行機", "海", "山", "川"], "question": "What is the kanji for airplane?"},
{"correctAnswer": "海", "options": ["海", "山", "川", "湖"], "question": "What is the kanji for sea or ocean?"},
{"correctAnswer": "山", "options": ["山", "川", "湖", "森"], "question": "What is the kanji for mountain?"},
{"correctAnswer": "川", "options": ["川", "湖", "森", "町"], "question": "What is the kanji for river?"},
{"correctAnswer": "湖", "options": ["湖", "森", "町", "国"], "question": "What is the kanji for lake?"},
{"correctAnswer": "森", "options": ["森", "町", "国", "世界"], "question": "What is the kanji for forest?"},
{"correctAnswer": "町", "options": ["町", "国", "世界", "家"], "question": "What is the kanji for town?"},
{"correctAnswer": "国", "options": ["国", "世界", "家", "都市"], "question": "What is the kanji for country or nation?"},
{"correctAnswer": "世界", "options": ["世界", "家", "都市", "村"], "question": "What is the kanji for world?"},
{"correctAnswer": "家", "options": ["家", "都市", "村", "工場"], "question": "What is the kanji for house or home?"},
{"correctAnswer": "都市", "options": ["都市", "村", "工場", "農村"], "question": "What is the kanji for city?"},
{"correctAnswer": "村", "options": ["村", "工場", "農村", "港"], "question": "What is the kanji for village?"},
{"correctAnswer": "工場", "options": ["工場", "農村", "港", "商店"], "question": "What is the kanji for factory?"},
{"correctAnswer": "農村", "options": ["農村", "港", "商店", "空港"], "question": "What is the kanji for rural area?"},
{"correctAnswer": "港", "options": ["港", "商店", "空港", "駅"], "question": "What is the kanji for harbor or port?"},
{"correctAnswer": "商店", "options": ["商店", "空港", "駅", "美術館"], "question": "What is the kanji for store or shop?"},
{"correctAnswer": "空港", "options": ["空港", "駅", "美術館", "公園"], "question": "What is the kanji for airport?"},
{"correctAnswer": "駅", "options": ["駅", "美術館", "公園", "動物園"], "question": "What is the kanji for station?"},
{"correctAnswer": "美術館", "options": ["美術館", "公園", "動物園", "博物館"], "question": "What is the kanji for art museum?"},
{"correctAnswer": "公園", "options": ["公園", "動物園", "博物館", "劇場"], "question": "What is the kanji for park?"},
{"correctAnswer": "動物園", "options": ["動物園", "博物館", "劇場", "図書館"], "question": "What is the kanji for zoo?"},
{"correctAnswer": "博物館", "options": ["博物館", "劇場", "図書館", "寺"], "question": "What is the kanji for museum?"},
{"correctAnswer": "劇場", "options": ["劇場", "図書館", "寺", "神社"], "question": "What is the kanji for theater?"},
{"correctAnswer": "図書館", "options": ["図書館", "寺", "神社", "城"], "question": "What is the kanji for library?"},
{"correctAnswer": "寺", "options": ["寺", "神社", "城", "宮"], "question": "What is the kanji for temple?"},
{"correctAnswer": "神社", "options": ["神社", "城", "宮", "神道"], "question": "What is the kanji for Shinto shrine?"},
{"correctAnswer": "城", "options": ["城", "宮", "神道", "山脈"], "question": "What is the kanji for castle?"},
{"correctAnswer": "宮", "options": ["宮", "神道", "山脈", "湖畔"], "question": "What is the kanji for palace or shrine?"},
{"correctAnswer": "神道", "options": ["神道", "山脈", "湖畔", "滝"], "question": "What is the kanji for Shintoism?"},
{"correctAnswer": "山脈", "options": ["山脈", "湖畔", "滝", "島"], "question": "What is the kanji for mountain range?"},
{"correctAnswer": "湖畔", "options": ["湖畔", "滝", "島", "沼"], "question": "What is the kanji for lakeside?"},
{"correctAnswer": "滝", "options": ["滝", "島", "沼", "海岸"], "question": "What is the kanji for waterfall?"},
{"correctAnswer": "島", "options": ["島", "沼", "海岸", "渓谷"], "question": "What is the kanji for island?"},
{"correctAnswer": "沼", "options": ["沼", "海岸", "渓谷", "山道"], "question": "What is the kanji for swamp?"},
{"correctAnswer": "海岸", "options": ["海岸", "渓谷", "山道", "砂漠"], "question": "What is the kanji for coast?"},
{"correctAnswer": "渓谷", "options": ["渓谷", "山道", "砂漠", "草原"], "question": "What is the kanji for canyon?"},
{"correctAnswer": "山道", "options": ["山道", "砂漠", "草原", "森林"], "question": "What is the kanji for mountain path?"},
{"correctAnswer": "砂漠", "options": ["砂漠", "草原", "森林", "峡谷"], "question": "What is the kanji for desert?"},
{"correctAnswer": "草原", "options": ["草原", "森林", "峡谷", "荒地"], "question": "What is the kanji for grassland?"},
{"correctAnswer": "森林", "options": ["森林", "峡谷", "荒地", "滑走路"], "question": "What is the kanji for forest?"},
{"correctAnswer": "峡谷", "options": ["峡谷", "荒地", "滑走路", "山峡"], "question": "What is the kanji for gorge?"},
{"correctAnswer": "荒地", "options": ["荒地", "滑走路", "山峡", "火山"], "question": "What is the kanji for wasteland?"},
{"correctAnswer": "滑走路", "options": ["滑走路", "山峡", "火山", "池"], "question": "What is the kanji for runway?"},
{"correctAnswer": "山峡", "options": ["山峡", "火山", "池", "峠"], "question": "What is the kanji for mountain pass?"},
{"correctAnswer": "火山", "options": ["火山", "池", "峠", "丘"], "question": "What is the kanji for volcano?"},
{"correctAnswer": "池", "options": ["池", "峠", "丘", "谷"], "question": "What is the kanji for pond?"},
{"correctAnswer": "峠", "options": ["峠", "丘", "谷", "峰"], "question": "What is the kanji for mountain peak?"},
{"correctAnswer": "丘", "options": ["丘", "谷", "峰", "坂"], "question": "What is the kanji for hill?"},
{"correctAnswer": "谷", "options": ["谷", "峰", "坂", "巣"], "question": "What is the kanji for valley?"},
{"correctAnswer": "峰", "options": ["峰", "坂", "巣", "岩"], "question": "What is the kanji for peak or summit?"},
{"correctAnswer": "坂", "options": ["坂", "巣", "岩", "橋"], "question": "What is the kanji for slope or hillside?"},
{"correctAnswer": "巣", "options": ["巣", "岩", "橋", "崖"], "question": "What is the kanji for nest?"},
{"correctAnswer": "岩", "options": ["岩", "橋", "崖", "洞窟"], "question": "What is the kanji for rock?"},
{"correctAnswer": "橋", "options": ["橋", "崖", "洞窟", "池"], "question": "What is the kanji for bridge?"},
{"correctAnswer": "崖", "options": ["崖", "洞窟", "池", "森"], "question": "What is the kanji for cliff or precipice?"},
{"correctAnswer": "洞窟", "options": ["洞窟", "池", "森", "海岸"], "question": "What is the kanji for cave?"},
{"correctAnswer": "池", "options": ["池", "森", "海岸", "川"], "question": "What is the kanji for pond?"},
{"correctAnswer": "森", "options": ["森", "海岸", "川", "湖"], "question": "What is the kanji for forest?"},
{"correctAnswer": "湖", "options": ["湖", "川", "山", "滝"], "question": "What is the kanji for lake?"},
{"correctAnswer": "川", "options": ["川", "山", "滝", "海"], "question": "What is the kanji for river?"},
{"correctAnswer": "山", "options": ["山", "滝", "海", "空"], "question": "What is the kanji for mountain?"},
{"correctAnswer": "滝", "options": ["滝", "海", "空", "雲"], "question": "What is the kanji for waterfall?"},
{"correctAnswer": "海", "options": ["海", "空", "雲", "星"], "question": "What is the kanji for sea or ocean?"},
{"correctAnswer": "空", "options": ["空", "雲", "星", "太陽"], "question": "What is the kanji for sky?"},
{"correctAnswer": "雲", "options": ["雲", "星", "太陽", "月"], "question": "What is the kanji for cloud?"},
{"correctAnswer": "星", "options": ["星", "太陽", "月", "宇宙"], "question": "What is the kanji for star?"},
{"correctAnswer": "太陽", "options": ["太陽", "月", "宇宙", "星座"], "question": "What is the kanji for sun?"},
{"correctAnswer": "月", "options": ["月", "宇宙", "星座", "彗星"], "question": "What is the kanji for moon?"},
{"correctAnswer": "宇宙", "options": ["宇宙", "星座", "彗星", "惑星"], "question": "What is the kanji for universe?"},
{"correctAnswer": "星座", "options": ["星座", "彗星", "惑星", "銀河"], "question": "What is the kanji for constellation?"},
{"correctAnswer": "彗星", "options": ["彗星", "惑星", "銀河", "隕石"], "question": "What is the kanji for comet?"},
{"correctAnswer": "惑星", "options": ["惑星", "銀河", "隕石", "流星"], "question": "What is the kanji for planet?"},
{"correctAnswer": "銀河", "options": ["銀河", "隕石", "流星", "夜空"], "question": "What is the kanji for galaxy?"},
{"correctAnswer": "隕石", "options": ["隕石", "流星", "夜空", "宇宙船"], "question": "What is the kanji for meteorite?"},
{"correctAnswer": "流星", "options": ["流星", "夜空", "宇宙船", "地球"], "question": "What is the kanji for shooting star?"},
{"correctAnswer": "夜空", "options": ["夜空", "宇宙船", "地球", "日食"], "question": "What is the kanji for night sky?"},
{"correctAnswer": "宇宙船", "options": ["宇宙船", "地球", "日食", "太陽系"], "question": "What is the kanji for spaceship?"},
{"correctAnswer": "地球", "options": ["地球", "日食", "太陽系", "星空"], "question": "What is the kanji for Earth?"},
{"correctAnswer": "日食", "options": ["日食", "太陽系", "星空", "惑星地球"], "question": "What is the kanji for solar eclipse?"},
{"correctAnswer": "太陽系", "options": ["太陽系", "星空", "惑星地球", "天文学"], "question": "What is the kanji for solar system?"},
{"correctAnswer": "星空", "options": ["星空", "惑星地球", "天文学", "宇宙人"], "question": "What is the kanji for starry sky?"},
{"correctAnswer": "惑星地球", "options": ["惑星地球", "天文学", "宇宙人", "科学"], "question": "What is the kanji for planet Earth?"},
{"correctAnswer": "天文学", "options": ["天文学", "宇宙人", "科学", "地球儀"], "question": "What is the kanji for astronomy?"},
{"correctAnswer": "宇宙人", "options": ["宇宙人", "科学", "地球儀", "ロケット"], "question": "What is the kanji for extraterrestrial being or alien?"},
{"correctAnswer": "科学", "options": ["科学", "地球儀", "ロケット", "実験"], "question": "What is the kanji for science?"},
{"correctAnswer": "地球儀", "options": ["地球儀", "ロケット", "実験", "化学"], "question": "What is the kanji for globe?"},
{"correctAnswer": "ロケット", "options": ["ロケット", "実験", "化学", "生物学"], "question": "What is the kanji for rocket?"},
{"correctAnswer": "実験", "options": ["実験", "化学", "生物学", "物理学"], "question": "What is the kanji for experiment?"},
{"correctAnswer": "化学", "options": ["化学", "生物学", "物理学", "数学"], "question": "What is the kanji for chemistry?"},
{"correctAnswer": "生物学", "options": ["生物学", "物理学", "数学", "地理学"], "question": "What is the kanji for biology?"},
{"correctAnswer": "物理学", "options": ["物理学", "数学", "地理学", "歴史"], "question": "What is the kanji for physics?"},
{"correctAnswer": "数学", "options": ["数学", "地理学", "歴史", "政治学"], "question": "What is the kanji for mathematics?"},
{"correctAnswer": "地理学", "options": ["地理学", "歴史", "政治学", "経済学"], "question": "What is the kanji for geography?"},
{"correctAnswer": "歴史", "options": ["歴史", "政治学", "経済学", "心理学"], "question": "What is the kanji for history?"},
{"correctAnswer": "政治学", "options": ["政治学", "経済学", "心理学", "社会学"], "question": "What is the kanji for political science?"},
{"correctAnswer": "経済学", "options": ["経済学", "心理学", "社会学", "言語学"], "question": "What is the kanji for economics?"},
{"correctAnswer": "心理学", "options": ["心理学", "社会学", "言語学", "教育学"], "question": "What is the kanji for psychology?"},
{"correctAnswer": "社会学", "options": ["社会学", "言語学", "教育学", "人類学"], "question": "What is the kanji for sociology?"},
{"correctAnswer": "言語学", "options": ["言語学", "教育学", "人類学", "哲学"], "question": "What is the kanji for linguistics?"},
{"correctAnswer": "教育学", "options": ["教育学", "人類学", "哲学", "神学"], "question": "What is the kanji for education?"},
{"correctAnswer": "人類学", "options": ["人類学", "哲学", "神学", "美学"], "question": "What is the kanji for anthropology?"},
{"correctAnswer": "哲学", "options": ["哲学", "神学", "美学", "倫理学"], "question": "What is the kanji for philosophy?"},
{"correctAnswer": "神学", "options": ["神学", "美学", "倫理学", "論理学"], "question": "What is the kanji for theology?"},
{"correctAnswer": "美学", "options": ["美学", "倫理学", "論理学", "数論"], "question": "What is the kanji for aesthetics?"},
{"correctAnswer": "倫理学", "options": ["倫理学", "論理学", "数論", "幾何学"], "question": "What is the kanji for ethics?"},
{"correctAnswer": "論理学", "options": ["論理学", "数論", "幾何学", "算数"], "question": "What is the kanji for logic?"},
{"correctAnswer": "数論", "options": ["数論", "幾何学", "算数", "代数学"], "question": "What is the kanji for number theory?"},
{"correctAnswer": "幾何学", "options": ["幾何学", "算数", "代数学", "微積分学"], "question": "What is the kanji for geometry?"},
{"correctAnswer": "算数", "options": ["算数", "代数学", "微積分学", "物理化学"], "question": "What is the kanji for arithmetic?"},
{"correctAnswer": "代数学", "options": ["代数学", "微積分学", "物理化学", "地球化学"], "question": "What is the kanji for algebra?"},
{"correctAnswer": "微積分学", "options": ["微積分学", "物理化学", "地球化学", "生化学"], "question": "What is the kanji for calculus?"},
{"correctAnswer": "物理化学", "options": ["物理化学", "地球化学", "生化学", "有機化学"], "question": "What is the kanji for physical chemistry?"},
{"correctAnswer": "地球化学", "options": ["地球化学", "生化学", "有機化学", "無機化学"], "question": "What is the kanji for geochemistry?"},
{"correctAnswer": "生化学", "options": ["生化学", "有機化学", "無機化学", "分子生物学"], "question": "What is the kanji for biochemistry?"},
{"correctAnswer": "有機化学", "options": ["有機化学", "無機化学", "分子生物学", "遺伝子学"], "question": "What is the kanji for organic chemistry?"},
{"correctAnswer": "無機化学", "options": ["無機化学", "分子生物学", "遺伝子学", "生物物理学"], "question": "What is the kanji for inorganic chemistry?"},
{"correctAnswer": "分子生物学", "options": ["分子生物学", "遺伝子学", "生物物理学", "植物学"], "question": "What is the kanji for molecular biology?"},
{"correctAnswer": "遺伝子学", "options": ["遺伝子学", "生物物理学", "植物学", "動物学"], "question": "What is the kanji for genetics?"},
{"correctAnswer": "生物物理学", "options": ["生物物理学", "植物学", "動物学", "古生物学"], "question": "What is the kanji for biophysics?"},
{"correctAnswer": "植物学", "options": ["植物学", "動物学", "古生物学", "微生物学"], "question": "What is the kanji for botany?"},
{"correctAnswer": "動物学", "options": ["動物学", "古生物学", "微生物学", "海洋学"], "question": "What is the kanji for zoology?"},
{"correctAnswer": "古生物学", "options": ["古生物学", "微生物学", "海洋学", "気象学"], "question": "What is the kanji for paleontology?"},
{"correctAnswer": "微生物学", "options": ["微生物学", "海洋学", "気象学", "地質学"], "question": "What is the kanji for microbiology?"},
{"correctAnswer": "海洋学", "options": ["海洋学", "気象学", "地質学", "鉱物学"], "question": "What is the kanji for oceanography?"},
{"correctAnswer": "気象学", "options": ["気象学", "地質学", "鉱物学", "生態学"], "question": "What is the kanji for meteorology?"},
{"correctAnswer": "地質学", "options": ["地質学", "鉱物学", "生態学", "生物学"], "question": "What is the kanji for geology?"},
{"correctAnswer": "鉱物学", "options": ["鉱物学", "生態学", "生物学", "植物"], "question": "What is the kanji for mineralogy?"},
{"correctAnswer": "生態学", "options": ["生態学", "生物学", "植物", "動物"], "question": "What is the kanji for ecology?"},
{"correctAnswer": "生物学", "options": ["生物学", "植物", "動物", "人間学"], "question": "What is the kanji for biology?"},
{"correctAnswer": "植物", "options": ["植物", "動物", "人間学", "人類"], "question": "What is the kanji for plant?"},
{"correctAnswer": "動物", "options": ["動物", "人間学", "人類", "進化論"], "question": "What is the kanji for animal?"},
{"correctAnswer": "人間学", "options": ["人間学", "人類", "進化論", "医学"], "question": "What is the kanji for anthropology?"},
{"correctAnswer": "人類", "options": ["人類", "進化論", "医学", "歯学"], "question": "What is the kanji for humanity?"},
{"correctAnswer": "進化論", "options": ["進化論", "医学", "歯学", "看護学"], "question": "What is the kanji for evolution?"},
{"correctAnswer": "医学", "options": ["医学", "歯学", "看護学", "薬学"], "question": "What is the kanji for medicine?"},
{"correctAnswer": "歯学", "options": ["歯学", "看護学", "薬学", "心臓"], "question": "What is the kanji for dentistry?"},
{"correctAnswer": "看護学", "options": ["看護学", "薬学", "心臓", "脳"], "question": "What is the kanji for nursing?"},
{"correctAnswer": "薬学", "options": ["薬学", "心臓", "脳", "骨"], "question": "What is the kanji for pharmacy?"},
{"correctAnswer": "心臓", "options": ["心臓", "脳", "骨", "筋肉"], "question": "What is the kanji for heart?"},
{"correctAnswer": "脳", "options": ["脳", "骨", "筋肉", "皮膚"], "question": "What is the kanji for brain?"},
{"correctAnswer": "骨", "options": ["骨", "筋肉", "皮膚", "肺"], "question": "What is the kanji for bone?"},
{"correctAnswer": "筋肉", "options": ["筋肉", "皮膚", "肺", "肝臓"], "question": "What is the kanji for muscle?"},
{"correctAnswer": "皮膚", "options": ["皮膚", "肺", "肝臓", "腎臓"], "question": "What is the kanji for skin?"},
{"correctAnswer": "肺", "options": ["肺", "肝臓", "腎臓", "腸"], "question": "What is the kanji for lung?"},
{"correctAnswer": "肝臓", "options": ["肝臓", "腎臓", "腸", "胃"], "question": "What is the kanji for liver?"},
{"correctAnswer": "腎臓", "options": ["腎臓", "腸", "胃", "膵臓"], "question": "What is the kanji for kidney?"},
{"correctAnswer": "腸", "options": ["腸", "胃", "膵臓", "心臓"], "question": "What is the kanji for intestine?"},
{"correctAnswer": "胃", "options": ["胃", "膵臓", "心臓", "脾臓"], "question": "What is the kanji for stomach?"},
{"correctAnswer": "膵臓", "options": ["膵臓", "心臓", "脾臓", "臓器"], "question": "What is the kanji for pancreas?"},
{"correctAnswer": "心臓", "options": ["心臓", "脾臓", "臓器", "骨髄"], "question": "What is the kanji for heart?"},
{"correctAnswer": "脾臓", "options": ["脾臓", "臓器", "骨髄", "膀胱"], "question": "What is the kanji for spleen?"},
{"correctAnswer": "臓器", "options": ["臓器", "骨髄", "膀胱", "皮膚"], "question": "What is the kanji for organ?"},
{"correctAnswer": "骨髄", "options": ["骨髄", "膀胱", "皮膚", "毛髪"], "question": "What is the kanji for bone marrow?"},
{"correctAnswer": "膀胱", "options": ["膀胱", "皮膚", "毛髪", "爪"], "question": "What is the kanji for bladder?"},
{"correctAnswer": "皮膚", "options": ["皮膚", "毛髪", "爪", "耳"], "question": "What is the kanji for skin?"},
{"correctAnswer": "毛髪", "options": ["毛髪", "爪", "耳", "目"], "question": "What is the kanji for hair?"},
{"correctAnswer": "爪", "options": ["爪", "耳", "目", "歯"], "question": "What is the kanji for nail?"},
{"correctAnswer": "耳", "options": ["耳", "目", "歯", "鼻"], "question": "What is the kanji for ear?"},
{"correctAnswer": "目", "options": ["目", "歯", "鼻", "口"], "question": "What is the kanji for eye?"},
{"correctAnswer": "歯", "options": ["歯", "鼻", "口", "舌"], "question": "What is the kanji for tooth?"},
{"correctAnswer": "鼻", "options": ["鼻", "口", "舌", "唇"], "question": "What is the kanji for nose?"},
{"correctAnswer": "口", "options": ["口", "舌", "唇", "歯"], "question": "What is the kanji for mouth?"},
{"correctAnswer": "舌", "options": ["舌", "唇", "歯", "顎"], "question": "What is the kanji for tongue?"},
{"correctAnswer": "唇", "options": ["唇", "歯", "顎", "頬"], "question": "What is the kanji for lips?"},
{"correctAnswer": "歯", "options": ["歯", "顎", "頬", "首"], "question": "What is the kanji for tooth?"},
{"correctAnswer": "顎", "options": ["顎", "頬", "首", "髭"], "question": "What is the kanji for jaw?"},
{"correctAnswer": "頬", "options": ["頬", "首", "髭", "目"], "question": "What is the kanji for cheek?"},
{"correctAnswer": "首", "options": ["首", "髭", "目", "髪"], "question": "What is the kanji for neck?"},
{"correctAnswer": "髭", "options": ["髭", "目", "髪", "肩"], "question": "What is the kanji for beard?"},
{"correctAnswer": "目", "options": ["目", "髪", "肩", "胸"], "question": "What is the kanji for eye?"},
{"correctAnswer": "髪", "options": ["髪", "肩", "胸", "腕"], "question": "What is the kanji for hair?"},
{"correctAnswer": "肩", "options": ["肩", "胸", "腕", "手"], "question": "What is the kanji for shoulder?"},
{"correctAnswer": "胸", "options": ["胸", "腕", "手", "指"], "question": "What is the kanji for chest?"},
{"correctAnswer": "腕", "options": ["腕", "手", "指", "腰"], "question": "What is the kanji for arm?"},
{"correctAnswer": "手", "options": ["手", "指", "腰", "足"], "question": "What is the kanji for hand?"},
{"correctAnswer": "指", "options": ["指", "腰", "足", "膝"], "question": "What is the kanji for finger?"},
{"correctAnswer": "腰", "options": ["腰", "足", "膝", "足首"], "question": "What is the kanji for waist?"},
{"correctAnswer": "足", "options": ["足", "膝", "足首", "つま先"], "question": "What is the kanji for leg?"},
{"correctAnswer": "膝", "options": ["膝", "足首", "つま先", "爪先"], "question": "What is the kanji for knee?"},
{"correctAnswer": "足首", "options": ["足首", "つま先", "爪先", "かかと"], "question": "What is the kanji for ankle?"},
{"correctAnswer": "つま先", "options": ["つま先", "爪先", "かかと", "足跡"], "question": "What is the kanji for toe?"},
{"correctAnswer": "爪先", "options": ["爪先", "かかと", "足跡", "踵"], "question": "What is the kanji for toenail?"},
{"correctAnswer": "かかと", "options": ["かかと", "足跡", "踵", "土踏まず"], "question": "What is the kanji for heel?"},
{"correctAnswer": "足跡", "options": ["足跡", "踵", "土踏まず", "靴底"], "question": "What is the kanji for footprint?"},
{"correctAnswer": "踵", "options": ["踵", "土踏まず", "靴底", "草履"], "question": "What is the kanji for heel of foot?"},
{"correctAnswer": "土踏まず", "options": ["土踏まず", "靴底", "草履", "足袋"], "question": "What is the kanji for arch of the foot?"},
{"correctAnswer": "靴底", "options": ["靴底", "草履", "足袋", "足りない"], "question": "What is the kanji for sole of the shoe?"},
{"correctAnswer": "草履", "options": ["草履", "足袋", "足りない", "歩く"], "question": "What is the kanji for traditional Japanese sandals?"},
{"correctAnswer": "足袋", "options": ["足袋", "足りない", "歩く", "走る"], "question": "What is the kanji for traditional Japanese socks?"},
{"correctAnswer": "足りない", "options": ["足りない", "歩く", "走る", "跳ぶ"], "question": "What is the kanji for not enough?"},
{"correctAnswer": "歩く", "options": ["歩く", "走る", "跳ぶ", "止まる"], "question": "What is the kanji for walk?"},
{"correctAnswer": "走る", "options": ["走る", "跳ぶ", "止まる", "向かう"], "question": "What is the kanji for run?"},
{"correctAnswer": "跳ぶ", "options": ["跳ぶ", "止まる", "向かう", "回る"], "question": "What is the kanji for jump?"},
{"correctAnswer": "止まる", "options": ["止まる", "向かう", "回る", "探す"], "question": "What is the kanji for stop?"},
{"correctAnswer": "向かう", "options": ["向かう", "回る", "探す", "見つける"], "question": "What is the kanji for go towards?"},
{"correctAnswer": "回る", "options": ["回る", "探す", "見つける", "迷子"], "question": "What is the kanji for turn around?"},
{"correctAnswer": "探す", "options": ["探す", "見つける", "迷子", "見る"], "question": "What is the kanji for search?"},
{"correctAnswer": "見つける", "options": ["見つける", "迷子", "見る", "聞く"], "question": "What is the kanji for find?"},
{"correctAnswer": "迷子", "options": ["迷子", "見る", "聞く", "話す"], "question": "What is the kanji for lost child?"},
{"correctAnswer": "見る", "options": ["見る", "聞く", "話す", "読む"], "question": "What is the kanji for see?"},
{"correctAnswer": "聞く", "options": ["聞く", "話す", "読む", "書く"], "question": "What is the kanji for ask?"},
{"correctAnswer": "話す", "options": ["話す", "読む", "書く", "語る"], "question": "What is the kanji for speak?"},
{"correctAnswer": "読む", "options": ["読む", "書く", "語る", "書物"], "question": "What is the kanji for read?"},
{"correctAnswer": "書く", "options": ["書く", "語る", "書物", "言葉"], "question": "What is the kanji for write?"},
{"correctAnswer": "語る", "options": ["語る", "書物", "言葉", "詩"], "question": "What is the kanji for narrate?"},
{"correctAnswer": "書物", "options": ["書物", "言葉", "詩", "文章"], "question": "What is the kanji for book?"},
{"correctAnswer": "言葉", "options": ["言葉", "詩", "文章", "手紙"], "question": "What is the kanji for language?"},
{"correctAnswer": "詩", "options": ["詩", "文章", "手紙", "小説"], "question": "What is the kanji for poem?"},
{"correctAnswer": "文章", "options": ["文章", "手紙", "小説", "作文"], "question": "What is the kanji for writing?"},
{"correctAnswer": "手紙", "options": ["手紙", "小説", "作文", "短編小説"], "question": "What is the kanji for letter?"},
{"correctAnswer": "小説", "options": ["小説", "作文", "短編小説", "エッセイ"], "question": "What is the kanji for novel?"},
{"correctAnswer": "作文", "options": ["作文", "短編小説", "エッセイ", "レポート"], "question": "What is the kanji for composition?"},
{"correctAnswer": "短編小説", "options": ["短編小説", "エッセイ", "レポート", "脚本"], "question": "What is the kanji for short story?"},
{"correctAnswer": "エッセイ", "options": ["エッセイ", "レポート", "脚本", "映画"], "question": "What is the kanji for essay?"},
{"correctAnswer": "レポート", "options": ["レポート", "脚本", "映画", "ドラマ"], "question": "What is the kanji for report?"},
{"correctAnswer": "脚本", "options": ["脚本", "映画", "ドラマ", "テレビ"], "question": "What is the kanji for screenplay?"},
{"correctAnswer": "映画", "options": ["映画", "ドラマ", "テレビ", "音楽"], "question": "What is the kanji for movie?"},
{"correctAnswer": "ドラマ", "options": ["ドラマ", "テレビ", "音楽", "舞台"], "question": "What is the kanji for drama?"},
{"correctAnswer": "テレビ", "options": ["テレビ", "音楽", "舞台", "ラジオ"], "question": "What is the kanji for television?"},
{"correctAnswer": "音楽", "options": ["音楽", "舞台", "ラジオ", "美術"], "question": "What is the kanji for music?"},
{"correctAnswer": "舞台", "options": ["舞台", "ラジオ", "美術", "写真"], "question": "What is the kanji for stage?"},
{"correctAnswer": "ラジオ", "options": ["ラジオ", "美術", "写真", "彫刻"], "question": "What is the kanji for radio?"},
{"correctAnswer": "美術", "options": ["美術", "写真", "彫刻", "工芸"], "question": "What is the kanji for art?"},
{"correctAnswer": "写真", "options": ["写真", "彫刻", "工芸", "陶芸"], "question": "What is the kanji for photograph?"},
{"correctAnswer": "彫刻", "options": ["彫刻", "工芸", "陶芸", "絵画"], "question": "What is the kanji for sculpture?"},
{"correctAnswer": "工芸", "options": ["工芸", "陶芸", "絵画", "詩"], "question": "What is the kanji for craft?"},
{"correctAnswer": "陶芸", "options": ["陶芸", "絵画", "詩", "小説"], "question": "What is the kanji for pottery?"},
{"correctAnswer": "絵画", "options": ["絵画", "詩", "小説", "文章"], "question": "What is the kanji for painting?"},
{"correctAnswer": "詩", "options": ["詩", "小説", "文章", "手紙"], "question": "What is the kanji for poem?"},
{"correctAnswer": "小説", "options": ["小説", "文章", "手紙", "エッセイ"], "question": "What is the kanji for novel?"},
{"correctAnswer": "文章", "options": ["文章", "手紙", "エッセイ", "レポート"], "question": "What is the kanji for writing?"},
{"correctAnswer": "手紙", "options": ["手紙", "エッセイ", "レポート", "短編小説"], "question": "What is the kanji for letter?"},
{"correctAnswer": "小説", "options": ["小説", "エッセイ", "レポート", "短編小説"], "question": "What is the kanji for novel?"},
{"correctAnswer": "エッセイ", "options": ["エッセイ", "レポート", "短編小説", "脚本"], "question": "What is the kanji for essay?"},
{"correctAnswer": "レポート", "options": ["レポート", "短編小説", "脚本", "映画"], "question": "What is the kanji for report?"},
{"correctAnswer": "脚本", "options": ["脚本", "映画", "ドラマ", "テレビ"], "question": "What is the kanji for screenplay?"},
{"correctAnswer": "映画", "options": ["映画", "ドラマ", "テレビ", "音楽"], "question": "What is the kanji for movie?"},
{"correctAnswer": "ドラマ", "options": ["ドラマ", "テレビ", "音楽", "舞台"], "question": "What is the kanji for drama?"},
{"correctAnswer": "テレビ", "options": ["テレビ", "音楽", "舞台", "ラジオ"], "question": "What is the kanji for television?"},
{"correctAnswer": "音楽", "options": ["音楽", "舞台", "ラジオ", "美術"], "question": "What is the kanji for music?"},
{"correctAnswer": "舞台", "options": ["舞台", "ラジオ", "美術", "写真"], "question": "What is the kanji for stage?"},
{"correctAnswer": "ラジオ", "options": ["ラジオ", "美術", "写真", "彫刻"], "question": "What is the kanji for radio?"},
{"correctAnswer": "美術", "options": ["美術", "写真", "彫刻", "工芸"], "question": "What is the kanji for art?"},
{"correctAnswer": "写真", "options": ["写真", "彫刻", "工芸", "陶芸"], "question": "What is the kanji for photograph?"},
{"correctAnswer": "彫刻", "options": ["彫刻", "工芸", "陶芸", "絵画"], "question": "What is the kanji for sculpture?"},
{"correctAnswer": "工芸", "options": ["工芸", "陶芸", "絵画", "詩"], "question": "What is the kanji for craft?"},
{"correctAnswer": "陶芸", "options": ["陶芸", "絵画", "詩", "小説"], "question": "What is the kanji for pottery?"},
{"correctAnswer": "絵画", "options": ["絵画", "詩", "小説", "文章"], "question": "What is the kanji for painting?"},
{"correctAnswer": "詩", "options": ["詩", "小説", "文章", "手紙"], "question": "What is the kanji for poem?"},
{"correctAnswer": "小説", "options": ["小説", "文章", "手紙", "エッセイ"], "question": "What is the kanji for novel?"},
{"correctAnswer": "文章", "options": ["文章", "手紙", "エッセイ", "レポート"], "question": "What is the kanji for writing?"},
{"correctAnswer": "手紙", "options": ["手紙", "エッセイ", "レポート", "短編小説"], "question": "What is the kanji for letter?"},
{"correctAnswer": "小説", "options": ["小説", "エッセイ", "レポート", "短編小説"], "question": "What is the kanji for novel?"},
{"correctAnswer": "エッセイ", "options": ["エッセイ", "レポート", "短編小説", "脚本"], "question": "What is the kanji for essay?"},
{"correctAnswer": "レポート", "options": ["レポート", "短編小説", "脚本", "映画"], "question": "What is the kanji for report?"},
{"correctAnswer": "脚本", "options": ["脚本", "映画", "ドラマ", "テレビ"], "question": "What is the kanji for screenplay?"},
{"correctAnswer": "映画", "options": ["映画", "ドラマ", "テレビ", "音楽"], "question": "What is the kanji for movie?"},
{"correctAnswer": "ドラマ", "options": ["ドラマ", "テレビ", "音楽", "舞台"], "question": "What is the kanji for drama?"},
{"correctAnswer": "テレビ", "options": ["テレビ", "音楽", "舞台", "ラジオ"], "question": "What is the kanji for television?"},
{"correctAnswer": "音楽", "options": ["音楽", "舞台", "ラジオ", "美術"], "question": "What is the kanji for music?"},
{"correctAnswer": "舞台", "options": ["舞台", "ラジオ", "美術", "写真"], "question": "What is the kanji for stage?"},
{"correctAnswer": "ラジオ", "options": ["ラジオ", "美術", "写真", "彫刻"], "question": "What is the kanji for radio?"},
{"correctAnswer": "美術", "options": ["美術", "写真", "彫刻", "工芸"], "question": "What is the kanji for art?"},
{"correctAnswer": "写真", "options": ["写真", "彫刻", "工芸", "陶芸"], "question": "What is the kanji for photograph?"},
{"correctAnswer": "彫刻", "options": ["彫刻", "工芸", "陶芸", "絵画"], "question": "What is the kanji for sculpture?"},
{"correctAnswer": "工芸", "options": ["工芸", "陶芸", "絵画", "詩"], "question": "What is the kanji for craft?"},
{"correctAnswer": "陶芸", "options": ["陶芸", "絵画", "詩", "小説"], "question": "What is the kanji for pottery?"},
{"correctAnswer": "絵画", "options": ["絵画", "詩", "小説", "文章"], "question": "What is the kanji for painting?"},
{"correctAnswer": "詩", "options": ["詩", "小説", "文章", "手紙"], "question": "What is the kanji for poem?"},
{"correctAnswer": "小説", "options": ["小説", "文章", "手紙", "エッセイ"], "question": "What is the kanji for novel?"},
{"correctAnswer": "文章", "options": ["文章", "手紙", "エッセイ", "レポート"], "question": "What is the kanji for writing?"},
{"correctAnswer": "手紙", "options": ["手紙", "エッセイ", "レポート", "短編小説"], "question": "What is the kanji for letter?"},
{"correctAnswer": "小説", "options": ["小説", "エッセイ", "レポート", "短編小説"], "question": "What is the kanji for novel?"},
{"correctAnswer": "エッセイ", "options": ["エッセイ", "レポート", "短編小説", "脚本"], "question": "What is the kanji for essay?"},
{"correctAnswer": "レポート", "options": ["レポート", "短編小説", "脚本", "映画"], "question": "What is the kanji for report?"},
{"correctAnswer": "脚本", "options": ["脚本", "映画", "ドラマ", "テレビ"], "question": "What is the kanji for screenplay?"},
{"correctAnswer": "映画", "options": ["映画", "ドラマ", "テレビ", "音楽"], "question": "What is the kanji for movie?"},
{"correctAnswer": "ドラマ", "options": ["ドラマ", "テレビ", "音楽", "舞台"], "question": "What is the kanji for drama?"},
{"correctAnswer": "テレビ", "options": ["テレビ", "音楽", "舞台", "ラジオ"], "question": "What is the kanji for television?"},
{"correctAnswer": "音楽", "options": ["音楽", "舞台", "ラジオ", "美術"], "question": "What is the kanji for music?"},
{"correctAnswer": "舞台", "options": ["舞台", "ラジオ", "美術", "写真"], "question": "What is the kanji for stage?"},
{"correctAnswer": "ラジオ", "options": ["ラジオ", "美術", "写真", "彫刻"], "question": "What is the kanji for radio?"},
{"correctAnswer": "美術", "options": ["美術", "写真", "彫刻", "工芸"], "question": "What is the kanji for art?"},
{"correctAnswer": "写真", "options": ["写真", "彫刻", "工芸", "陶芸"], "question": "What is the kanji for photograph?"},
{"correctAnswer": "彫刻", "options": ["彫刻", "工芸", "陶芸", "絵画"], "question": "What is the kanji for sculpture?"},
{"correctAnswer": "工芸", "options": ["工芸", "陶芸", "絵画", "詩"], "question": "What is the kanji for craft?"},
{"correctAnswer": "陶芸", "options": ["陶芸", "絵画", "詩", "小説"], "question": "What is the kanji for pottery?"},
{"correctAnswer": "絵画", "options": ["絵画", "詩", "小説", "文章"], "question": "What is the kanji for painting?"},
{"correctAnswer": "詩", "options": ["詩", "小説", "文章", "手紙"], "question": "What is the kanji for poem?"},
{"correctAnswer": "小説", "options": ["小説", "文章", "手紙", "エッセイ"], "question": "What is the kanji for novel?"},
{"correctAnswer": "文章", "options": ["文章", "手紙", "エッセイ", "レポート"], "question": "What is the kanji for writing?"},
{"correctAnswer": "手紙", "options": ["手紙", "エッセイ", "レポート", "短編小説"], "question": "What is the kanji for letter?"},
{"correctAnswer": "小説", "options": ["小説", "エッセイ", "レポート", "短編小説"], "question": "What is the kanji for novel?"}
   ],

"khan13":[
  {"correctAnswer": "木", "options": ["火", "水", "土", "木"], "question": "What is the Kanji character for 'tree'?"},
  {"correctAnswer": "日", "options": ["月", "金", "土", "日"], "question": "What is the Kanji character for 'sun'?"},
  {"correctAnswer": "一", "options": ["二", "三", "四", "一"], "question": "What is the Kanji character for 'one'?"},
  {"correctAnswer": "人", "options": ["大", "口", "耳", "人"], "question": "What is the Kanji character for 'person'?"},
  {"correctAnswer": "学", "options": ["書", "食", "音", "学"], "question": "What is the Kanji character for 'study'?"},
  {"correctAnswer": "雨", "options": ["雲", "雷", "雪", "雨"], "question": "What is the Kanji character for 'rain'?"},
  {"correctAnswer": "火", "options": ["水", "土", "風", "火"], "question": "What is the Kanji character for 'fire'?"},
  {"correctAnswer": "山", "options": ["川", "海", "森", "山"], "question": "What is the Kanji character for 'mountain'?"},
  {"correctAnswer": "川", "options": ["池", "海", "湖", "川"], "question": "What is the Kanji character for 'river'?"},
  {"correctAnswer": "本", "options": ["手", "口", "目", "本"], "question": "What is the Kanji character for 'book'?"},
  {"correctAnswer": "月", "options": ["日", "星", "雲", "月"], "question": "What is the Kanji character for 'moon'?"},
  {"correctAnswer": "食", "options": ["飲", "味", "飽", "食"], "question": "What is the Kanji character for 'eat'?"},
  {"correctAnswer": "手", "options": ["足", "目", "口", "手"], "question": "What is the Kanji character for 'hand'?"},
  {"correctAnswer": "足", "options": ["手", "頭", "腕", "足"], "question": "What is the Kanji character for 'leg'?"},
  {"correctAnswer": "車", "options": ["飛", "走", "船", "車"], "question": "What is the Kanji character for 'car'?"},
  {"correctAnswer": "電", "options": ["水", "火", "風", "電"], "question": "What is the Kanji character for 'electricity'?"},
  {"correctAnswer": "魚", "options": ["鳥", "犬", "馬", "魚"], "question": "What is the Kanji character for 'fish'?"},
  {"correctAnswer": "鳥", "options": ["獣", "虫", "羽", "鳥"], "question": "What is the Kanji character for 'bird'?"},
  {"correctAnswer": "犬", "options": ["猫", "兎", "馬", "犬"], "question": "What is the Kanji character for 'dog'?"},
  {"correctAnswer": "猫", "options": ["犬", "兎", "馬", "猫"], "question": "What is the Kanji character for 'cat'?"},
  {"correctAnswer": "手紙", "options": ["本", "手", "書", "手紙"], "question": "What is the Kanji representation for 'letter' or 'handwriting'?"},
  {"correctAnswer": "学生", "options": ["先生", "友達", "家族", "学生"], "question": "What is the Kanji representation for 'student'?"},
  {"correctAnswer": "日本", "options": ["韓国", "中国", "アメリカ", "日本"], "question": "What is the Kanji representation for 'Japan'?"},
  {"correctAnswer": "先週", "options": ["今週", "来週", "昨日", "先週"], "question": "What is the Kanji representation for 'last week'?"},
  {"correctAnswer": "明日", "options": ["今日", "昨日", "明日", "今週"], "question": "What is the Kanji representation for 'tomorrow'?"},
  {"correctAnswer": "昨年", "options": ["今年", "去年", "来年", "昨年"], "question": "What is the Kanji representation for 'last year'?"},
  {"correctAnswer": "先月", "options": ["今月", "来月", "昨月", "先月"], "question": "What is the Kanji representation for 'last month'?"},
  {"correctAnswer": "金曜日", "options": ["月曜日", "水曜日", "木曜日", "金曜日"], "question": "What is the Kanji representation for 'Friday'?"},
  {"correctAnswer": "今晩", "options": ["今朝", "昨晩", "明晩", "今晩"], "question": "What is the Kanji representation for 'tonight'?"},
  {"correctAnswer": "先生", "options": ["学生", "医者", "芸術家", "先生"], "question": "What is the Kanji representation for 'teacher'?"},
  {"correctAnswer": "東京", "options": ["大阪", "京都", "神戸", "東京"], "question": "What is the Kanji representation for 'Tokyo'?"},
  {"correctAnswer": "花火", "options": ["桜", "紅葉", "雪", "花火"], "question": "What is the Kanji representation for 'fireworks'?"},
  {"correctAnswer": "冬休み", "options": ["春休み", "夏休み", "秋休み", "冬休み"], "question": "What is the Kanji representation for 'winter vacation'?"},
  {"correctAnswer": "音楽", "options": ["美術", "体育", "数学", "音楽"], "question": "What is the Kanji representation for 'music'?"},
  {"correctAnswer": "日本語", "options": ["英語", "中国語", "韓国語", "日本語"], "question": "What is the Kanji representation for 'Japanese language'?"},
  {"correctAnswer": "新聞", "options": ["雑誌", "本", "漫画", "新聞"], "question": "What is the Kanji representation for 'newspaper'?"},
  {"correctAnswer": "春夏秋冬", "options": ["朝昼晩夜", "東西南北", "一二三四", "春夏秋冬"], "question": "What is the Kanji representation for 'four seasons'?"},
  {"correctAnswer": "美味しい", "options": ["楽しい", "綺麗な", "高い", "美味しい"], "question": "What is the Kanji representation for 'delicious'?"},
  {"correctAnswer": "友達", "options": ["家族", "先生", "同僚", "友達"], "question": "What is the Kanji representation for 'friend'?"},
  {"correctAnswer": "夏祭り", "options": ["花見", "お盆", "クリスマス", "夏祭り"], "question": "What is the Kanji representation for 'summer festival'?"},
  {"correctAnswer": "昨晩", "options": ["今晩", "今朝", "明晩", "昨晩"], "question": "What is the Kanji representation for 'last night'?"},
  {"correctAnswer": "一緒に", "options": ["別々に", "早く", "遅く", "一緒に"], "question": "What is the Kanji representation for 'together'?"},
  {"correctAnswer": "お疲れ様", "options": ["ありがとう", "すみません", "お願いします", "お疲れ様"], "question": "What is the Kanji representation for 'thank you for your hard work'?"},
  {"correctAnswer": "自転車", "options": ["電車", "車", "飛行機", "自転車"], "question": "What is the Kanji representation for 'bicycle'?"},
  {"correctAnswer": "一番", "options": ["最後", "最初", "二番", "一番"], "question": "What is the Kanji representation for 'number one' or 'the best'?"},
  {"correctAnswer": "大好き", "options": ["大嫌い", "少し", "全然", "大好き"], "question": "What is the Kanji representation for 'I love you a lot'?"},
  {"correctAnswer": "お誕生日おめでとう", "options": ["ありがとう", "ごめんなさい", "お疲れ様", "お誕生日おめでとう"], "question": "What is the Kanji representation for 'Happy Birthday'?"},
  {"correctAnswer": "一期一会", "options": ["百聞は一見に如かず", "十人十色", "七転び八起き", "一期一会"], "question": "What is the Kanji representation for 'once in a lifetime'?"},
  {"correctAnswer": "お楽しみください", "options": ["ごちそうさまでした", "お疲れ様でした", "お疲れ様です", "お楽しみください"], "question": "What is the Kanji representation for 'Please enjoy (your meal, event, etc.)'?"},
  {"correctAnswer": "十五夜", "options": ["七夕", "元日", "節分", "十五夜"], "question": "What is the Kanji representation for 'night of the fifteenth (full moon)'?"},
  {"correctAnswer": "新学期", "options": ["夏休み", "冬休み", "春休み", "新学期"], "question": "What is the Kanji representation for 'new school term'?"},
  {"correctAnswer": "忍者", "options": ["武士", "侍", "僧侶", "忍者"], "question": "What is the Kanji representation for 'ninja'?"},
  {"correctAnswer": "お疲れ様でした", "options": ["ありがとう", "ごめんなさい", "お疲れ様です", "お疲れ様でした"], "question": "What is the Kanji representation for 'Thank you for your hard work'?"},
  {"correctAnswer": "一石二鳥", "options": ["百聞は一見に如かず", "七転び八起き", "二度あることは三度ある", "一石二鳥"], "question": "What is the Kanji representation for 'kill two birds with one stone'?"},
  {"correctAnswer": "猿も木から落ちる", "options": ["石の上にも三年", "蛙の子は蛙", "馬の耳に念仏", "猿も木から落ちる"], "question": "What is the Kanji representation for 'even monkeys fall from trees'?"},
  {"correctAnswer": "七転び八起き", "options": ["百聞は一見に如かず", "七転び八起き", "二度あることは三度ある", "一期一会"], "question": "What is the Kanji representation for 'fall down seven times, get up eight'?"},
  {"correctAnswer": "桜前線", "options": ["紅葉狩り", "梅雨入り", "台風", "桜前線"], "question": "What is the Kanji representation for 'cherry blossom front'?"},
  {"correctAnswer": "三日坊主", "options": ["初老", "一陽来復", "自業自得", "三日坊主"], "question": "What is the Kanji representation for 'person who gives up easily' or 'starts something and gives up in three days'?"},
  {"correctAnswer": "四季折々", "options": ["五里霧中", "六根清浄", "七転び八起き", "四季折々"], "question": "What is the Kanji representation for 'each season' or 'every season has its own charm'?"},
  {"correctAnswer": "一富士二鷹三茄子", "options": ["二度あることは三度ある", "七転び八起き", "四面楚歌", "一富士二鷹三茄子"], "question": "What is the Kanji representation for 'one Mount Fuji, two hawks, three eggplants'?"}
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
  ],

    "num01":[
    {"question": "What is the following number: 二十", "correctAnswer": "20", "options": ["20", "30", "40", "50"]},
    {"question": "What is the following number: 三十", "correctAnswer": "30", "options": ["20", "30", "40", "50"]},
    {"question": "What is the following number: 四十", "correctAnswer": "40", "options": ["20", "30", "40", "50"]},
    {"question": "What is the following number: 五十", "correctAnswer": "50", "options": ["20", "30", "40", "50"]},
    {"question": "What is the following number: 六十", "correctAnswer": "60", "options": ["20", "30", "60", "50"]},
    {"question": "What is the following number: 七十", "correctAnswer": "70", "options": ["70", "30", "40", "50"]},
    {"question": "What is the following number: 八十", "correctAnswer": "80", "options": ["20", "30", "80", "50"]},
    {"question": "What is the following number: 九十", "correctAnswer": "90", "options": ["20", "30", "40", "90"]},
    {"question": "What is the following number: 百", "correctAnswer": "100", "options": ["20", "100", "40", "50"]},
    {"question": "What is the following number: 千", "correctAnswer": "1000", "options": ["20", "1000", "40", "50"]},
    {"question": "What is the following number: 二百四十", "correctAnswer": "240", "options": ["240", "140", "340", "440"]},
    {"question": "What is the following number: 一百四十", "correctAnswer": "140", "options": ["240", "140", "340", "440"]},
    {"question": "What is the following number: 七百四十", "correctAnswer": "740", "options": ["240", "140", "340", "740"]},
    {"question": "What is the following number: 五百六十", "correctAnswer": "560", "options": ["260", "560", "360", "460"]},
    {"question": "What is the following number: 三百二十", "correctAnswer": "320", "options": ["220", "320", "420", "520"]},
    {"question": "What is the following number: 一百七十", "correctAnswer": "170", "options": ["270", "170", "370", "470"]},
    {"question": "What is the following number: 八百五十", "correctAnswer": "850", "options": ["250", "550", "850", "950"]},
    {"question": "What is the following number: 九百三十", "correctAnswer": "930", "options": ["330", "530", "730", "930"]},
    {"question": "What is the following number: 四百三十", "correctAnswer": "430", "options": ["330", "430", "530", "630"]},
    {"question": "What is the following number: 七百八十", "correctAnswer": "780", "options": ["280", "580", "780", "880"]},
    {"question": "What is the following number: 五百九十", "correctAnswer": "590", "options": ["290", "490", "590", "690"]},
    {"question": "What is the following number: 六百五十", "correctAnswer": "650", "options": ["250", "550", "650", "750"]},
    {"question": "What is the following number: 三百四十", "correctAnswer": "340", "options": ["240", "340", "440", "540"]},
    {"question": "What is the following number: 八百三十", "correctAnswer": "830", "options": ["330", "530", "830", "930"]},
    {"question": "What is the following number: 九百七十", "correctAnswer": "970", "options": ["370", "570", "770", "970"]},
    {"question": "What is the following number: 一百二十", "correctAnswer": "120", "options": ["220", "320", "420", "120"]},
    {"question": "What is the following number: 二百五十", "correctAnswer": "250", "options": ["150", "250", "350", "450"]},
    {"question": "What is the following number: 六百七十", "correctAnswer": "670", "options": ["270", "370", "670", "770"]},
    {"question": "What is the following number: 四百五十", "correctAnswer": "450", "options": ["350", "450", "550", "650"]},
    {"question": "What is the following number: 九百二十", "correctAnswer": "920", "options": ["320", "520", "720", "920"]},
    {"question": "What is the following number: 八千六百", "correctAnswer": "8600", "options": ["8600", "8700", "8500", "8400"]},
    {"question": "What is the following number: 二千三百", "correctAnswer": "2300", "options": ["2300", "2200", "2400", "2100"]},
    {"question": "What is the following number: 八千七百五十", "correctAnswer": "8750", "options": ["8750", "8650", "8850", "8950"]},
    {"question": "What is the following number: 六千九百", "correctAnswer": "6900", "options": ["6900", "6800", "6700", "6600"]},
    {"question": "What is the following number: 四千五百", "correctAnswer": "4500", "options": ["4500", "4600", "4400", "4700"]},
    {"question": "What is the following number: 八千二百", "correctAnswer": "8200", "options": ["8200", "8100", "8300", "8400"]},
    {"question": "What is the following number: 三千七百", "correctAnswer": "3700", "options": ["3700", "3600", "3800", "3900"]},
    {"question": "What is the following number: 五千六百", "correctAnswer": "5600", "options": ["5600", "5500", "5700", "5800"]},
    {"question": "What is the following number: 七千四百", "correctAnswer": "7400", "options": ["7400", "7300", "7500", "7600"]},
    {"question": "What is the following number: 一千二百", "correctAnswer": "1200", "options": ["1200", "1100", "1300", "1400"]},
    {"question": "What is the following number: 九千五百", "correctAnswer": "9500", "options": ["9500", "9400", "9600", "9700"]},
    {"question": "What is the following number: 四千八百", "correctAnswer": "4800", "options": ["4800", "4700", "4900", "5000"]},
    {"question": "What is the following number: 六千七百", "correctAnswer": "6700", "options": ["6700", "6600", "6800", "6900"]},
    {"question": "What is the following number: 五千九百", "correctAnswer": "5900", "options": ["5900", "5800", "6000", "6100"]},
    {"question": "What is the following number: 三千三百", "correctAnswer": "3300", "options": ["3300", "3200", "3400", "3500"]},
    {"question": "What is the following number: 四万五千九百", "correctAnswer": "45900", "options": ["45900", "45910", "45800", "45890"]},
    {"question": "What is the following number: 七万六千五百", "correctAnswer": "76500", "options": ["76500", "76510", "76400", "76490"]},
    {"question": "What is the following number: 二万三千七百八十", "correctAnswer": "23780", "options": ["23780", "23770", "23800", "23790"]},
    {"question": "What is the following number: 五万九千八百", "correctAnswer": "59800", "options": ["59800", "59810", "59700", "59790"]},
    {"question": "What is the following number: 八万七千五百", "correctAnswer": "87500", "options": ["87500", "87510", "87400", "87490"]},
    {"question": "What is the following number: 一万三千四百六十", "correctAnswer": "13460", "options": ["13460", "13470", "13450", "13440"]},
    {"question": "What is the following number: 三万五千八百二十", "correctAnswer": "35820", "options": ["35820", "35810", "35830", "35840"]},
    {"question": "What is the following number: 四万七千三百五十", "correctAnswer": "47350", "options": ["47350", "47340", "47360", "47370"]},
    {"question": "What is the following number: 六万九千四百二十", "correctAnswer": "69420", "options": ["69420", "69430", "69410", "69400"]},
    {"question": "What is the following number: 五万八千七百八", "correctAnswer": "58708", "options": ["58708", "58718", "58700", "58790"]},
    {"question": "What is the following number: 八十九万", "correctAnswer": "890000", "options": ["890000", "890100", "889000", "889900"]},
    {"question": "What is the following number: 六十五万三千", "correctAnswer": "653000", "options": ["653000", "653100", "652000", "652900"]},
    {"question": "What is the following number: 九十五万三千四百", "correctAnswer": "953400", "options": ["953400", "953500", "953300", "953600"]},
    {"question": "What is the following number: 七十七万八千九百", "correctAnswer": "778900", "options": ["778900", "779000", "778800", "778700"]},
    {"question": "What is the following number: 八十六万五千七百", "correctAnswer": "865700", "options": ["865700", "865800", "865600", "865900"]},
    {"question": "What is the following number: 六十三万五千二百", "correctAnswer": "635200", "options": ["635200", "635300", "635100", "635000"]},
    {"question": "What is the following number: 九十四万七千八百三十", "correctAnswer": "947830", "options": ["947830", "947840", "947820", "947810"]},
    {"question": "What is the following number: 七十六万一千五百二十", "correctAnswer": "761520", "options": ["761520", "761510", "761530", "761540"]},
    {"question": "What is the following number: 六十九万四千三百六十", "correctAnswer": "694360", "options": ["694360", "694370", "694350", "694340"]},
    {"question": "What is the following number: 九十万三千", "correctAnswer": "900300", "options": ["900300", "900400", "900200", "900100"]},
    {"question": "What is the following number: 一百二十九万", "correctAnswer": "1290000", "options": ["1290000", "1291000", "1289000", "1289900"]},
    {"question": "What is the following number: 六百七十七万三千", "correctAnswer": "6773000", "options": ["6773000", "6774000", "6772000", "6773100"]},
    {"question": "What is the following number: 八百八十五万三千四百", "correctAnswer": "8853400", "options": ["8853400", "8853500", "8853300", "8852400"]},
    {"question": "What is the following number: 一百二十万六千", "correctAnswer": "1206000", "options": ["1206000", "1207000", "1205000", "1205100"]},
    {"question": "What is the following number: 七百八十万九千八百", "correctAnswer": "7809800", "options": ["7809800", "7809900", "7809700", "7808900"]},
    {"question": "What is the following number: 五百六十万五千二百", "correctAnswer": "5605200", "options": ["5605200", "5605300", "5605100", "5605400"]},
    {"question": "What is the following number: 八百五十万六千三百", "correctAnswer": "8506300", "options": ["8506300", "8506400", "8506200", "8506100"]},
    {"question": "What is the following number: 九百二十万九千七百", "correctAnswer": "9209700", "options": ["9209700", "9209800", "9209600", "9209500"]},
    {"question": "What is the following number: 四百三十万五千八百", "correctAnswer": "4305800", "options": ["4305800", "4305900", "4305700", "4305600"]},
    {"question": "What is the following number: 六百六十万七千二百", "correctAnswer": "6607200", "options": ["6607200", "6607300", "6607100", "6607000"]}
    ],

"num02":[
    {"question": "What is the following number: 百三十四", "correctAnswer": "134", "options": ["5432", "678", "134", "622"]},
    {"question": "What is the following number: 五百六十七", "correctAnswer": "567", "options": ["567", "675", "576", "765"]},
    {"question": "What is the following number: 九百八十三", "correctAnswer": "983", "options": ["389", "983", "893", "839"]},
    {"question": "What is the following number: 五百三十九", "correctAnswer": "539", "options": ["593", "395", "539", "359"]},
    {"question": "What is the following number: 三百二十七", "correctAnswer": "327", "options": ["372", "723", "327", "237"]},
    {"question": "What is the following number: 七百四十六", "correctAnswer": "746", "options": ["476", "647", "746", "764"]},
    {"question": "What is the following number: 一百九十八", "correctAnswer": "198", "options": ["891", "819", "198", "981"]},
    {"question": "What is the following number: 二百二十一", "correctAnswer": "221", "options": ["122", "212", "221", "212"]},
    {"question": "What is the following number: 四百五十三", "correctAnswer": "453", "options": ["435", "543", "345", "453"]},
    {"question": "What is the following number: 百四十七", "correctAnswer": "147", "options": ["174", "741", "147", "741"]},
    {"question": "What is the following number: 三百九十二", "correctAnswer": "392", "options": ["923", "329", "239", "392"]},
    {"question": "What is the following number: 五百八十六", "correctAnswer": "586", "options": ["658", "568", "865", "586"]},
    {"question": "What is the following number: 百三十九", "correctAnswer": "139", "options": ["391", "931", "139", "931"]},
    {"question": "What is the following number: 六百二十八", "correctAnswer": "628", "options": ["826", "862", "628", "286"]},
    {"question": "What is the following number: 二百四十三", "correctAnswer": "243", "options": ["324", "432", "243", "342"]},
    {"question": "What is the following number: 八百七十五", "correctAnswer": "875", "options": ["857", "758", "578", "875"]},
    {"question": "What is the following number: 九百六十一", "correctAnswer": "961", "options": ["691", "619", "961", "196"]},
    {"question": "What is the following number: 七百二十九", "correctAnswer": "729", "options": ["927", "297", "279", "729"]},
    {"question": "What is the following number: 四百二十一", "correctAnswer": "421", "options": ["124", "214", "421", "142"]},
    {"question": "What is the following number: 五百九十八", "correctAnswer": "598", "options": ["895", "985", "859", "598"]},
    {"question": "What is the following number: 七千六百七十八", "correctAnswer": "7678", "options": ["7876", "6787", "7678", "8767"]},
    {"question": "What is the following number: 八千六百四十三", "correctAnswer": "8643", "options": ["8436", "6348", "8643", "3468"]},
    {"question": "What is the following number: 千四百八十九", "correctAnswer": "1489", "options": ["1849", "8941", "1489", "9418"]},
    {"question": "What is the following number: 六千九百六十九", "correctAnswer": "6969", "options": ["9669", "9696", "6996", "6969"]},
    {"question": "What is the following number: 四千二百七", "correctAnswer": "4207", "options": ["4720", "2047", "2704", "4207"]},
    {"question": "What is the following number: 八千七百六十七", "correctAnswer": "8767", "options": ["7867", "6778", "8677", "8767"]},
    {"question": "What is the following number: 三千五百六十九", "correctAnswer": "3569", "options": ["3659", "5693", "9536", "3569"]},
    {"question": "What is the following number: 四千九百八十二", "correctAnswer": "4982", "options": ["8924", "2489", "9482", "4982"]},
    {"question": "What is the following number: 六千三百七十一", "correctAnswer": "6371", "options": ["7316", "1736", "3167", "6371"]},
    {"question": "What is the following number: 五千四百二十五", "correctAnswer": "5425", "options": ["2545", "4255", "5254", "5425"]},
    {"question": "What is the following number: 七千六百九十八", "correctAnswer": "7698", "options": ["9687", "8976", "6789", "7698"]},
    {"question": "What is the following number: 八千三百四十一", "correctAnswer": "8341", "options": ["4318", "1483", "4813", "8341"]},
    {"question": "What is the following number: 二千六百三十四", "correctAnswer": "2634", "options": ["3642", "4236", "6324", "2634"]},
    {"question": "What is the following number: 千五百九十八", "correctAnswer": "1598", "options": ["5891", "9851", "9859", "1598"]},
    {"question": "What is the following number: 九百二十七", "correctAnswer": "927", "options": ["8279", "3792", "3297", "927"]},
    {"question": "What is the following number: 六千八百三十五", "correctAnswer": "6835", "options": ["8536", "3568", "5368", "6835"]},
    {"question": "What is the following number: 三千六百四十七", "correctAnswer": "3647", "options": ["4673", "6473", "7436", "3647"]},
    {"question": "What is the following number: 六千一百五十九", "correctAnswer": "6159", "options": ["5916", "9516", "5169", "6159"]},
    {"question": "What is the following number: 四千二百三十八", "correctAnswer": "4238", "options": ["2834", "3842", "8243", "4238"]},
    {"question": "What is the following number: 千六百七十三", "correctAnswer": "1673", "options": ["7631", "7316", "3761", "1673"]},
    {"question": "What is the following number: 八千五百九十二", "correctAnswer": "8592", "options": ["9258", "5928", "2589", "8592"]},
    {"question": "What is the following number: 五六七八八", "correctAnswer": "56788", "options": ["57886", "58876", "67858", "56788"]},
    {"question": "What is the following number: 三九二五一", "correctAnswer": "39251", "options": ["32591", "92513", "25139", "39251"]},
    {"question": "What is the following number: 七五六七四", "correctAnswer": "75674", "options": ["76547", "67457", "64775", "75674"]},
    {"question": "What is the following number: 九八三四九", "correctAnswer": "98349", "options": ["34989", "83949", "94389", "98349"]},
    {"question": "What is the following number: 六一四九六", "correctAnswer": "61496", "options": ["64916", "96146", "49614", "61496"]},
    {"question": "What is the following number: 五七六一三", "correctAnswer": "57613", "options": ["56731", "16375", "53167", "57613"]},
    {"question": "What is the following number: 八四三八二", "correctAnswer": "84382", "options": ["48382", "38284", "28834", "84382"]},
    {"question": "What is the following number: 三七一一四", "correctAnswer": "37114", "options": ["17431", "11473", "14173", "37114"]},
    {"question": "What is the following number: 二五四七九", "correctAnswer": "25479", "options": ["54729", "47925", "27954", "25479"]},
    {"question": "What is the following number: 九零六五九", "correctAnswer": "90659", "options": ["95609", "56909", "69059", "90659"]},
    {"question": "What is the following number: 八五九一六", "correctAnswer": "85916", "options": ["91658", "16589", "65891", "85916"]},
    {"question": "What is the following number: 七二三三二", "correctAnswer": "72332", "options": ["33227", "23273", "23372", "72332"]},
    {"question": "What is the following number: 六一四七五", "correctAnswer": "61475", "options": ["61745", "47516", "74516", "61475"]},
    {"question": "What is the following number: 四七九八一", "correctAnswer": "47981", "options": ["19874", "89174", "17498", "47981"]},
    {"question": "What is the following number: 三三四五二", "correctAnswer": "33452", "options": ["45233", "24533", "25334", "33452"]},
    {"question": "What is the following number: 九五四五八七", "correctAnswer": "954587", "options": ["987455", "578954", "785945", "954587"]},
    {"question": "What is the following number: 二三三二七八", "correctAnswer": "233278", "options": ["327832", "872332", "782233", "233278"]},
    {"question": "What is the following number: 六七九零二六", "correctAnswer": "679026", "options": ["260796", "620976", "970626", "679026"]},
    {"question": "What is the following number: 四二五三一二", "correctAnswer": "425312", "options": ["532214", "251324", "314522", "425312"]},
    {"question": "What is the following number: 八零一一七八", "correctAnswer": "801178", "options": ["711088", "811708", "170881", "801178"]},
    {"question": "What is the following number: 三六六零五五", "correctAnswer": "366055", "options": ["605366", "556603", "660535", "366055"]},
    {"question": "What is the following number: 五一六七七二", "correctAnswer": "516772", "options": ["272516", "771256", "672517", "516772"]},
    {"question": "What is the following number: 九三二八二八", "correctAnswer": "932828", "options": ["288329", "282893", "829328", "932828"]},
    {"question": "What is the following number: 七六零零六四", "correctAnswer": "760064", "options": ["640076", "400676", "606740", "760064"]},
    {"question": "What is the following number: 五七一零四二", "correctAnswer": "571042", "options": ["204715", "714502", "421057", "571042"]},
    {"question": "What is the following number: 六四三一五三", "correctAnswer": "643153", "options": ["531643", "351463", "315436", "643153"]},
    {"question": "What is the following number: 六六七八一六", "correctAnswer": "667816", "options": ["186766", "816766", "768166", "667816"]},
    {"question": "What is the following number: 四零八六一三", "correctAnswer": "408613", "options": ["130846", "861304", "134608", "408613"]},
    {"question": "What is the following number: 八七一二九八", "correctAnswer": "871298", "options": ["298781", "129878", "982781", "871298"]},
    {"question": "What is the following number: 三五零九四八", "correctAnswer": "350948", "options": ["843095", "498503", "948503", "350948"]},
    {"question": "What is the following number: 九四一三六一", "correctAnswer": "941361", "options": ["613419", "361194", "134619", "941361"]},
    {"question": "What is the following number: 六八九零二九", "correctAnswer": "689029", "options": ["290689", "926890", "902896", "689029"]},
    {"question": "What is the following number: 七零一二八六九", "correctAnswer": "7012869", "options": ["7012896", "7012689", "7081269", "7012869"]},
    {"question": "What is the following number: 八八七四一五三", "correctAnswer": "8874153", "options": ["8874135", "8871543", "8873451", "8874153"]},
    {"question": "What is the following number: 一二八五四九六", "correctAnswer": "1285496", "options": ["1285964", "1285649", "1258964", "1285496"]},
    {"question": "What is the following number: 三七五零六七一", "correctAnswer": "3750671", "options": ["3750176", "3756071", "3751067", "3750671"]},
    {"question": "What is the following number: 六五一七二三九", "correctAnswer": "6517239", "options": ["6517392", "6571329", "6175239", "6517239"]},
    {"question": "What is the following number: 四九六零七三八", "correctAnswer": "4960738", "options": ["4967380", "4963078", "4967803", "4960738"]},
    {"question": "What is the following number: 五四一二七八三", "correctAnswer": "5412783", "options": ["5412837", "5417382", "5421783", "5412783"]},
    {"question": "What is the following number: 八七零一二九九", "correctAnswer": "8701299", "options": ["8701929", "8702199", "8710299", "8701299"]},
    {"question": "What is the following number: 三八一零九五一", "correctAnswer": "3810951", "options": ["3811590", "3810591", "3815019", "3810951"]},
    {"question": "What is the following number: 九八三二六七一", "correctAnswer": "9832671", "options": ["9837162", "9832716", "9873261", "9832671"]},
    {"question": "What is the following number: 一五七五一八零", "correctAnswer": "1575180", "options": ["1571805", "1570518", "1578150", "1575180"]},
    {"question": "What is the following number: 六四八五七零一", "correctAnswer": "6485701", "options": ["6485107", "6480715", "6487015", "6485701"]},
    {"question": "What is the following number: 九二一零五六六", "correctAnswer": "9210566", "options": ["9215066", "9216560", "9210656", "9210566"]},
    {"question": "What is the following number: 四八零八一二七", "correctAnswer": "4808127", "options": ["4807218", "4802817", "4810827", "4808127"]},
    {"question": "What is the following number: 三零八一二四六", "correctAnswer": "3081246", "options": ["3082416", "3081462", "3018246", "3081246"]},
    {"question": "What is the following number: 八一九六二五一", "correctAnswer": "8196251", "options": ["8195216", "8169251", "8156921", "8196251"]},
    {"question": "What is the following number: 七零五六三八一", "correctAnswer": "7056381", "options": ["7058316", "7065381", "7086531", "7056381"]},
    {"question": "What is the following number: 六二四五七八九", "correctAnswer": "6245789", "options": ["6245978", "6249875", "6284579", "6245789"]},
    {"question": "What is the following number: 千五百六十七万八千四百五十八", "correctAnswer": "15678458", "options": ["15678485", "15648758", "15687548", "15678458"]},
    {"question": "What is the following number: 六百三十五万八千二百九十一", "correctAnswer": "6358291", "options": ["6359218", "6352981", "6358129", "6358291"]},
    {"question": "What is the following number: 十二万三千四百五十六", "correctAnswer": "123456", "options": ["124356", "123546", "125346", "123456"]},
    {"question": "What is the following number: 九千八百七十六万五千四百三十二", "correctAnswer": "98765432", "options": ["98764532", "98745632", "98765423", "98765432"]},
    {"question": "What is the following number: 五百万八千三百二十七", "correctAnswer": "5008327", "options": ["5083272", "5008237", "5003278", "5008327"]},
    {"question": "What is the following number: 八百七十六万三千九百二十五", "correctAnswer": "8763925", "options": ["8765293", "8739625", "8793625", "8763925"]},
    {"question": "What is the following number: 二百五十六万七千八百九十", "correctAnswer": "2567890", "options": ["2567980", "2568790", "2567890", "2569870"]},
    {"question": "What is the following number: 九十万八千七百六十五", "correctAnswer": "908765", "options": ["907865", "908756", "908675", "908765"]},
    {"question": "What is the following number: 一百万四千三百二十一", "correctAnswer": "1004321", "options": ["1003421", "1004321", "1002314", "1004231"]},
    {"question": "What is the following number: 六千七百八十五万三千二百十", "correctAnswer": "67853210", "options": ["67832150", "67853201", "67852310", "67853210"]},
    {"question": "What is the following number: 十九万四千八百七十五万六千三百一十", "correctAnswer": "1948756310", "options": ["1948756310", "1948753610", "1948567310", "1948756310"]},
    {"question": "What is the following number: 百八十三万五千四百六十七万九千二百三十", "correctAnswer": "18354679230", "options": ["18354769230", "18354967230", "18354679230", "18354697230"]},
    {"question": "What is the following number: 千四百三十五万七千八百九十六", "correctAnswer": "143570896", "options": ["143570896", "143579086", "143506789", "143708956"]},
    {"question": "What is the following number: 百五十九万六千四百三十五万六千二百九十一", "correctAnswer": "15964356291", "options": ["15964356291", "15956342961", "15946325691", "15964352691"]},
    {"question": "What is the following number: 七千六百六十五万五千三百四十七", "correctAnswer": "76655347", "options": ["76655347", "76756345", "76654357", "76765435"]},
    {"question": "What is the following number: 三百四十万五千八百九十二万三千五百八十", "correctAnswer": "34058923580", "options": ["34058923580", "34058293580", "34589235800", "34058923508"]},
    {"question": "What is the following number: 九百八十六万七千三百二十一万三千七百九十六", "correctAnswer": "98673213796", "options": ["98673213796", "98673213976", "98672133796", "98763213796"]},
    {"question": "What is the following number: 十九万四千三百六十五万七千四百二十", "correctAnswer": "1943657420", "options": ["1943657420", "1943654720", "1943675420", "1943576420"]},
    {"question": "What is the following number: 五千六百四十万八千七百九十二万五千三百六十四", "correctAnswer": "5648792564", "options": ["5648792564", "5648729564", "5648725469", "5648592764"]},
    {"question": "What is the following number: 二百三十七万五千八百八十六万九千二百一十", "correctAnswer": "2375886210", "options": ["2375886210", "2375886210", "2375868210", "2375886210"]},
    {"question": "What is the following number: 百三十九万七千六百五十四万八千二百三十六", "correctAnswer": "13976548236", "options": ["13976548236", "13976542836", "13976485236", "13975648236"]},
    {"question": "What is the following number: 五十六万四千七百六十二万八千九百五十", "correctAnswer": "5647628950", "options": ["5647628950", "5647682950", "5647689250", "5647826950"]},
    {"question": "What is the following number: 千五百八十六万七千三百四十八万三千九百二十", "correctAnswer": "158673483920", "options": ["158673483920", "158673489320", "158673843920", "158674389320"]},
    {"question": "What is the following number: 六百六十四万七千九百五十八万五千八百八十", "correctAnswer": "6647958850", "options": ["6647958850", "6647958850", "6647958850", "6647958850"]},
    {"question": "What is the following number: 千七百九十万八千五百二十七万六千五百一十", "correctAnswer": "17908527610", "options": ["17908527610", "17908527610", "17908527610", "17908527610"]}
    ],

"tns01": [
{
"question": "Will eat (Future Tense)",
"options": ["食べます", "飲みます", "行きます", "読みます"],
"correctAnswer": "食べます"
},
{
"question": "Will sleep (Future Tense)",
"options": ["寝ます", "飲みます", "行きます", "読みます"],
"correctAnswer": "寝ます"
},
{
"question": "Will study (Future Tense)",
"options": ["勉強します", "飲みます", "行きます", "読みます"],
"correctAnswer": "勉強します"
},
{
"question": "Will watch (Future Tense)",
"options": ["見ます", "飲みます", "行きます", "読みます"],
"correctAnswer": "見ます"
},
{
"question": "Will play (Future Tense)",
"options": ["遊びます", "飲みます", "行きます", "読みます"],
"correctAnswer": "遊びます"
},
{
"question": "Will read (Future Tense)",
"options": ["読みます", "飲みます", "行きます", "寝ます"],
"correctAnswer": "読みます"
},
{
"question": "Will drink (Future Tense)",
"options": ["飲みます", "見ます", "行きます", "読みます"],
"correctAnswer": "飲みます"
},
{
"question": "Will go (Future Tense)",
"options": ["行きます", "飲みます", "読みます", "寝ます"],
"correctAnswer": "行きます"
},
{
"question": "Will write (Future Tense)",
"options": ["書きます", "飲みます", "行きます", "読みます"],
"correctAnswer": "書きます"
},
{
"question": "Will buy (Future Tense)",
"options": ["買います", "飲みます", "行きます", "読みます"],
"correctAnswer": "買います"
},
{
"question": "Will come (Future Tense)",
"options": ["来ます", "飲みます", "行きます", "読みます"],
"correctAnswer": "来ます"
},
{
"question": "Will speak (Future Tense)",
"options": ["話します", "飲みます", "行きます", "読みます"],
"correctAnswer": "話します"
},
{
"question": "Will run (Future Tense)",
"options": ["走ります", "飲みます", "行きます", "読みます"],
"correctAnswer": "走ります"
},
{
"question": "Will swim (Future Tense)",
"options": ["泳ぎます", "飲みます", "行きます", "読みます"],
"correctAnswer": "泳ぎます"
},
{
"question": "Will drive (Future Tense)",
"options": ["運転します", "飲みます", "行きます", "読みます"],
"correctAnswer": "運転します"
},
{
"question": "Will cook (Future Tense)",
"options": ["料理します", "飲みます", "行きます", "読みます"],
"correctAnswer": "料理します"
},
{
"question": "Will wait (Future Tense)",
"options": ["待ちます", "飲みます", "行きます", "読みます"],
"correctAnswer": "待ちます"
},
{
"question": "Will work (Future Tense)",
"options": ["働きます", "飲みます", "行きます", "読みます"],
"correctAnswer": "働きます"
},
{
"question": "Will call (Future Tense)",
"options": ["電話します", "飲みます", "行きます", "読みます"],
"correctAnswer": "電話します"
},
{
"question": "Will meet (Future Tense)",
"options": ["会います", "飲みます", "行きます", "読みます"],
"correctAnswer": "会います"
},
{
"question": "Eats (Present Tense)",
"options": ["食べます", "飲みます", "行きます", "読みます"],
"correctAnswer": "食べます"
},
{
"question": "Sleeps (Present Tense)",
"options": ["寝ます", "見ます", "行きます", "読みます"],
"correctAnswer": "寝ます"
},
{
"question": "Studies (Present Tense)",
"options": ["勉強します", "飲みます", "行きます", "話します"],
"correctAnswer": "勉強します"
},
{
"question": "Watches (Present Tense)",
"options": ["見ます", "飲みます", "行きます", "寝ます"],
"correctAnswer": "見ます"
},
{
"question": "Plays (Present Tense)",
"options": ["遊びます", "飲みます", "行きます", "読みます"],
"correctAnswer": "遊びます"
},
{
"question": "Reads (Present Tense)",
"options": ["読みます", "飲みます", "行きます", "寝ます"],
"correctAnswer": "読みます"
},
{
"question": "Drinks (Present Tense)",
"options": ["飲みます", "見ます", "行きます", "読みます"],
"correctAnswer": "飲みます"
},
{
"question": "Goes (Present Tense)",
"options": ["行きます", "食べます", "読みます", "寝ます"],
"correctAnswer": "行きます"
},
{
"question": "Writes (Present Tense)",
"options": ["書きます", "食べます", "読みます", "寝ます"],
"correctAnswer": "書きます"
},
{
"question": "Buys (Present Tense)",
"options": ["買います", "食べます", "読みます", "寝ます"],
"correctAnswer": "買います"
},
{
"question": "Comes (Present Tense)",
"options": ["来ます", "食べます", "読みます", "寝ます"],
"correctAnswer": "来ます"
},
{
"question": "Speaks (Present Tense)",
"options": ["話します", "食べます", "読みます", "寝ます"],
"correctAnswer": "話します"
},
{
"question": "Runs (Present Tense)",
"options": ["走ります", "食べます", "読みます", "寝ます"],
"correctAnswer": "走ります"
},
{
"question": "Swims (Present Tense)",
"options": ["泳ぎます", "食べます", "読みます", "寝ます"],
"correctAnswer": "泳ぎます"
},
{
"question": "Drives (Present Tense)",
"options": ["運転します", "食べます", "読みます", "寝ます"],
"correctAnswer": "運転します"
},
{
"question": "Cooks (Present Tense)",
"options": ["料理します", "食べます", "読みます", "寝ます"],
"correctAnswer": "料理します"
},
{
"question": "Waits (Present Tense)",
"options": ["待ちます", "食べます", "読みます", "寝ます"],
"correctAnswer": "待ちます"
},
{
"question": "Works (Present Tense)",
"options": ["働きます", "食べます", "読みます", "寝ます"],
"correctAnswer": "働きます"
},
{
"question": "Calls (Present Tense)",
"options": ["電話します", "食べます", "読みます", "寝ます"],
"correctAnswer": "電話します"
},
{
"question": "Meets (Present Tense)",
"options": ["会います", "食べます", "読みます", "寝ます"],
"correctAnswer": "会います"
},
{
"question": "Ate (Past Tense)",
"options": ["食べました", "飲みました", "行きました", "読みました"],
"correctAnswer": "食べました"
},
{
"question": "Slept (Past Tense)",
"options": ["寝ました", "見ました", "行きました", "読みました"],
"correctAnswer": "寝ました"
},
{
"question": "Studied (Past Tense)",
"options": ["勉強しました", "飲みました", "行きました", "話しました"],
"correctAnswer": "勉強しました"
},
{
"question": "Watched (Past Tense)",
"options": ["見ました", "飲みました", "行きました", "寝ました"],
"correctAnswer": "見ました"
},
{
"question": "Played (Past Tense)",
"options": ["遊びました", "飲みました", "行きました", "読みました"],
"correctAnswer": "遊びました"
},
{
"question": "Read (Past Tense)",
"options": ["読みました", "飲みました", "行きました", "寝ました"],
"correctAnswer": "読みました"
},
{
"question": "Drank (Past Tense)",
"options": ["飲みました", "見ました", "行きました", "読みました"],
"correctAnswer": "飲みました"
},
{
"question": "Went (Past Tense)",
"options": ["行きました", "食べました", "読みました", "寝ました"],
"correctAnswer": "行きました"
},
{
"question": "Wrote (Past Tense)",
"options": ["書きました", "食べました", "読みました", "寝ました"],
"correctAnswer": "書きました"
},
{
"question": "Bought (Past Tense)",
"options": ["買いました", "食べました", "読みました", "寝ました"],
"correctAnswer": "買いました"
},
{
"question": "Came (Past Tense)",
"options": ["来ました", "食べました", "読みました", "寝ました"],
"correctAnswer": "来ました"
},
{
"question": "Spoke (Past Tense)",
"options": ["話しました", "食べました", "読みました", "寝ました"],
"correctAnswer": "話しました"
},
{
"question": "Ran (Past Tense)",
"options": ["走りました", "食べました", "読みました", "寝ました"],
"correctAnswer": "走りました"
},
{
"question": "Swam (Past Tense)",
"options": ["泳ぎました", "食べました", "読みました", "寝ました"],
"correctAnswer": "泳ぎました"
},
{
"question": "Drove (Past Tense)",
"options": ["運転しました", "食べました", "読みました", "寝ました"],
"correctAnswer": "運転しました"
},
{
"question": "Cooked (Past Tense)",
"options": ["料理しました", "食べました", "読みました", "寝ました"],
"correctAnswer": "料理しました"
},
{
"question": "Waited (Past Tense)",
"options": ["待ちました", "食べました", "読みました", "寝ました"],
"correctAnswer": "待ちました"
},
{
"question": "Worked (Past Tense)",
"options": ["働きました", "食べました", "読みました", "寝ました"],
"correctAnswer": "働きました"
},
{
"question": "Called (Past Tense)",
"options": ["電話しました", "食べました", "読みました", "寝ました"],
"correctAnswer": "電話しました"
},
{
"question": "Met (Past Tense)",
"options": ["会いました", "食べました", "読みました", "寝ました"],
"correctAnswer": "会いました"
}
    ],

"n5I01":[
{"question": "What is the Japanese word for 'class'?", "options": ["じゅぎょう", "がっこう", "しごと", "だいがく"], "correctAnswer": "じゅぎょう"},
 {"question": "What is the Japanese word for 'friend'?", "options": ["ともだち", "えいが", "しょっぴんぐもーる", "りょこう"], "correctAnswer": "ともだち"},
 {"question": "What is the Japanese word for 'name'?", "options": ["なまえ", "とし", "こくせき", "しゅみ"], "correctAnswer": "なまえ"},
 {"question": "What is the Japanese word for 'age'?", "options": ["とし", "なまえ", "しゅみ", "こくせき"], "correctAnswer": "とし"},
 {"question": "What is the Japanese word for 'nationality'?", "options": ["こくせき", "しゅみ", "なまえ", "とし"], "correctAnswer": "こくせき"},
 {"question": "What is the Japanese word for 'hobby'?", "options": ["しゅみ", "こくせき", "とし", "なまえ"], "correctAnswer": "しゅみ"},
 {"question": "What is the Japanese word for 'father'?", "options": ["ちち", "はは", "あに", "いもうと"], "correctAnswer": "ちち"},
 {"question": "What is the Japanese word for 'mother'?", "options": ["はは", "ちち", "あに", "いもうと"], "correctAnswer": "はは"},
 {"question": "What is the Japanese word for 'older brother'?", "options": ["あに", "いもうと", "ちち", "はは"], "correctAnswer": "あに"},
 {"question": "What is the Japanese word for 'younger sister'?", "options": ["いもうと", "あに", "はは", "ちち"], "correctAnswer": "いもうと"},
 {"question": "What is the Japanese word for 'wake up'?", "options": ["おきる", "ねる", "あさごはん", "がっこう"], "correctAnswer": "おきる"},
 {"question": "What is the Japanese word for 'sleep'?", "options": ["ねる", "おきる", "がっこう", "あさごはん"], "correctAnswer": "ねる"},
 {"question": "What is the Japanese word for 'breakfast'?", "options": ["あさごはん", "がっこう", "ねる", "おきる"], "correctAnswer": "あさごはん"},
 {"question": "What is the Japanese word for 'weekend'?", "options": ["しゅうまつ", "とmodachi", "えいが", "しょっぴんぐ"], "correctAnswer": "しゅうまつ"},
 {"question": "What is the Japanese word for 'movie'?", "options": ["えいが", "しょっぴんぐ", "しゅうまつ", "ともだち"], "correctAnswer": "えいが"},
 {"question": "What is the Japanese word for 'shopping'?", "options": ["しょっぴんぐ", "しゅうまつ", "ともだち", "えいが"], "correctAnswer": "しょっぴんぐ"},
 {"question": "What is the Japanese word for 'dream'?", "options": ["ゆめ", "しごと", "かつどうか", "いしゃ"], "correctAnswer": "ゆめ"},
 {"question": "What is the Japanese word for 'job'?", "options": ["しごと", "かつどうか", "いしゃ", "ゆめ"], "correctAnswer": "しごと"},
 {"question": "What is the Japanese word for 'activist'?", "options": ["かつどうか", "いしゃ", "ゆめ", "しごと"], "correctAnswer": "かつどうか"},
 {"question": "What is the Japanese word for 'doctor'?", "options": ["いしゃ", "ゆめ", "しごと", "かつどうか"], "correctAnswer": "いしゃ"},
{"question": "What is the Japanese word for 'book'?", "options": ["ほん", "くつ", "てがみ", "めがね"], "correctAnswer": "ほん"},
 {"question": "What is the Japanese word for 'school'?", "options": ["がっこう", "えいが", "ともだち", "ねる"], "correctAnswer": "がっこう"},
 {"question": "What is the Japanese word for 'car'?", "options": ["くるま", "ねこ", "いぬ", "とり"], "correctAnswer": "くるま"},
 {"question": "What is the Japanese word for 'bus'?", "options": ["バス", "てんしゃ", "くるま", "じてんしゃ"], "correctAnswer": "バス"},
 {"question": "What is the Japanese word for 'train'?", "options": ["でんしゃ", "くるま", "じてんしゃ", "ひこうき"], "correctAnswer": "でんしゃ"},
 {"question": "What is the Japanese word for 'plane'?", "options": ["ひこうき", "じてんしゃ", "くるま", "でんしゃ"], "correctAnswer": "ひこうき"},
 {"question": "What is the Japanese word for 'house'?", "options": ["いえ", "くるま", "ねこ", "いぬ"], "correctAnswer": "いえ"},
 {"question": "What is the Japanese word for 'cat'?", "options": ["ねこ", "いぬ", "くるま", "いえ"], "correctAnswer": "ねこ"},
 {"question": "What is the Japanese word for 'dog'?", "options": ["いぬ", "ねこ", "くるま", "いえ"], "correctAnswer": "いぬ"},
 {"question": "What is the Japanese word for 'bird'?", "options": ["とり", "ねこ", "いぬ", "くるま"], "correctAnswer": "とり"},
 {"question": "What is the Japanese word for 'pen'?", "options": ["ぺん", "ほん", "てがみ", "くつ"], "correctAnswer": "ぺん"},
 {"question": "What is the Japanese word for 'pencil'?", "options": ["えんぴつ", "ほん", "くつ", "てがみ"], "correctAnswer": "えんぴつ"},
 {"question": "What is the Japanese word for 'paper'?", "options": ["かみ", "ほん", "くつ", "ぺん"], "correctAnswer": "かみ"},
 {"question": "What is the Japanese word for 'desk'?", "options": ["つくえ", "いす", "ほん", "かみ"], "correctAnswer": "つくえ"},
 {"question": "What is the Japanese word for 'chair'?", "options": ["いす", "つくえ", "くつ", "ぺん"], "correctAnswer": "いす"},
 {"question": "What is the Japanese word for 'table'?", "options": ["テーブル", "ほん", "かみ", "ぺん"], "correctAnswer": "テーブル"},
 {"question": "What is the Japanese word for 'phone'?", "options": ["でんわ", "ほん", "くるま", "いぬ"], "correctAnswer": "でんわ"},
 {"question": "What is the Japanese word for 'computer'?", "options": ["コンピューター", "ほん", "くるま", "いぬ"], "correctAnswer": "コンピューター"},
 {"question": "What is the Japanese word for 'watch'?", "options": ["とけい", "ほん", "くるま", "いぬ"], "correctAnswer": "とけい"},
 {"question": "What is the Japanese word for 'shoes'?", "options": ["くつ", "ほん", "かみ", "ぺん"], "correctAnswer": "くつ"},
 {"question": "What is the Japanese word for 'water'?", "options": ["みず", "くうちゅう", "ひかり", "はな"], "correctAnswer": "みず"},
    {"question": "What is the Japanese word for 'fire'?", "options": ["ひ", "かぜ", "くうちゅう", "ひかり"], "correctAnswer": "ひ"},
    {"question": "What is the Japanese word for 'tree'?", "options": ["き", "くうちゅう", "ひかり", "はな"], "correctAnswer": "き"},
    {"question": "What is the Japanese word for 'flower'?", "options": ["はな", "みず", "ひかり", "くうちゅう"], "correctAnswer": "はな"},
    {"question": "What is the Japanese word for 'sky'?", "options": ["そら", "ひ", "くうちゅう", "ひかり"], "correctAnswer": "そら"},
    {"question": "What is the Japanese word for 'earth'?", "options": ["ち", "ひ", "そら", "き"], "correctAnswer": "ち"},
    {"question": "What is the Japanese word for 'wind'?", "options": ["かぜ", "みず", "ひかり", "くうちゅう"], "correctAnswer": "かぜ"},
    {"question": "What is the Japanese word for 'sun'?", "options": ["たいよう", "そら", "くうちゅう", "はな"], "correctAnswer": "たいよう"},
    {"question": "What is the Japanese word for 'moon'?", "options": ["つき", "そら", "みず", "はな"], "correctAnswer": "つき"},
    {"question": "What is the Japanese word for 'star'?", "options": ["ほし", "そら", "みず", "はな"], "correctAnswer": "ほし"},
    {"question": "What is the Japanese word for 'cloud'?", "options": ["くも", "そら", "みず", "はな"], "correctAnswer": "くも"},
    {"question": "What is the Japanese word for 'rain'?", "options": ["あめ", "そら", "みず", "はな"], "correctAnswer": "あめ"},
    {"question": "What is the Japanese word for 'snow'?", "options": ["ゆき", "そら", "みず", "はな"], "correctAnswer": "ゆき"},
    {"question": "What is the Japanese word for 'mountain'?", "options": ["やま", "そら", "みず", "はな"], "correctAnswer": "やま"},
    {"question": "What is the Japanese word for 'sea'?", "options": ["うみ", "そら", "みず", "はな"], "correctAnswer": "うみ"},
    {"question": "What is the Japanese word for 'river'?", "options": ["かわ", "そら", "みず", "はな"], "correctAnswer": "かわ"},
    {"question": "What is the Japanese word for 'road'?", "options": ["みち", "そら", "みず", "はな"], "correctAnswer": "みち"},
    {"question": "What is the Japanese word for 'train station'?", "options": ["えき", "そら", "みず", "はな"], "correctAnswer": "えき"},
    {"question": "What is the Japanese word for 'bus stop'?", "options": ["バスてい", "そら", "みず", "はな"], "correctAnswer": "バスてい"},
    {"question": "What is the Japanese word for 'park'?", "options": ["こうえん", "そら", "みず", "はな"], "correctAnswer": "こうえん"},
 {"question": "What is the Japanese word for 'dog'?", "options": ["いぬ", "ねこ", "とり", "うし"], "correctAnswer": "いぬ"},
    {"question": "What is the Japanese word for 'cat'?", "options": ["ねこ", "いぬ", "とり", "うし"], "correctAnswer": "ねこ"},
    {"question": "What is the Japanese word for 'bird'?", "options": ["とり", "いぬ", "ねこ", "うし"], "correctAnswer": "とり"},
    {"question": "What is the Japanese word for 'cow'?", "options": ["うし", "いぬ", "ねこ", "とり"], "correctAnswer": "うし"},
    {"question": "What is the Japanese word for 'fish'?", "options": ["さかな", "いぬ", "ねこ", "とり"], "correctAnswer": "さかな"},
    {"question": "What is the Japanese word for 'mouse'?", "options": ["ねずみ", "いぬ", "ねこ", "とり"], "correctAnswer": "ねずみ"},
    {"question": "What is the Japanese word for 'monkey'?", "options": ["さる", "いぬ", "ねこ", "とり"], "correctAnswer": "さる"},
    {"question": "What is the Japanese word for 'elephant'?", "options": ["ぞう", "いぬ", "ねこ", "とり"], "correctAnswer": "ぞう"},
    {"question": "What is the Japanese word for 'horse'?", "options": ["うま", "いぬ", "ねこ", "とり"], "correctAnswer": "うま"},
    {"question": "What is the Japanese word for 'rabbit'?", "options": ["うさぎ", "いぬ", "ねこ", "とり"], "correctAnswer": "うさぎ"},
    {"question": "What is the Japanese word for 'snake'?", "options": ["へび", "いぬ", "ねこ", "とり"], "correctAnswer": "へび"},
    {"question": "What is the Japanese word for 'tiger'?", "options": ["とら", "いぬ", "ねこ", "とり"], "correctAnswer": "とら"},
    {"question": "What is the Japanese word for 'lion'?", "options": ["らいおん", "いぬ", "ねこ", "とり"], "correctAnswer": "らいおん"},
    {"question": "What is the Japanese word for 'bear'?", "options": ["くま", "いぬ", "ねこ", "とり"], "correctAnswer": "くま"},
    {"question": "What is the Japanese word for 'frog'?", "options": ["かえる", "いぬ", "ねこ", "とり"], "correctAnswer": "かえる"},
    {"question": "What is the Japanese word for 'butterfly'?", "options": ["ちょう", "いぬ", "ねこ", "とり"], "correctAnswer": "ちょう"},
    {"question": "What is the Japanese word for 'bee'?", "options": ["はち", "いぬ", "ねこ", "とり"], "correctAnswer": "はち"},
    {"question": "What is the Japanese word for 'ant'?", "options": ["あり", "いぬ", "ねこ", "とり"], "correctAnswer": "あり"},
    {"question": "What is the Japanese word for 'spider'?", "options": ["くも", "いぬ", "ねこ", "とり"], "correctAnswer": "くも"},
    {"question": "What is the Japanese word for 'fly'?", "options": ["はえ", "いぬ", "ねこ", "とり"], "correctAnswer": "はえ"}
    ],
  };


// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to display a question
function displayQuestion(question, callback) {
  if (!questionTextElement || !optionsContainer) {
    console.error("Missing HTML elements. Make sure they exist and the script is placed after them.");
    return;
  }

  // Display the question
  questionTextElement.textContent = question.question;

  // Shuffle options for a random order
  const shuffledOptions = question.options.slice();
  shuffleArray(shuffledOptions);

  // Clear previous options
  optionsContainer.innerHTML = '';

  // Display the options
  shuffledOptions.forEach(function (option) {
    const optionButton = document.createElement('button');
    optionButton.textContent = option;
    optionButton.classList.add('option', 'p-2', 'px-4', 'my-2', 'mx-1', 'btn', 'btn-primary', 'btn-sm');
    optionsContainer.appendChild(optionButton);
  });

  // Call the callback function after displaying options
  if (callback && typeof callback === 'function') {
    callback();
  }
}

  // Function to reset the game
  function resetGame() {
    score = 0;
    currentQuestionIndex = 0;
    updateScore();
    selectCategory(quizCode); // Set default category based on quizCode
    displayNextQuestion();
    tryAgainButton.style.display = "none"; // Hide the "Try Again" button
    feedbackMessageElement.textContent = ""; // Clear the feedback message
    optionsContainer.querySelectorAll('.option').forEach(function (option) {
      option.disabled = false; // Enable all options
      option.classList.remove("btn-success", "btn-danger", "btn-light"); // Reset option button styles
      option.classList.add("btn-primary"); // Set the default button style
    });
  }

// Function to update the score display
function updateScore() {
  correctCountElement.textContent = score;
  wrongCountElement.textContent = currentQuestionIndex - score;
}

 // Function to handle user's answer
  function checkAnswer(answer) {
    const currentQuestion = getCurrentQuestion();

    console.log("Selected answer:", answer);
    console.log("Correct answer:", currentQuestion.correctAnswer);

    if (currentQuestion && answer === currentQuestion.correctAnswer) {
      feedbackMessageElement.textContent = "Congratulations!! Correct answer.";
      feedbackMessageElement.style.color = "green"; // Set feedback message color to green for correct answers
      score++;
      optionsContainer.querySelectorAll('.option').forEach(function (option) {
        if (option.textContent === currentQuestion.correctAnswer) {
          option.classList.add("btn-success");
        } else {
          option.classList.remove("btn-primary");
          option.classList.add("btn-light"); // Reset other options to default color
          option.disabled = true; // Disable other options after correct answer
        }
      });
    } else {
      feedbackMessageElement.textContent = "Wrong Answer! The correct answer was: " + currentQuestion.correctAnswer;
      feedbackMessageElement.style.color = "red"; // Set feedback message color to red for incorrect answers
      optionsContainer.querySelectorAll('.option').forEach(function (option) {
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
      // Pass displayNextQuestion as a callback to displayQuestion
      displayQuestion(getCurrentQuestion(), displayNextQuestion);
    } else {
      // All questions answered, display score and try again button
      displayScore();
      displayTryAgainButton();
    }
  }// Function to get the current question based on the category and index
function getCurrentQuestion() {
  const questionSet = questionSets[currentCategory];

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
  const currentQuestion = getCurrentQuestion();

  if (currentQuestion) {
    displayQuestion(currentQuestion);
  } else {
    // No more questions, you may want to handle this case
    console.log("Quiz completed!");
  }
}

 // Function to display the score
  function displayScore() {
    questionTextElement.textContent = "Quiz completed! Your score: " + score + " out of " + getCurrentQuestionSet().length;
    feedbackMessageElement.textContent = "";
    optionsContainer.querySelectorAll('.option').forEach(function (option) {
      option.disabled = true; // Disable all options after quiz completion
    });


  }// Function to display the "Try Again" button
function displayTryAgainButton() {
  optionsContainer.querySelectorAll('.option').forEach(function (option) {
    option.disabled = true;
  });
  tryAgainButton.style.display = "block";
}

// Function to select the category
function selectCategory(category) {
  currentCategory = category;
}

// Add event listener to handle button clicks using event delegation
optionsContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('option')) {
    checkAnswer(event.target.textContent);
  }
});

// Try Again button click event
tryAgainButton.addEventListener('click', resetGame);

// Initial setup
resetGame();

});

