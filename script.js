let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput").value.trim();
  const dueDate = document.getElementById("dueDateInput").value;

  if (taskInput === "") {
    alert("Task cannot be empty!");
    return;
  }

  const task = {
    id: Date.now(),
    name: taskInput,
    due: dueDate || "No Date",
    completed: false
  };

  tasks.push(task);
  document.getElementById("taskInput").value = "";
  document.getElementById("dueDateInput").value = "";
  renderTasks();
}

function toggleStatus(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function deleteAll() {
  if (confirm("Delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

function applyFilter() {
  renderTasks();
}

function applySort() {
  const sortValue = document.getElementById("sort").value;
  if (sortValue === "task") {
    tasks.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "due") {
    tasks.sort((a, b) => new Date(a.due) - new Date(b.due));
  } else if (sortValue === "status") {
    tasks.sort((a, b) => a.completed - b.completed);
  }
  renderTasks();
}

function renderTasks() {
  const tbody = document.getElementById("taskBody");
  tbody.innerHTML = "";

  const filterValue = document.getElementById("filter").value;
  let filteredTasks = tasks;

  if (filterValue === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filterValue === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach(task => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="${task.completed ? "completed" : ""}">${task.name}</td>
      <td>${task.due}</td>
      <td>
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleStatus(${task.id})">
      </td>
      <td>
        <button class="deleteBtn" onclick="deleteTask(${task.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const progress = total ? Math.round((completed / total) * 100) : 0;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;
  document.getElementById("progressPercent").textContent = progress + "%";
}
