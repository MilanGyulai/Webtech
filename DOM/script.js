document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('todoInput');
    const addButton = document.getElementById('addButton');
    const todoList = document.getElementById('todoList');

    addButton.addEventListener('click', function() {
        const text = input.value.trim();
        if (text) {
            addTodoItem(text);
            input.value = '';
        }
    });

    function addTodoItem(text) {
        const listItem = document.createElement('li');
        listItem.textContent = text;
        listItem.addEventListener('click', function() {
            listItem.classList.toggle('completed');
        });
        todoList.appendChild(listItem);
    }
});