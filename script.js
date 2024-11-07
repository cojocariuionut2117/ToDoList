const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(item => {
        tasks.push({ text: item.querySelector('span').innerText, completed: item.classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM(taskText, isCompleted = false) {
    const listItem = document.createElement('li');
    listItem.classList.toggle('completed', isCompleted);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = isCompleted;
    checkbox.addEventListener('change', () => {
        listItem.classList.toggle('completed');
        saveTasks();
    });

    const taskTextNode = document.createElement('span');
    taskTextNode.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(listItem);
        saveTasks();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(taskTextNode);
    listItem.appendChild(deleteBtn);

    taskList.appendChild(listItem);
}

addTaskBtn.addEventListener('click', () => {
    if (taskInput.value.trim() !== '') {
        addTaskToDOM(taskInput.value.trim());
        saveTasks();
        taskInput.value = '';
    }
});

taskInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

window.addEventListener('load', loadTasks);
