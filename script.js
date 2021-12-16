const inputEl = document.getElementById("input");
const btnEl = document.getElementById("btn");
const todoContainerEl = document.getElementById("todo-container");
const date = new Date();

const randomId = () => Math.floor(Math.random() * date.getTime());

const getAllTodos = () => {
  let todos = [];
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
  } else {
    todos = [];
  }

  return todos;
};

const deleteTodoOnLocalStorage = (id) => {
  let todos = getAllTodos();
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const saveTodo = (todo) => {
  const todos = getAllTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const checkTodo = (id) => {
  let todos = getAllTodos();
  const todo = document.getElementById(id);
  if (todo.classList.contains("checked")) {
    todo.classList.remove("checked");
    todo.children[0].src = "./icons/checkMarkOff.svg";
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.done = false;
        return todo;
      } else {
        return todo;
      }
    });
  } else {
    todo.classList.add("checked");
    todo.children[0].src = "./icons/checkMarkOn.svg";
    todos = todos.map((todo) => {
      if (todo.id === id) {
        todo.done = true;
        return todo;
      } else {
        return todo;
      }
    });
  }
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
};
const deleteTodo = (id) => {
  const todos = document.querySelectorAll(".todo");
  todos.forEach((todo) => {
    if (todo.id == id) {
      todoContainerEl.removeChild(todo);
      deleteTodoOnLocalStorage(id);
    }
  });
};

const createTodo = (todo, id, done) => {
  const li = document.createElement("li");
  li.className = "todo";
  li.id = id;
  if (done) li.classList.add("checked");
  const checkMark = document.createElement("img");
  checkMark.src = "./icons/checkMarkOff.svg";
  if (done) checkMark.src = "./icons/checkMarkOn.svg";
  checkMark.addEventListener("click", checkTodo.bind(this, id));
  const span = document.createElement("span");
  span.textContent = todo;
  const trash = document.createElement("img");
  trash.src = "./icons/trashOn.svg";
  trash.addEventListener("click", deleteTodo.bind(this, id));
  li.append(checkMark, span, trash);
  todoContainerEl.appendChild(li);
};

const getTodo = () => {
  const todo = inputEl.value;
  if (todo.trim() === "") return;
  inputEl.value = "";
  const id = randomId();
  createTodo(todo, id, false);
  saveTodo({ todoText: todo, id, done: false });
};

const loadContent = () => {
  const todos = getAllTodos();
  todos.forEach((todo) => createTodo(todo.todoText, todo.id, todo.done));
};

btnEl.addEventListener("click", getTodo);
inputEl.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) getTodo();
});
document.addEventListener("DOMContentLoaded", loadContent);
