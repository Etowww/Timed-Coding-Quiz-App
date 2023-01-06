// Start
//////////////////////////////////////////////////////////////////////////////////////
var questions = [
    {
        question: "Commonly used data types do not include: ",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },

    {
        question: "The condition if/else satement is enclosed with: ",
        choices: ["quotes", "curly Brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
];


// Get Dom Elements

var questionsEl = document.querySelector("#question-screen");
var questionPromptEl = document.getElementById("question-prompt");
var answersEl = document.querySelector("#answers");

var quizFinishEl = document.getElementById('quiz-finish');
var finalScoreEl = document.getElementById('score-final');
var submitBtnEl = document.getElementById('submit-btn');
var nameInputEl = document.getElementById('name-input');

var startBtn = document.getElementById('start-btn');
var timerEl = document.getElementById('timer');

var highScoresBtn = document.getElementById('hiscores-btn');


// Countdown Timer Javascript componets
var timeStart = 90;
var timeRemaing;

function startTimer() {
    timerEl.textContent = timeStart + ' seconds remaining';
    timeRemaing = setInterval(countdown, 1000);
    var homeScreenEl = document.getElementById("home-screen");
    homeScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
};

function countdown() {

    timeStart--;
    timerEl.textContent = timeStart + ' seconds remaining';

    if (timeStart <= 0) {

        timerEl.textContent = 'Times Up!';
        clearInterval(timeRemaing)
    }



}

// Event Listener that waits for click to start the countdown on the quiz
startBtn.addEventListener("click", startTimer);

//////////////////////////////////////////////////////////////////////////

var startQuestionIndex = 0;

function getQuestion() {
    var currentQuestion = questions[startQuestionIndex]
    questionPromptEl.textContent = currentQuestion.question;

    answersEl.innerHTML = '';
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        // create button
        var choiceBtn = document.createElement("button");
        // add the text content to the button
        choiceBtn.textContent = currentQuestion.choices[i]
        choiceBtn.setAttribute('value', currentQuestion.choices[i])

        // add the click event to button
        choiceBtn.addEventListener("click", checkAnswer);
        // append to the html
        answersEl.append(choiceBtn);
    }
}

function checkAnswer() {
    if (this.value !== questions[startQuestionIndex].answer) {
        console.log("incorrect");
        timeStart -= 10;
        timerEl.textContent = timeStart + ' seconds remaining';
        return;
    }
    startQuestionIndex++;
    if (startQuestionIndex !== questions.length) {

        getQuestion()
    } else {
        endQuiz()
    }

}

function endQuiz() {
    clearInterval(timeRemaing);
    questionsEl.setAttribute("class", "hide");
    quizFinishEl.removeAttribute("class");
    finalScoreEl.textContent = timeStart;

}
///////////////////////////////////////////


submitBtnEl.addEventListener("click", saveHighscore);

function saveHighscore(event) {
    event.preventDefault();

    var nameText = nameInputEl.value.trim();
    if (nameText === "") {
        return;
    }
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    var userSave = {
        name: nameText,
        score: timeStart,
    }

    highscores.push(userSave);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    submitBtnEl.setAttribute("class", "hide");
    var LinkBtn = document.createElement("button");
    LinkBtn.textContent = "Click to View Highscores..";

    LinkBtn.addEventListener("click", function() {
        location = "highscores.html";
    })

    quizFinishEl.append(LinkBtn);

};

///////////////////////////////
highScoresBtn.addEventListener("click", function () {
    location ="highscores.html";
});
