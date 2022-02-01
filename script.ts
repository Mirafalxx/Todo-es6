const todoForm = document.querySelector(".todo-form") as HTMLElement;
const todoInput = document.querySelector(".todo-input") as HTMLInputElement;
const todoItemsList = document.querySelector(".todo-items") as HTMLElement;

type TodoItem = {
    id: number,
    name: string,
    completed: Boolean
}

let todos = [];

todoForm.addEventListener("submit", (event): void => {
    event.preventDefault();
    addTodo(todoInput.value); // call addTodo function with input  current value
});
const addTodo = (item) => {
    if (item !== "") {
        const todo: TodoItem = {
            id: Date.now(),
            name: item,
            completed: false,
        };
        todos.push(todo);
        addToLocalStorage(todos); //  set To Localstorage TodoItem
        todoInput.value = "";
    }
}
const renderTodos = (todos): void => {
    todoItemsList.innerHTML = "";
    todos.forEach((item) => {
        const checked = item.completed ? "checked" : null;
        const li = document.createElement("li");
        li.setAttribute("class", "item");
        li.setAttribute("data-key", item.id);
        if (item.completed === true) {
            li.classList.add("checked");
        }

        li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">✖</button>
    `;
        todoItemsList.append(li);
    });
}
const addToLocalStorage = (todos): void => {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
}
const getFromLocalStorage = (): void => {
    const reference = localStorage.getItem("todos");
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
    else {
        todoItemsList.innerHTML = ` <i>The List Is Empty</i>`
    }
}
const toggleCheckBox = (id): void => {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}
const deleteTodo = (id) => {
    todos = todos.filter((item) => {
        return item.id != id;
    });
    addToLocalStorage(todos);
}

getFromLocalStorage(); //call function to get data from localstorage

todoItemsList.addEventListener("click", (event) => {
    if (event.target.type === "checkbox") {
        toggleCheckBox(event.target.parentElement.getAttribute("data-key"));
    }
    if (event.target.classList.contains("delete-button")) {
        deleteTodo(event.target.parentElement.getAttribute("data-key"));
    }
});
