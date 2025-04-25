document.addEventListener('DOMContentLoaded', () => {
  const newTaskInput = document.getElementById('new-task');
  const addButton = document.getElementById('add-button');
  const taskList = document.getElementById('task-list');

  let tasks = loadTasks();
  renderTasks();

  addButton.addEventListener('click', addTask);

  function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
                <span>${task.text}</span>
                <button class="delete-button" data-index="${index}">Törlés</button>
            `;
      if (task.completed) {
        listItem.classList.add('completed');
      }

      const deleteButton = listItem.querySelector('.delete-button');
      deleteButton.addEventListener('click', deleteTask);

      listItem.addEventListener('click', toggleComplete);

      taskList.appendChild(listItem);
    });
  }

  function addTask() {
    const newTaskText = newTaskInput.value.trim();
    if (newTaskText !== '') {
      tasks.push({ text: newTaskText, completed: false });
      saveTasks();
      renderTasks();
      newTaskInput.value = '';
    }
  }

  function deleteTask(event) {
    const indexToDelete = parseInt(event.target.dataset.index);
    tasks = tasks.filter((_, index) => index !== indexToDelete);
    saveTasks();
    renderTasks();
  }

  function toggleComplete(event) {
    if (event.target.tagName === 'SPAN') {
      const listItem = event.target.parentNode;
      const indexToToggle = Array.from(taskList.children).indexOf(listItem);
      tasks[indexToToggle].completed = !tasks[indexToToggle].completed;
      saveTasks();
      renderTasks();
    }
  }
});