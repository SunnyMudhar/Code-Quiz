var questionA = {
    question: "What does \"CSS\" stand for?",
    options: ["Cascading Style Sheets", "Computer", "Cold Salmon Sandwich", "Canned"],

    checkAnswer: function() {
        return "Cascading Style Sheets";
    }
};

var questionB = {
    question: "The condition in an if / else statement is enclosed within _____",
    options: ["Parenthesis", "Quotes", "Curly brackets", "Square brackets"],

    checkAnswer: function() {
        return "Parenthesis";
    }
};

var questionC = {
    question: "Commonly used data types DO NOT include:",
    options: ["Alerts", "Strings", "Booleans", "Numbers"],

    checkAnswer: function() {
        return "Alerts";
    }
};

var questionD = {
    question: "Arrays in JavaScript can be used to store _____",
    options: ["All options", "Numbers and Strings", "Other Arrays", "Booleans"],

    checkAnswer: function() {
        return "All options";
    }
};

var questionE = {
    question: "String values must be enclosed within _____ when being assigned variables.",
    options: ["Quotes", "Curly brackets", "Parenthesis", "Square brackets"],

    checkAnswer: function() {
        return "Quotes";
    }
};

var questionArr = [questionA, questionB, questionC, questionD, questionE];
var currentQuestion;

function getQuestion() {
    if(!questionArr.length) return null;
    currentQuestion = questionArr[Math.floor(Math.random() * questionArr.length)];
    return currentQuestion;
}

function getAnswersArr() {
    var answerArr = currentQuestion.options;
    answerArr = answerArr.sort(() => Math.random() - 0.5)
    return answerArr;
}

function checkResponse(value) {
    var response;
    if(currentQuestion.checkAnswer() != value) {
        response = false;
    } else {
        response = true;
    }

    removeQuestion();
    return response;
}

function removeQuestion() {
    for(var i = 0; i < questionArr.length; i++) {
        if(questionArr[i] == currentQuestion) {
            questionArr.splice(i, 1);
        }
    }
}
