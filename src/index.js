// main.js
import { Project, Todo } from './modules/data.js';
import { renderProjectList, renderTodoList, setCurrentProjectTitle } from './modules/ui.js';
import { loadData, saveData } from './modules/storage.js';
import "./styles.css";

let projects = loadData() || [];
if (projects.length === 0) {
  // Create default project if none exists
  const defaultProject = new Project('Default');
  projects.push(defaultProject);
  saveData(projects);
}

let currentProject = projects[0];

function updateUI() {
  renderProjectList(projects, handleProjectSelection);
  renderTodoList(currentProject.todos, handleTodoDelete, handleTodoEdit);
  setCurrentProjectTitle(currentProject.name);
}

function handleProjectSelection(projectName) {
  currentProject = projects.find(p => p.name === projectName);
  updateUI();
}

function handleTodoDelete(todoTitle) {
  currentProject.deleteTodo(todoTitle);
  saveData(projects);
  updateUI();
}

// --- Edit Todo Modal Functionality ---

// These variables will reference the edit modal and its form.
const editTodoModal = document.getElementById('edit-todo-modal');
const closeEditTodoModalBtn = document.getElementById('close-edit-todo-modal');
const editTodoForm = document.getElementById('edit-todo-form');

// When an edit button is clicked, open the edit modal with the todo’s data.
// We pass both the todo object and its index within the current project.
function handleTodoEdit(todo, index) {
  editTodoForm.todoIndex.value = index;
  editTodoForm.title.value = todo.title;
  editTodoForm.description.value = todo.description;
  editTodoForm.dueDate.value = todo.dueDate;
  editTodoForm.priority.value = todo.priority;
  editTodoModal.style.display = 'block';
}

editTodoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const index = editTodoForm.todoIndex.value;

  // Update the todo at the given index with the new values.
  const updatedTodo = currentProject.todos[index];
  updatedTodo.title = editTodoForm.title.value;
  updatedTodo.description = editTodoForm.description.value;
  updatedTodo.dueDate = editTodoForm.dueDate.value;
  updatedTodo.priority = editTodoForm.priority.value;

  saveData(projects);
  updateUI();
  editTodoModal.style.display = 'none';
});

closeEditTodoModalBtn.addEventListener('click', () => {
  editTodoModal.style.display = 'none';
});


const projectModal = document.getElementById('project-modal');
const openProjectModalBtn = document.getElementById('open-project-modal');
const closeProjectModalBtn = document.getElementById('close-project-modal');


const todoModal = document.getElementById('todo-modal');
const openTodoModalBtn = document.getElementById('open-todo-modal');
const closeTodoModalBtn = document.getElementById('close-todo-modal');


openProjectModalBtn.addEventListener('click', () => {
  projectModal.style.display = 'block';
});
openTodoModalBtn.addEventListener('click', () => {
  todoModal.style.display = 'block';
});


closeProjectModalBtn.addEventListener('click', () => {
  projectModal.style.display = 'none';
});
closeTodoModalBtn.addEventListener('click', () => {
  todoModal.style.display = 'none';
});


window.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    projectModal.style.display = 'none';
  }
  if (e.target === todoModal) {
    todoModal.style.display = 'none';
  }
  if (e.target === editTodoModal) {
    editTodoModal.style.display = 'none';
  }
});


document.getElementById('add-todo-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const title = form.title.value;
  const description = form.description.value;
  const dueDate = form.dueDate.value;
  const priority = form.priority.value;
  const newTodo = new Todo(title, description, dueDate, priority);
  currentProject.addTodo(newTodo);
  form.reset();
  todoModal.style.display = 'none';
  saveData(projects);
  updateUI();
});


document.getElementById('add-project-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const projectName = form.projectName.value;

  if (projects.find(p => p.name === projectName)) {
    alert("Project already exists!");
    return;
  }

  const newProject = new Project(projectName);
  projects.push(newProject);
  form.reset();
  projectModal.style.display = 'none';
  saveData(projects);
  updateUI();
});


updateUI();
