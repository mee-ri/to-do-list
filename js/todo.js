// Checks local storage for existing username and task data
if (localStorage.getItem("Username")) {
    if (localStorage.getItem("Username") != "N/A") {
      var userName = localStorage.getItem("Username");
      document.getElementById("heading").innerHTML = userName + "'s To-Do List";
    } else {
      document.getElementById("heading").innerHTML = "My To-Do List";
    }
	
    if (localStorage.getItem("Used task numbers") == 0) {
        var localKey = 0;
    } else {
        var localKey = Number(localStorage.getItem("Used task numbers"));
    }

    var taskCounter = Number(localStorage.getItem("Task counter"));
    var s = "s";
    if (taskCounter == 0) {
        document.getElementById("counter").style.visibility = "hidden";
    } else {
        document.getElementById("counter").style.visibility = "visible";
        if (taskCounter == 1) {
            var s = "";
        }
        document.getElementById("counter").innerHTML = taskCounter + " task" + s + " left";
    }
    retrieveTasks();

// In case no previous data is found in local storage, user is asked to enter username and needed key-value pairs are set
} else {
    var userName = prompt("Hello! Please enter your name:", "");

    if (userName == "" || userName == null) {
        document.getElementById("heading").innerHTML = "My To-Do List";
        localStorage.setItem("Username", "N/A");
    } else {
        document.getElementById("heading").innerHTML = userName + "'s To-Do List";
        localStorage.setItem("Username", userName);
    }

    var localKey = 0;
    localStorage.setItem("Used task numbers", localKey);
    var taskCounter = 0;
    localStorage.setItem("Task counter", taskCounter);
    document.getElementById("counter").style.visibility = "hidden";
}

document.getElementById("date").innerHTML = newDate();

function newDate(){
    var pvm = new Date();
    return pvm.getDate() + "." + (pvm.getMonth()+1) + "." + pvm.getFullYear();
}

// Checks user inputs for empty or too short (less than 3 characters) tasks
function dataCheck() {
    let task = document.forms.myForm.task;
    let taskValue = task.value;
    let feed = document.getElementById("feedback");

    if (taskValue == "" || taskValue == null) {
        highLight(task);
        feed.innerHTML = "Please add a task";
        return false;
    } else if (taskValue.length < 3) {
        highLight(task);
        feed.innerHTML = "Please be more specific";
        return false;
    } else {
        unLight(task);
        feed.innerHTML = "";
        addTask();
        plusCounter();
        return false;
    }
}

function highLight(x) {
    x.style.borderColor = "red";
}

function unLight(x) {
    x.style.borderColor = "initial";
}

function addTask() {
    localKey++;
    localStorage.setItem("Used task numbers", localKey);

    var thisTaskKey = localKey;
    var taskValue = document.getElementById("task").value;
    localStorage.setItem(localKey, taskValue);

    // Adds user input into task list
    var taskValue = localStorage.getItem(localKey);
    var para = document.createElement("p");
    para.setAttribute("class", thisTaskKey);
    var paraText = document.createTextNode(taskValue);
    para.appendChild(paraText);
    document.getElementById("list").appendChild(para);

    // Creates Done-button
    var button1 = document.createElement("button");
    button1.setAttribute("class", thisTaskKey);
    var button1Text = document.createTextNode("Done");
    button1.appendChild(button1Text);

    // When Done-button is clicked, it crosses the task over, deletes it from local storage...
    button1.addEventListener("click", function() {
        document.getElementsByClassName(thisTaskKey)[0].style.textDecorationLine = "line-through";
        document.getElementsByClassName(thisTaskKey)[0].style.color = "lightgrey";
        localStorage.removeItem(thisTaskKey);
    });
    //...and subtracts 1 from the task counter and disables itself from being clicked again...
    button1.addEventListener("click", minusCounter);
    button1.addEventListener("click", function() {
        //...and prevents the user from making more subtractions from the task counter for the same task
        button2.removeEventListener("click", minusCounter);
    });
    button1.addEventListener("click", function() {
        button1.disabled = true;
        button1.style.backgroundColor = "lightgrey";
    });
    document.getElementById("list").appendChild(button1);

    // Creates Delete button
    var button2 = document.createElement("button");
    button2.setAttribute("class", thisTaskKey);
    var button2Text = document.createTextNode("Delete");
    button2.appendChild(button2Text);

    // When Delete button is clicked, it removes the task from the list and deletes it from the local storage...
    button2.addEventListener("click", function() {
        document.getElementsByClassName(thisTaskKey)[0].style.display = "none";
        document.getElementsByClassName(thisTaskKey)[1].style.display = "none";
        document.getElementsByClassName(thisTaskKey)[2].style.display = "none";
        localStorage.removeItem(thisTaskKey);
    });
    //...and subtracts 1 from the task counter
    button2.addEventListener("click", minusCounter);
    document.getElementById("list").appendChild(button2);

    // Clears user input from the form
    document.getElementById("task").value = "";

    document.getElementById("counter").style.visibility = "visible";
}

