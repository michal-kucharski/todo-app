"use strict";

// Fetch exising todos from localStorage

const getSavedTodos = function() {
  const todosJSON = localStorage.getItem("todos");

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (error) {
    return [];
  }
};

// Save existing todos to localStorage

const saveTodos = function(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove todo

const removeTodo = function(id) {
  const todoIndex = todos.findIndex(function(todo) {
    return todo.id === id;
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Render app basing on filters

const renderTodos = function(todos, filters) {
  const todosFiltered = todos.filter(function(todo) {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = todosFiltered.filter(function(todo) {
    return !todo.completed;
  });

  todosDiv.innerHTML = "";

  todosDiv.appendChild(generateSummary(incompleteTodos));

  if (todosFiltered.length) {
    todosFiltered.forEach(function(todo) {
      todosDiv.appendChild(generateTodoDOM(todo));
    });
  } else {
    const emptyParagraph = document.createElement("p");
    emptyParagraph.classList.add("empty-message");
    emptyParagraph.textContent = "You have no todos left";
    todosDiv.appendChild(emptyParagraph);
  }
};

// Get DOM elements for individual note

const generateTodoDOM = todo => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const todoCheckbox = document.createElement("input");
  const todoText = document.createElement("span");
  const todoButton = document.createElement("button");

  // Setup todo checkbox

  todoCheckbox.setAttribute("type", "checkbox");
  todoCheckbox.checked = todo.completed;
  containerEl.appendChild(todoCheckbox);
  todoCheckbox.addEventListener("change", e => {
    todo.completed = e.target.checked;
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup todo text

  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container

  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup todo button

  todoButton.textContent = "remove";
  todoButton.classList.add("button", "button--text");
  todoEl.appendChild(todoButton);
  todoButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Get DOM elements for summary

const generateSummary = incompleteTodos => {
  const summary = document.createElement("h2");
  incompleteTodos.length === 1
    ? (summary.textContent = `You have ${incompleteTodos.length} thing to do`)
    : (summary.textContent = `You have ${incompleteTodos.length} things to do`);
  summary.classList.add("list-title");
  return summary;
};
