  // Función para cargar tareas desde el LocalStorage
  function loadTasks() {
    const columns = ['to-do', 'doing', 'done', 'trash'];
    columns.forEach(column => {
        const savedTasks = JSON.parse(localStorage.getItem(column)) || [];
        const columnElement = document.getElementById(column);

        savedTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            taskItem.innerHTML = `<p>${task}</p>`;
            columnElement.appendChild(taskItem);
        });
    });
}

// Función para guardar todas las tareas en LocalStorage
function saveTasks() {
    const columns = ['to-do', 'doing', 'done', 'trash'];
    columns.forEach(column => {
        const tasks = Array.from(document.getElementById(column).children).map(task => task.innerText);
        localStorage.setItem(column, JSON.stringify(tasks));
    });
}

// Inicializa Dragula para hacer "drag and drop"
dragula([
    document.getElementById("to-do"),
    document.getElementById("doing"),
    document.getElementById("done"),
    document.getElementById("trash")
])
.on("drag", function (el) {
    el.classList.remove("ex-moved");
})
.on("drop", function (el) {
    el.classList.add("ex-moved");
    saveTasks(); // Guarda las tareas después de moverlas
})
.on("over", function (el, container) {
    container.classList.add("ex-over");
})
.on("out", function (el, container) {
    container.classList.remove("ex-over");
});

// Función para añadir una nueva tarea
function addTask() {
    var inputTask = document.getElementById("taskText").value;

    if (inputTask.trim() !== "") {
        var taskItem = document.createElement("li");
        taskItem.className = 'task';
        taskItem.innerHTML = "<p>" + inputTask + "</p>";

        document.getElementById("to-do").appendChild(taskItem);

        // Limpiar el campo de entrada después de añadir la tarea
        document.getElementById("taskText").value = "";

        saveTasks(); // Guarda la nueva tarea
    }
}

// Función para vaciar la columna de "Trash"
function emptyTrash() {
    document.getElementById("trash").innerHTML = "";
    saveTasks(); // Guarda los cambios después de vaciar la columna
}

// Carga las tareas cuando la página se carga
window.onload = function() {
    loadTasks();
};