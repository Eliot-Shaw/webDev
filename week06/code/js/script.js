const originalConsoleLog = console.log;

function onLoad()
{
    console.log("I extended the console.log function !");
    switchTopToggle();
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