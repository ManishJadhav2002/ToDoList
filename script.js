// Load tasks from localStorage on page load
window.onload = function() {
    loadTasks();
};

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskInput.value}</span>
        <button onclick="removeTask(this)">Delete</button>
    `;

    li.onclick = function() {
        this.classList.toggle('completed');
        saveTasks();
    };

    taskList.appendChild(li);
    taskInput.value = "";

    saveTasks();
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="removeTask(this)">Delete</button>
        `;
        if (task.completed) li.classList.add('completed');
        li.onclick = function() {
            this.classList.toggle('completed');
            saveTasks();
        };
        taskList.appendChild(li);
    });
}
