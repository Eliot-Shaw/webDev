var ArrayTaskList = [];
var colorMap = new Map();
colorMap.set('low', 'green');
colorMap.set('medium', 'yellow');
colorMap.set('high', 'red');

class Task {
    constructor(data, priority, deadline) {
        this.data = data;
        this.priority = priority;
        this.deadline = deadline;
    }
}

$(document).ready(function () {

    $("#week09ex1NewTaskButton").on("click", function () {
        var data = $("#week09ex1NewTaskInput").val();
        if (data == "") return;
        $('#week09ex1NewTaskInput').focus();
        $("#week09ex1NewTaskInput").val("");
        
        var priority = $("#week09ex1NewTaskPriority").val();
        var deadline = $("#week09ex1NewTaskDeadLine").val();
        if(deadline == "") deadline = "0000-00-00"
        
        
        $("#week09ex1TaskList").empty();
        ArrayTaskList.push(new Task(data, priority, deadline))
        ArrayTaskList.forEach(element => {
            $("#week09ex1TaskList").append("<li deadline=\""+element.deadline+"\" style=\"color:"+colorMap.get(element.priority)+"\"><input type=\"checkbox\"> " + element.data + "</li>\n");
        });

        console.log("deadline "+deadline)
        
    });

    // Sort By Priority
    $("#sortByPriority").click(function(){
        ArrayTaskList.sort(function(a, b){
            var priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        console.log(ArrayTaskList)
        $.each(ArrayTaskList, function(index, task){
            $("#taskList").append(task);
        });
    });

    $("#week09ex1RemoveTaskButton").on("click", function () {
        $("#week09ex1TaskList li").each(function (index) {
            for (const child of $("#week09ex1TaskList li")[index].children) {
                if(child.checked)
                {
                    this.style.textDecoration = "line-through";
                }
              }
        });
        console.log("done")
    });

});