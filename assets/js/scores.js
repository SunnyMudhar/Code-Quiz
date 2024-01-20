var playerScore = {
    player: "",
    score: 0
};

var scoresArr = [];

if (document.URL.includes("highscores.html")) {
    var scoreCanvas = document.querySelector("#highscores");
    var clearScoresBtn = document.querySelector("#clear");

    clearScoresBtn.addEventListener("click", function(event) {
        clearHighScores();
    });

    printScores();
}

function setScores(player, score) {
    playerScore.player = player;
    playerScore.score = score;
    scoresArr.push(playerScore);
    saveScores();
    clearScoresObj();
}

function saveScores() {
    localStorage.setItem("scores", JSON.stringify(scoresArr));
}

function retrieveScores() {
    if (!JSON.parse(localStorage.getItem("scores"))) saveScores();
    scoresArr = JSON.parse(localStorage.getItem("scores"));
}

function clearScoresObj() {
    playerScore.player = "";
    playerScore.score = 0;
}

function printScores() {
    retrieveScores();
    scoresArr.forEach(element => {
        var li = document.createElement("li");
        li.textContent = "Name: " + element.player + " Score: " + element.score;
        scoreCanvas.appendChild(li);        
    });
}

function clearHighScores() {
    localStorage.removeItem("scores");
    window.location.reload();
}

function goBack() {
    window.location.href = "index.html";
}