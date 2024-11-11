
class Person {
    constructor(name, grade) {
      this.name = name;
      this.grade = grade;
    }
}
class City {
    constructor(name, population, age) {
        this.name = name;
        this.population = population;
        this.age = age;
    }
}

var studentClass = [];
var citiesList = [];
var week08Timer;

const originalConsoleLog = console.log;



function onLoad()
{
    console.log("I extended the console.log function !");
    switchTopToggle();

    var darkMode = getCookie("darkMode") == "true";
    document.getElementById("darkModeSwitch").checked = darkMode ? true : false;
    document.getElementById("darkModeText").textContent = (darkMode ? "Disable":"Enable") + " DarkMode";
    
    var studentComparaisonForm = document.getElementById("studentComparaisonForm");
    function handleForm(event) { event.preventDefault(); } 
    studentComparaisonForm.addEventListener('submit', handleForm);
    
    document.getElementById("week08Example1Text").textContent = Math.random();
    var week8Example2Min = randomBetween(0,5);
    var week8Example2Max = randomBetween(5,10);
    week08Timer = Math.round(randomBetween(week8Example2Min*100, week8Example2Max*100)*100)/100;
    document.getElementById("week08Example2Title").textContent = "week08Example2: Random number between "+week8Example2Min+" and "+week8Example2Max;
    document.getElementById("week08Example2Text").textContent = week08Timer;
    document.getElementById("week08Example2Text").textContent = week08Timer;
    document.getElementById("week08Example3Title").innerHTML = "week08Example3: Timer of "+week08Timer+" milliseconds";

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

function randomBetween(min, max)
{
    var rng = Math.random();
    return (rng*(max-min) + min);
}

function week08TimedAlert()
{
    setTimeout(week08myFunction,week08Timer)
}

function week08myFunction() {

    alert('Hello after '+week08Timer+' milliseconds!!');
}

// Simplified helper function for getting elements by ID
function $(id) {
    return document.getElementById(id);
}

let totalExpenses = 0; // Variable to hold the total expenses

// Class to store each expense
class Cost {
    constructor(amount, category) {
        this.amount = parseFloat(amount);  // Convert to a number
        this.category = category;
    }
}

// Array to store expenses
let expenses = [];

function addExpense() {
    // Get and validate inputs
    const amount = parseFloat($('amount').value);
    const category = $('category').value;

    // Only proceed if the amount is a positive number and a category is selected
    if (amount > 0 && category) {
        // Create a new expense object
        const newExpense = new Cost(amount, category);
        expenses.push(newExpense);

        // Update total expenses
        totalExpenses += newExpense.amount;

        // Create a new list item for the entered expense
        const listItem = document.createElement('li');
        listItem.textContent = `Amount: $${newExpense.amount.toFixed(2)} - Category: ${newExpense.category}`;
        $('expenseList').appendChild(listItem);

        // Update the total expenses displayed
       
        $('totalExpenses').textContent = "Total Expenses:"+ totalExpenses + " ";

        // Check if total expenses exceed the limit
        //$('warning').style.display = totalExpenses > 100 ? 'block' : 'none';
        if (totalExpenses > 100) {
            document.getElementById('warning').style.display = 'block';
        } else {
            document.getElementById('warning').style.display = 'none';
        }

        // Clear the input fields
        $('expenseForm').reset();
    } else {
        alert('Please enter a valid amount and select a category.');
    }
}



function uploadCity()
{
    let name = document.getElementById("week08Example5CityName").value;
    let population = parseFloat(document.getElementById("week08Example5CityPopulation").value);
    let age = parseFloat(document.getElementById("week08Example5CityAge").value);

    studentClass.push(new Person(name, population, age));

    updatePageCity();
}

function updatePageCity()
{
    if(citiesList.length >= 3)
    {
        document.getElementById("week08Example5Form").style.display='none';
        document.getElementById("week08Example5RestultDiv").style.display='';
        searchgiggestPop();
    }
    else
    {
        document.getElementById("week08Example5SubTitle").textContent = "Enter cities information ("+(3-citiesList.length)+" left):"
        document.getElementById("week08Example5Form").reset();
        document.getElementById("CitiesDiv").style.display='';
        }
    addCity();
}


function searchgiggestPop()
{
    var biggestCity = citiesList[0];
    studentClass.forEach(element => 
    {
        if((element.age <100) && (biggestCity.population < element.population))
        {
           biggestCity = element; 
        }
    }
    );
    document.getElementById("week08Example5RestultResult").innerHTML = "Biggest city is: "+biggestCity.name+" (pop: "+biggestCity.population+", age: "+biggestCity.age;
}

function addCity()
{
    var cities = "";
    citiesList.forEach(element => 
    {
        cities += "<div class=\"classMate\">"+ element.name +"</div>"
    }
    );
    document.getElementById("cities").innerHTML = cities;
}