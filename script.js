var todoForm = document.querySelector(".todo-form");
var todoInput = document.querySelector(".todo-input");
var todoItemsList = document.querySelector(".todo-items");
var todos = [];
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo(todoInput.value); // call addTodo function with input  current value
});
var addTodo = function (item) {
    if (item !== "") {
        var todo = {
            id: Date.now(),
            name: item,
            completed: false
        };
        todos.push(todo);
        addToLocalStorage(todos); //  set To Localstorage TodoItem
        todoInput.value = "";
    }
};
var renderTodos = function (todos) {
    todoItemsList.innerHTML = "";
    todos.forEach(function (item) {
        var checked = item.completed ? "checked" : null;
        var li = document.createElement("li");
        li.setAttribute("class", "item");
        li.setAttribute("data-key", item.id);
        if (item.completed === true) {
            li.classList.add("checked");
        }
        li.innerHTML = "\n      <input type=\"checkbox\" class=\"checkbox\" ".concat(checked, ">\n      ").concat(item.name, "\n      <button class=\"delete-button\">\u2716</button>\n    ");
        todoItemsList.append(li);
    });
};
var addToLocalStorage = function (todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
};
var getFromLocalStorage = function () {
    var reference = localStorage.getItem("todos");
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
    else {
        todoItemsList.innerHTML = " <i>The List Is Empty</i>";
    }
};
var toggleCheckBox = function (id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
};
var deleteTodo = function (id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });
    addToLocalStorage(todos);
};
getFromLocalStorage(); //call function to get data from localstorage
todoItemsList.addEventListener("click", function (event) {
    if (event.target.type === "checkbox") {
        toggleCheckBox(event.target.parentElement.getAttribute("data-key"));
    }
    if (event.target.classList.contains("delete-button")) {
        deleteTodo(event.target.parentElement.getAttribute("data-key"));
    }
});
