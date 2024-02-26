var startBtn = document.querySelector("#start");
var startCanvas = document.querySelector("#start-screen");
var questionCanvas = document.querySelector("#questions");
var questionTitle = document.querySelector("#question-title");
var questionChoices = document.querySelector("#choices");
var feedback = document.querySelector("#feedback");
var endScreenCanvas = document.querySelector("#end-screen");
var timeElement = document.querySelector("#time");
var submitBtn = document.querySelector("#submit");
var initialsInput = document.querySelector("#initials");

var soundCorrect = new Audio("./assets/sfx/correct.wav");
var soundIncorrect = new Audio("./assets/sfx/incorrect.wav");
var currentScore = 0;
var timeLeft = 40;

if (startCanvas) {
  startBtn.addEventListener("click", function (event) {
    startCanvas.setAttribute("class", "hide");
    questionCanvas.setAttribute("class", "show");
    setTime();
    setUpQuestionCanvas();
  });
}

function setUpQuestionCanvas() {

  questionChoices.innerHTML = "";

  var currentQuestion = getQuestion();

  if (currentQuestion === null) {
    setUpEndScreenCanvas();
    return;
  }

  var answers = getAnswersArr();

  questionTitle.textContent = currentQuestion.question;

  for (var i = 0; i < answers.length; i++) {
    var ansBtn = document.createElement("button");
    ansBtn.setAttribute("id", "answerBtn");
    ansBtn.setAttribute("data-index", answers[i]);
    ansBtn.textContent = i + 1 + ". " + ansBtn.getAttribute("data-index");
    questionChoices.appendChild(ansBtn);
  }
}

function setUpEndScreenCanvas() {
  timeElement.textContent = "";
  questionCanvas.setAttribute("class", "hide");
  feedback.setAttribute("class", "feedback hide");
  endScreenCanvas.setAttribute("class", "show");

  var scoreSpan = document.querySelector("#final-score");
  scoreSpan.textContent = currentScore;
}

if (questionChoices) {
  feedback.setAttribute("class", "feedback show");

  questionChoices.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button") === true) {
      if (checkResponse(element.getAttribute("data-index"))) {
        currentScore++;
        feedback.textContent = "Correct!";
        soundCorrect.play();
      } else {
        feedback.textContent = "Wrong!";
        soundIncorrect.play();
        timeLeft -= 10;
      }

      setUpQuestionCanvas();
    }
  });
}

if (endScreenCanvas) {
  submitBtn.addEventListener("click", function (event) {
    if (initialsInput.value.length > 3) {
      alert("Initials can only be a max of 3 characters!");
    } else if (initialsInput.value == "") {
      alert("Please input your initials!");
    } else {
      setScores(initialsInput.value, currentScore);
      initialsInput.value === "";
      window.location.href = "highscores.html";
    }
  });
}

function setTime() {
  var timerInterval = setInterval(function () {
    if (endScreenCanvas.getAttribute("class") === "show") {
      clearInterval(timerInterval);
      return;
    }
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft === 0) {
      setUpEndScreenCanvas();
    }
  }, 1000);
}
