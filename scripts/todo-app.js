"use strict";

const todos = getSavedTodos();

const todosDiv = document.querySelector("#todos");

const filters = {
  searchText: "",
  hideCompleted: false
};

renderTodos(todos, filters);

document.querySelector("#filter-task").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#add-todo").addEventListener("submit", e => {
  e.preventDefault();
  const newTask = {
    id: uuidv4(),
    text: e.target.elements.addNewTask.value,
    completed: false
  };
  if (e.target.elements.addNewTask.value.length > 0) {
    todos.push(newTask);
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.addNewTask.value = "";
  } else {
    alert("You have to type something");
  }
});

document.querySelector("#hide-todos").addEventListener("change", e => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
