var startBtn = "";
var questionElement = "";
var choicesListElement = "";
var statusElement = "";
var timeElement = "";

var secondsLeft = 20;
var timer = "";
var questionIndex = 0;
var score = 0;

var wholeQuiz = [
    {
        countryFlag : "Its capital is Cairo?",
        choices : ["Egypt", "Sudan", "Syria"],
        answer : "Egypt" 
    },
    {
        countryFlag : "Its capital is Sanaa?",
        choices : ["Saudi Arabia", "Kuwait", "Yemen"],
        answer : "Yemen" 
    },
    {
        countryFlag : "Its capital is Doha?",
        choices : ["Qatar", "Emirates", "Bahrain"],
        answer : "Qatar" 
    }

];

init();


function startQuiz(){
    // remove start Button
    startBtn.parentNode.removeChild(startBtn);

    startTimer();
    displayquestion();
    
}

function displayquestion(){

if (questionIndex>=wholeQuiz.length){
    return;
}
questionElement.textContent = wholeQuiz[questionIndex].countryFlag;

choicesListElement.replaceChildren("");
for(i=0; i<wholeQuiz[questionIndex].choices.length; i++){
    var choiceItemList = document.createElement("button");
    choiceItemList.innerText = wholeQuiz[questionIndex].choices[i] 
    choicesListElement.append(choiceItemList);
}

}

function startTimer(){
    timer = setInterval(function(){
        document.getElementById("timeElementId").textContent = secondsLeft + " seconds remaining"
        secondsLeft--;

        if(secondsLeft==0){
            displayScore();
        }
        
    }, 1000);
}

function answerSelected(targetButton){
    var answer = targetButton.innerText;
    var correctAnswer = wholeQuiz[questionIndex].answer;

    //1. update the status to show correct or wrong answer
    updateStatusElement(answer == correctAnswer);
     
    //2- increment the score if correct answer or decrement the timer if wrong answer
   if
   (answer == correctAnswer){
    score ++;
   }else{
    secondsLeft -=5;
   }
     
   //3. display the next question and if it is the last question then display the score
   questionIndex++;

        if(questionIndex == wholeQuiz.length ){
            displayScore();
        }else{
            displayquestion();
        }    
}

function updateStatusElement(status){
    if(status){
        statusElement.innerText = "Correct Answer";
    }else{
        statusElement.innerText = "Wrong Answer";
    }
}

function displayScore(){
    //remove the last displayed question
    var  questionContainerElement = document.querySelector("#questionContainer");
    questionContainerElement.parentNode.removeChild(questionContainerElement);
    
    //remove the timer
    timeElement.parentNode.removeChild(timeElement);
    clearInterval(timer);

    //display the score 
    var scoreElement = document.createElement("h1");
    scoreElement.innerText = "Your Final score is: " + score;
    document.body.appendChild(scoreElement);

    //display save form
    displaySaveMyScoreForm();
  

}

function displaySaveMyScoreForm(){
    var formContainer = document.createElement("section");
    var nameInput = document.createElement("input");
    nameInput.id = "inputElementId";
    nameInput.defaultValue = "Enter your Initials"
    var saveBtn = document.createElement("button");
    saveBtn.innerText = "Save My Score";
    saveBtn.addEventListener('click', function(){
        handleSaveAction();
       
    });
    formContainer.appendChild(nameInput);
    formContainer.appendChild(saveBtn);
    document.body.appendChild(formContainer);
}

function handleSaveAction(){
    var inputNameValue = document.getElementById("inputElementId").value.trim();
    if(inputNameValue == ("Enter your Initials" || "" ) ){
        alert("Enter valid name initials");
        return;
    }
    saveScore(inputNameValue);
    displayAllScores(inputNameValue);
    score=0;   
    
}

function saveScore(inputNameValue){
    //save the highest score for the user
    var oldScore = localStorage.getItem(inputNameValue);
    if( oldScore == null || score > oldScore){
        localStorage.setItem(inputNameValue, score);    
    }
       
}

function clearScore(inputNameValue){
    localStorage.removeItem(inputNameValue);
    document.body.removeChild(document.querySelector("h1"));
    


}

function displayAllScores(name){
    document.body.replaceChildren("");
     
    //display the current store
    var currentScoreElement = document.createElement("h1");
    currentScoreElement.innerText = "The current score is: " + score;

    var highestScoreElement = document.createElement("h1");
    highestScoreElement.innerText = "the highest score for " + name + " is: " + localStorage.getItem(name);   

    var goBackButton = document.createElement("button");
    goBackButton.id = "goBackBtnId";
    goBackButton.innerText = " Go Back";
    goBackButton.addEventListener("click", init);
    document.body.appendChild(highestScoreElement);
    document.body.appendChild(currentScoreElement);
    document.body.appendChild(goBackButton);

    var clearScoreButton = document.createElement("button");
    clearScoreButton.id = "clearScoreBtnId";
    clearScoreButton.innerText = "Clear My Score";
    clearScoreButton.addEventListener("click", function (event){
        clearScore(name);
        event.target.disabled = true;
    });
    document.body.appendChild(clearScoreButton);

}

function init(){
    questionIndex = 0;
    score = 0;
    secondsLeft = 20;

    //remove the old elements
    document.body.replaceChildren("");

    //add header
    var headerElement = document.createElement("h1");
    headerElement.innerText = " Guess the Country";
    document.body.appendChild(headerElement);

    //add start quiz button
    startBtn = document.createElement("button");
    startBtn.innerText = "Start Quiz";
    startBtn.id = "startBtnId";
    startBtn.addEventListener('click', startQuiz);
    document.body.appendChild(startBtn);
   
    //add section to contains the questions, the choices, and the status
    var questionContainer = document.createElement("section");
    questionContainer.id = "questionContainer";
    
    questionElement = document.createElement("section");
    questionElement.id= "questionElement";

    questionContainer.appendChild(questionElement);

    choicesListElement = document.createElement("section");
    choicesListElement.id = "choicesElement";
    choicesListElement.className = "choicesElement";
    choicesListElement.addEventListener("click", function(event){
        answerSelected(event.target);
    });
    questionContainer.appendChild(choicesListElement);

    statusElement = document.createElement("section");
    statusElement.id = "statusElement";
    questionContainer.appendChild(statusElement);


    document.body.appendChild(questionContainer);

    //append the timer section
    timeElement = document.createElement("section");
    timeElement.id = "timeElementId";

    document.body.appendChild(timeElement);

    
}