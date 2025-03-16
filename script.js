const input = document.getElementById("myInput");
const button = document.getElementById("myBtn");
const textContainer = document.querySelector(".text-container");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

displayTasks();

button.addEventListener("click", () => {
  const taskText = input.value.trim();

  if (taskText !== "") {
    tasks.push({ text: taskText, completed: false });
    input.value = "";
    saveTasks();
    displayTasks();
  }
});

function displayTasks() {
  textContainer.innerHTML = "";
  const ul = document.createElement("ul");
  ul.style.listStyleType = "none";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.style.margin = "10px 0";

    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = task.completed
      ? '<i class="fas fa-circle-check"></i>'
      : '<i class="fas fa-circle"></i>';
    checkBtn.style.background = "none";
    checkBtn.style.border = "none";
    checkBtn.style.color = task.completed ? "#00008B" : "#fff";
    checkBtn.style.cursor = "pointer";
    checkBtn.style.marginRight = "10px";

    checkBtn.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      displayTasks();
    });

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task.text;
    taskSpan.style.marginRight = "10px";
    taskSpan.style.color = "#fff";
    if (task.completed) {
      taskSpan.style.textDecoration = "line-through";
      taskSpan.style.color = "#aaa";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.style.background = "none";
    deleteBtn.style.border = "none";
    deleteBtn.style.color = "#fff";
    deleteBtn.style.cursor = "pointer";

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      displayTasks();
    });

    li.appendChild(checkBtn);
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
  textContainer.appendChild(ul);
}

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    button.click();
  }
});
