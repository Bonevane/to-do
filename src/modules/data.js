export class Todo {
    constructor(title, description, dueDate, priority, notes = "", checklist = []) {
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
      this.checklist = checklist;
      this.completed = false;
    }
  
    toggleComplete() {
      this.completed = !this.completed;
    }
  }
  
  export class Project {
    constructor(name) {
      this.name = name;
      this.todos = [];
    }
  
    addTodo(todo) {
      this.todos.push(todo);
    }
  
    deleteTodo(todoTitle) {
      this.todos = this.todos.filter(todo => todo.title !== todoTitle);
    }
  
    toggleTodoComplete(todoTitle) {
      const todo = this.todos.find(todo => todo.title === todoTitle);
      if (todo) {
        todo.toggleComplete();
      }
    }
  }
  