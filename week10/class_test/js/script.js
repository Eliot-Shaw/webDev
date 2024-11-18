function onLoad()
{
    document.getElementById("task2TableColor").style.animationPlayState = "paused";
    document.getElementById("task2TableAnimation").style.animationPlayState = "paused";

}

function task2ColorChangeButton()
{
    document.getElementById("task2TableColorOverride").style.backgroundColor = "";

    console.log("task2TableColor was = "+ document.getElementById("task2TableColor").style.animationPlayState);
    if(document.getElementById("task2TableColor").style.animationPlayState == "running")
    {
        document.getElementById("task2TableColor").style.animationPlayState = "paused";
    }
    else
    {
        document.getElementById("task2TableColor").style.animationPlayState = "running";
    }
    console.log("task2TableColor = "+ document.getElementById("task2TableColor").style.animationPlayState);
    console.log("task2TableColor = "+ document.getElementById("task2TableColor").style.animationIterationCount);
}

/**
 * getRandomColor()
 * https://stackoverflow.com/questions/1484506/random-color-generator
 */
function getRandomColor() 
{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) 
    {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function task2ColorSwitchButton()
{
    document.getElementById("task2TableColor").style.animationPlayState = "paused";
    document.getElementById("task2TableColorOverride").style.backgroundColor = getRandomColor();
}

function task2MovementChangeButton()
{
    console.log("task2TableAnimation was = "+ document.getElementById("task2TableAnimation").style.animationPlayState);
    if(document.getElementById("task2TableAnimation").style.animationPlayState == "running")
    {
        document.getElementById("task2TableAnimation").style.animationPlayState = "paused";
    }
    else
    {
        document.getElementById("task2TableAnimation").style.animationPlayState = "running";
    }
    console.log("task2TableAnimation = "+ document.getElementById("task2TableAnimation").style.animationPlayState);
}

function task3BMRCalculate()
{
    let age = parseFloat(document.getElementById("task3BMRage").value);
    let weight = parseFloat(document.getElementById("task3BMRweight").value);
    let height = parseFloat(document.getElementById("task3BMRheight").value);
    let gender = parseFloat(document.getElementById("task3BMRgender").value);

    if (isNaN(age) ||isNaN(weight) || isNaN(height)|| isNaN(gender)) {
        console.log("No data entered");
        return;
    }
    
    let BMRValue;
    if(gender == 0)
    {
        BMRValue = ( 88.362+(13.397*weight)+(4.799*height)-(5.677*age) ).toPrecision(4);
    }
    else
    {
        BMRValue = ( 447.593+(9.247*weight)+(3.098*height)-(4.330*age) ).toPrecision(4);
    }

    document.getElementById("task3BMRReturndiv").innerHTML = "Your BMR is "+ BMRValue;
}