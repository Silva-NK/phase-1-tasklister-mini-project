document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    let taskText = e.target["new-task-description"].value;
    let user = document.getElementById("user").value;
    let duration = document.getElementById("duration").value;
    let dueDate = document.getElementById("due-date").value;
    let priority = document.getElementById("priority").value;

    if (taskText.trim() !== "") {
      handleList(taskText, user, duration, dueDate, priority);
      e.target.reset();
    }
  });
});

function handleList(task, user, duration, dueDate, priority) {
  let li = document.createElement('li');
  let taskInfo = document.createElement('span');
  let deleteBtn = document.createElement('button');
  let editBtn = document.createElement('button');
  let checkbox = document.createElement('input');

  taskInfo.textContent = `${task} (Assigned to: ${user}, Duration: ${duration} hrs, Due: ${dueDate})`;
  setPriorityColor(taskInfo, priority);

  checkbox.type = "checkbox";
  checkbox.style.marginRight = "8px";
  checkbox.addEventListener("change", () => {
    taskInfo.style.textDecoration = checkbox.checked ? "line-through" : "none";
    taskInfo.style.color = checkbox.checked ? "gray" : getPriorityColor(priority);
  });

  if (priority === "high") {
    taskInfo.style.color = "red";
  } else if (priority === "medium") {
    taskInfo.style.color = "orange";
  } else {
    taskInfo.style.color = "green";
  }

  deleteBtn.textContent = '❌';
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener('click', () => {
    li.remove();
  });

  editBtn.textContent = '✏️';
  editBtn.style.marginLeft = "5px";
  editBtn.addEventListener("click", () => editTask(taskInfo));


  li.appendChild(checkbox);
  li.appendChild(taskInfo);;
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);


  document.querySelector("#tasks").appendChild(li);

  sortTasks();
}

function setPriorityColor(element, priority) {
  element.style.color = getPriorityColor(priority);
}

function getPriorityColor(priority) {
  return priority === "high" ? "red" : priority === "medium" ? "orange" : "green";
}

function editTask(taskInfo) {
  let newText = prompt("Edit your task:", taskInfo.textContent.split(" (")[0]);
  if (newText) {
    taskInfo.textContent = newText + taskInfo.textContent.substring(taskInfo.textContent.indexOf(" ("));
  }
}

function sortTasks() {
  let tasksList = document.querySelector("#tasks");
  let tasks = Array.from(tasksList.children);

  tasks.sort((a, b) => {
    let priorityOrder = { "red": 1, "orange": 2, "green": 3 };
    return priorityOrder[a.firstChild.style.color] - priorityOrder[b.firstChild.style.color];
  });

  tasks.forEach(task => tasksList.appendChild(task));
}
