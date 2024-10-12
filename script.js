// Selectăm elementele din DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Funcție pentru a adăuga o nouă sarcină
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const listItem = document.createElement('li');

        // Creăm checkbox pentru a bifa sarcina ca realizată
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                listItem.classList.add('completed');
            } else {
                listItem.classList.remove('completed');
            }
        });

        // Adăugăm textul sarcinii
        const taskTextNode = document.createTextNode(taskText);

        // Creăm butonul de ștergere
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Șterge';
        deleteBtn.classList.add('delete');
        deleteBtn.addEventListener('click', function () {
            taskList.removeChild(listItem);
        });

        // Adăugăm checkbox, text și butonul de ștergere în list item
        listItem.appendChild(checkbox);
        listItem.appendChild(taskTextNode);
        listItem.appendChild(deleteBtn);

        // Adăugăm sarcina în lista de sarcini
        taskList.appendChild(listItem);

        // Resetăm input-ul
        taskInput.value = '';
    }
}

// Adăugăm eveniment pe butonul de adăugare
addTaskBtn.addEventListener('click', addTask);

// Permitem adăugarea sarcinii și prin apăsarea tastei Enter
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
