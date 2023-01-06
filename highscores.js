// Start

var olEl = document.getElementById('highscores-list');
var homescreenBtnEl = document.getElementById('homescreen-btn');

homescreenBtnEl.addEventListener("click", function() {
    location = "index.html";
});

function printHighScores () {
    var highscores = JSON.parse(window.localStorage.getItem("highscores"));
    console.log(highscores);
    console.log(highscores[0].name);
    for (var i = 0; i < highscores.length; i++) {
        var liItem = document.createElement("li");
        liItem.textContent = "Name: " + highscores[i].name + " - Score: " + highscores[i].score;
        olEl.append(liItem);
    };
};

printHighScores();


