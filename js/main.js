/** 
 * - Add a new todo item 
 * - Toggle the todo item if it is completed or not
 * - Delete the todo item
 * - Then always save the todo items permanetly on LocalStorage
 */



// select everthing
const addBtn = document.querySelector(".add-btn");
const todoInput = document.querySelector(".todo__form-input");
const todoList = document.querySelector(".todo__list");


//  Add event
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addTodo(todoInput.value);
});

todoList.addEventListener('click', (e) => {
  if (e.target.type == 'checkbox') {
    toggleState(e.target.parentElement.getAttribute('data-key'));
  }
  if (e.target.classList.contains('delete-btn')) {
    deleteTodo(e.target.parentElement.getAttribute('data-key'))
  }
})

// Functions
let todos = localStorage.getItem('todos');
if (todos === null) {
  todos = [];
} else {
  todos = JSON.parse(todos);
  renderTodos(todos);
}

function addTodo(item) {

  if (item !== "") {
    // make a todo object, which has id, name and completed property
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    todos.push(todo);
    saveLocalStorage(todos);

    todoInput.value = "";
  }
}

function renderTodos(items) {
  //  Clear screen
  todoList.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.setAttribute("class", "todo__list-item");
    li.setAttribute("data-key", item.id);

    if (item.completed === true) {
      li.classList.add("checked");
    }

    // check if the todo is completed
    const checked = item.completed ? "checked" : null;

    li.innerHTML = `<input id='checkbox' type="checkbox" class="checkbox" ${checked}>
                    <p class="text">${item.name}</p> 
                    <button class="btn delete-btn ">x</button>`;

    todoList.append(li);
  });
}

function toggleState(id) {
  todos.forEach(todo => {
    if (todo.id == id) {
      todo.completed = !todo.completed;
    }
  })
  saveLocalStorage(todos)
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id != id);
  saveLocalStorage(todos);
}

function saveLocalStorage(items) {
  localStorage.setItem('todos', JSON.stringify(items));
  renderTodos(items);
}