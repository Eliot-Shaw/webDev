var quizEndTime = 0;
var quizStartTime = 0;
var timeLeft = 0.2;

function onLoad()
{  
    
    var quizForm = document.getElementById("quizForm");
    function handleForm(event) { event.preventDefault(); } 
    quizForm.addEventListener('submit', handleForm);
}

var x = setInterval(function()
{
    if (quizEndTime == 0) {
        document.getElementById("quizTimer").innerHTML = "NOT STARTED";
        return; 
      }
    timeLeft = quizEndTime - new Date().getTime();
    
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("quizTimer").innerHTML = "TIME LEFT: " +hours + "h "+ minutes + "m " + seconds + "s ";

    if(timeLeft<10000) document.getElementById("quizTimer").style.backgroundColor = "red";

    if (timeLeft < 0) {
        quizValidate()
        document.getElementById("quizForm").style.display = "none"
        clearInterval(x);
        document.getElementById("quizTimer").innerHTML = "EXPIRED";
      }
}, 10)

function quizBegin()
{
    document.getElementById("quizBeginDiv").style.display = "none"
    document.getElementById("quizForm").style.display = ""

    quizStartTime = new Date().getTime();
    quizEndTime = new Date(new Date().getTime() + timeLeft*60000);
}

function quizValidate()
{
    if(quizStartTime == 0)
    {
        alert('Start the quiz timer !!!')
        return;
    }
    if(!document.getElementById("nocheat").checked)
    {
        alert('Must validate the agreement')
        return;
    }
    quizClalculate();
    document.getElementById("quizValidateButton").style.display = "none"

}

function quizClalculate()
{
    var score = 0;
    question1 = document.querySelector('input[name="question1"]:checked');
    if(question1 != null)
    {
        if(question1.value == "option1") score++;
    }
    var question2 = document.querySelector('input[name="question2"]:checked');
    if(question2 != null)
    {
        if(question2.value == "option2") score++;
    }
    var question3 = document.querySelector('input[name="question3"]:checked');
    if(question3 != null)
    {
        if(question3.value == "option3") score++;
    }
    var question4 = document.querySelector('input[name="question4"]:checked');
    if(question4 != null)
    {
        if(question4.value == "option4") score++;
    }

    document.getElementById("quizResult").style.display = "";
    document.getElementById("quizResultText").textContent = "Your score is : "+score+"/4";

}