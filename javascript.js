{
    let tasks = []; 
    let hideDoneTasks = false;

    const removeTask = (taskIndex) => {
        tasks = [
                ...tasks.slice(0, taskIndex),
                ...tasks.slice(taskIndex +1),
        ];
        render();
    };
    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ];
        render();
    };
    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], done: !tasks[taskIndex].done, },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };
    const toggleAllTaskDone = () => {
        tasks = tasks.map((task) => ({
                ...task,
                done: true,
            }));
        render();
    };
    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };
    const renderTasks = () => {
        let tasksListHTMLConetent = "";
        for (const task of tasks) {
        tasksListHTMLConetent += `
        <li class="list__newTask ${task.done && hideDoneTasks ? "list__newTask--hidden": ""}">
         <button class="js-done list__buttons list__buttons--done">${task.done ? "✓" : ""}</button>
         <span class="list__item--content ${task.done ? "list__item--content--done" : ""}">
         ${task.content}</span>
         <button class="js-remove list__buttons list__buttons--remove">🗑</button>
        </li>
         `
        }
        document.querySelector(".js-tasks").innerHTML = tasksListHTMLConetent;
    };
    
    const bindToggleDoneEvents = () => { 
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, Index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(Index);
            });
        });
    };
    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, Index) => {
            removeButton.addEventListener("click", () => {
                removeTask(Index);
            });
        });
    };
    const resetInput = (inputElement) => {
        inputElement.value = ""
        inputElement.focus()
    } 
    const renderButtons = () => { 
        const actionButtons = document.querySelector(".js-buttons");
        if (tasks.length ===0) {
            actionButtons.innerHTML = "";
            return;
        };
        actionButtons.innerHTML = `
        <button class="list__actionButton js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone </button>
        <button class="list__actionButton list__actionButton--disabled js-toggleAllTaskDone"
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>
          Ukończ wszystkie</button>
        `;
    };
    const BindButtonsEvents = () => {
        const hideDoneTask = document.querySelector(".js-toggleHideDoneTasks");
        if (hideDoneTask) {
            hideDoneTask.addEventListener("click", toggleHideDoneTasks);
        };
        const completeAllDoneTask = document.querySelector(".js-toggleAllTaskDone");
        if (completeAllDoneTask) {
            completeAllDoneTask.addEventListener("click", toggleAllTaskDone);
        };
    };
    const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
    });
    const render = () => {
        renderButtons();
        renderTasks();  
        BindButtonsEvents(); 
        bindToggleDoneEvents();
        bindEvents(); 
    };
    const onFormSubmit = (event) => {
        event.preventDefault();
        const inputElement = document.querySelector(".js-newTask")
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
        };
        resetInput(inputElement);
    };
    const init = () => {
        render();
        const form = document.querySelector(".js-formadd");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}