import { format } from 'date-fns';

export function renderProjectList(projects, onProjectClick) {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projects.forEach(project => {
      const projectEl = document.createElement('div');
      projectEl.textContent = project.name;
      projectEl.classList.add('project-item');
      projectEl.addEventListener('click', () => onProjectClick(project.name));
      projectList.appendChild(projectEl);
    });
  }
  
  export function renderTodoList(todos, onDelete, onEdit) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
      const todoEl = document.createElement('div');
      todoEl.classList.add('todo-item');
  
      const header = document.createElement('div');
      header.classList.add('todo-header');
  
      const titleEl = document.createElement('h3');
      const headerDiv = document.createElement('div');
      const priorityDiv = document.createElement('div');
      titleEl.textContent = todo.title;
      header.appendChild(titleEl);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onDelete(todo.title);
      });
      headerDiv.appendChild(deleteBtn);
  
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit Todo';
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        onEdit(todo, index);
      });
      headerDiv.appendChild(editBtn);

      headerDiv.classList.add('date-priority');
      header.append(headerDiv);
      todoEl.appendChild(header);
        
  
      if (todo.description) {
        const descEl = document.createElement('p');
        descEl.textContent = todo.description;
        todoEl.appendChild(descEl);
      }
  
      if (todo.priority) {
        const priorityBadge = document.createElement('span');
        priorityBadge.textContent = todo.priority;
        priorityBadge.classList.add('priority-badge');

        if (todo.priority.toLowerCase() === 'low') {
          priorityBadge.style.backgroundColor = 'green';
        } else if (todo.priority.toLowerCase() === 'medium') {
          priorityBadge.style.backgroundColor = 'orange';
        } else if (todo.priority.toLowerCase() === 'high') {
          priorityBadge.style.backgroundColor = 'red';
        } else {
          priorityBadge.style.backgroundColor = 'gray';
        }
        priorityDiv.appendChild(priorityBadge);
      }

      
      if (todo.dueDate) {
        const dueDateEl = document.createElement('p');
        try {
          dueDateEl.textContent = format(new Date(todo.dueDate), 'MMM do, yyyy');
        } catch (error) {
          dueDateEl.textContent = todo.dueDate;
        }
        priorityDiv.appendChild(dueDateEl);
      }
      
      priorityDiv.classList.add('priority-div');
      todoEl.appendChild(priorityDiv);

      todoList.appendChild(todoEl);
    });
  }
  
  export function setCurrentProjectTitle(name) {
    const titleEl = document.getElementById('current-project-title');
    titleEl.textContent = name;
  }