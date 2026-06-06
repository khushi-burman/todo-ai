// Targets for our HTML elements
const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');

// The base backend URL endpoint you built in Spring Boot
const API_URL = 'http://localhost:8080/api/tasks';

// 🔄 1. FETCH TASKS (GET request)
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        
        // Clear out the HTML list wrapper before adding updated items
        taskList.innerHTML = '';
        
        // Loop through each task object returned from Spring Boot
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.title}</span>
                <small style="color: ${task.completed ? '#4ade80' : '#94a3b8'}">
                    ${task.completed ? '✓ Done' : 'Pending'}
                </small>
            `;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching tasks from server:', error);
    }
}

// 🚀 2. ADD A NEW TASK (POST request)
async function addTask() {
    const titleText = taskInput.value.trim();
    if (!titleText) return; // Prevent empty tasks

    const newTaskPayload = {
        title: titleText,
        completed: false
    };

    try {
        // This browser call completely replaces curl.exe and ReqBin!
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTaskPayload)
        });

        if (response.ok) {
            taskInput.value = ''; // Clear the text entry box
            fetchTasks(); // Re-fetch the updated list from your database!
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
}

// 🔌 Event Listeners to handle user interaction clicks
addBtn.addEventListener('click', addTask);

// Also submit the task if the user hits the "Enter" key inside the input box
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Run this function immediately when the webpage first loads up
fetchTasks();