// When user returns to the page, stored task data is retrieved, elements are recreated and set visible
function retrieveTasks() {
    var max = Number(localStorage.getItem("Used task numbers"));

    for (var i = 1; i <= max; i++) {
        if (localStorage.getItem(i)) {
            let thisTaskKeyR = i;
            let taskValueR = localStorage.getItem(i);
            let para = document.createElement("p");
            para.setAttribute("class", thisTaskKeyR);
            let paraText = document.createTextNode(taskValueR);
            para.appendChild(paraText);
            document.getElementById("list").appendChild(para);

            let button1 = document.createElement("button");
            button1.setAttribute("class", thisTaskKeyR);
            let button1Text = document.createTextNode("Done");
            button1.appendChild(button1Text);
            button1.addEventListener("click", function() {
                document.getElementsByClassName(thisTaskKeyR)[0].style.textDecorationLine = "line-through";
                document.getElementsByClassName(thisTaskKeyR)[0].style.color = "lightgrey";
                localStorage.removeItem(thisTaskKeyR);
            });
            button1.addEventListener("click", minusCounter);
            button1.addEventListener("click", function() {
                button2.removeEventListener("click", minusCounter);
            });
            button1.addEventListener("click", function() {
                button1.disabled = true;
                button1.style.backgroundColor = "lightgrey";
            });
            document.getElementById("list").appendChild(button1);

            let button2 = document.createElement("button");
            button2.setAttribute("class", thisTaskKeyR);
            let button2Text = document.createTextNode("Delete");
            button2.appendChild(button2Text);
            button2.addEventListener("click", function() {
                document.getElementsByClassName(thisTaskKeyR)[0].style.display = "none";
                document.getElementsByClassName(thisTaskKeyR)[1].style.display = "none";
                document.getElementsByClassName(thisTaskKeyR)[2].style.display = "none";
                localStorage.removeItem(thisTaskKeyR);
            });
            button2.addEventListener("click", minusCounter);
            document.getElementById("list").appendChild(button2);
        }
    }
}

function plusCounter() {
    taskCounter++;
    var s = "s";
    if (taskCounter == 1) {
        var s = "";
    }
    document.getElementById("counter").innerHTML = taskCounter + " task" + s + " left";
    localStorage.setItem("Task counter", taskCounter);
}

function minusCounter() {
    taskCounter--;
    var s = "s";
    if (taskCounter == 0) {
        document.getElementById("counter").style.visibility = "hidden";
    } else {
        document.getElementById("counter").style.visibility = "visible";
        if (taskCounter == 1) {
            var s = "";
        }
        document.getElementById("counter").innerHTML = taskCounter + " task" + s + " left";
    }
    localStorage.setItem("Task counter", taskCounter);
}
