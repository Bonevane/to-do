import { Project, Todo } from './data.js';

export function saveData(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
}

export function loadData() {
  const data = localStorage.getItem('projects');
  if (!data) return null;
  const rawProjects = JSON.parse(data);

  return rawProjects.map(projectObj => {
    const project = new Project(projectObj.name);
    project.todos = projectObj.todos.map(todoObj => {
      const todo = new Todo(
        todoObj.title,
        todoObj.description,
        todoObj.dueDate,
        todoObj.priority,
        todoObj.notes,
        todoObj.checklist
      );
      todo.completed = todoObj.completed;
      return todo;
    });
    return project;
  });
}
