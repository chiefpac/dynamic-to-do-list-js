document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage when the page loads
  loadTasks();

  // Function to load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((taskText) => {
      addTask(taskText, false); // 'false' indicates not to save again to Local Storage
    });
  }

  // Function to add a new task
  function addTask(taskText, save = true) {
    // Create a new list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create a remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Add event listener to the remove button
    removeButton.onclick = function () {
      taskList.removeChild(li);
      updateLocalStorage(); // Update Local Storage after removal
    };

    // Append the remove button to the list item
    li.appendChild(removeButton);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Save the task to Local Storage if 'save' is true
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      storedTasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Clear the input field
    taskInput.value = "";
  }

  // Function to update Local Storage after a task is removed
  function updateLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll("li").forEach((li) => {
      tasks.push(li.textContent.replace("Remove", "").trim()); // Remove the "Remove" button text
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add task when the "Add Task" button is clicked
  addButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
    } else {
      alert("Please enter a task!");
    }
  });

  // Add task when the "Enter" key is pressed
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
      } else {
        alert("Please enter a task!");
      }
    }
  });
});
