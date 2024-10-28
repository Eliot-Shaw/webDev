
class Person {
    constructor(name, grade) {
      this.name = name;
      this.grade = grade;
    }
}

var studentClass = [];

const originalConsoleLog = console.log;



function onLoad()
{
    console.log("I extended the console.log function !");
    switchTopToggle();

    var darkMode = getCookie("darkMode") == "true";
    document.getElementById("darkModeSwitch").checked = darkMode ? true : false;
    document.getElementById("darkModeText").textContent = (darkMode ? "Disable":"Enable") + " DarkMode";
    
    var form = document.getElementById("studentComparaisonForm");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
}



function uploadStudent()
{
    let name = document.getElementById("studentComparaisonName").value;
    let grade = parseFloat(document.getElementById("studentComparaisonGrade").value);

    studentClass.push(new Person(name, grade));

    updatePageStudentAdded();
}

function updatePageStudentAdded()
{
    if(studentClass.length >= 4)
    {
        document.getElementById("studentComparaisonForm").style.display='none';
        document.getElementById("studentComparaisonRestultDiv").style.display='';
        searchStudentClassExtremes();
    }
    else
    {
        document.getElementById("studentComparaisonTitle").textContent = "Enter information (" + (4-studentClass.length) + " left):"
        document.getElementById("studentComparaisonForm").reset();
        document.getElementById("classroomDiv").style.display='';
        }
    fillClassroom();
}

function fillClassroom()
{
    var classroomText = "";
    studentClass.forEach(element => 
    {
        classroomText += "<div class=\"classMate\">"+ element.name +"</div>"
    }
    );
    document.getElementById("classroom").innerHTML = classroomText;
}

function searchStudentClassExtremes()
{
    var bestStudent = studentClass[0];
    var worstStudent = studentClass[0];
    studentClass.forEach(element => 
    {
        if(bestStudent.grade < element.grade) bestStudent = element;
        if(worstStudent.grade >= element.grade) worstStudent = element;
    }
    );
    document.getElementById("studentComparaisonRestultResult").innerHTML = "Best student is: "+bestStudent.name+" (grade: "+bestStudent.grade+"/100)<br>Worst student is: "+worstStudent.name+" (grade:"+worstStudent.grade+"/100)";
}



    
function getCookie(cname) 
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) 
    {
        let c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}    
function setCookie(cname, cvalue) 
{
    document.cookie = cname + " = " + cvalue + ";";
}

console.log = function (... data)
{
    originalConsoleLog.apply(console, data);
    let currentText = document.getElementById("logElement").innerHTML;
    let messages = currentText.split('<br>');
    if (messages[messages.length-1] == data)
    {
        messages[messages.length-1] += " x2";
    }else if(messages[messages.length-1].slice(0, -3) == data)
    {
        messages[messages.length-1] = messages[messages.length-1].slice(0, -1) + Number(Number(messages[messages.length-1].slice(-1))+1);
    }else if(messages[messages.length-1].slice(0, -4) == data)
    {
        messages[messages.length-1] = messages[messages.length-1].slice(0, -2) + Number(Number(messages[messages.length-1].slice(-2))+1);
    }else
    {
        messages.push(data);
    }

    
    document.getElementById("logElement").innerHTML = messages.join("<br>")
}

function switchTopToggle()
{
    var topBarToggleSwitch = document.getElementById("topBarToggleSwitch").checked;
    console.log("switchTopToggle call, topBarToggleSwitch is equal to " + topBarToggleSwitch)
    if(topBarToggleSwitch == true)
    {
        document.getElementById("topBarToggleSwitchText").textContent = 'Unhide content';
        document.getElementById("topnavFish").style.display='none';
        document.getElementById("topnavCat").style.display='none';
    }else
    {
        document.getElementById("topBarToggleSwitchText").textContent = 'Hide content';
        document.getElementById("topnavFish").style.display='';
        document.getElementById("topnavCat").style.display='';
    }

}

function switchDarkMode()
{
    var darkMode = getCookie("darkMode") == "true";
    setCookie("darkMode", darkMode?"false":"true")
    console.log("darkMode is now "+ darkMode);
    window.location.reload();
    document.getElementById("darkModeText").textContent = darkMode ? "Enable DarkMode":"Disable DarkMode";
}

document.getElementById('logTimeButton').addEventListener('click', function() {
    console.log(`Current Time: ${new Date().toLocaleTimeString()}`);
});

function calculateBMI()
{
    let returnDiv = document.getElementById("calculateBMIReturndiv").innerHTML;

    let height = parseFloat(document.getElementById("BMIheight").value);
    let weight = parseFloat(document.getElementById("BMIweight").value);

    if (isNaN(height) || isNaN(weight)) {
        console.log("Please enter valid numbers for height and weight.");
        return;
    }

    if(height>2) height /= 100;
    let BMIValue = (weight / (height*height)).toPrecision(4);

    document.getElementById("calculateBMIReturndiv").innerHTML = "Your BMI is "+ BMIValue + "<br>Weight category: " + weightCategory(BMIValue); 
    console.log(returnDiv);
}

function weightCategory(BMIValue)
{
    let category = "undefined";
    switch (true) {
        case (BMIValue < 18.5):
            category = "Underweight";
            break;
        case (BMIValue < 24.9):
            category = "Healthy Weight";
            break;
        case (BMIValue < 29.9):
            category = "Overweight";
            break;
        case (BMIValue < 100):
            category = "Overweight";
            break;
        default:
            category = "Error during the categorisation";
    }
    return category;
}