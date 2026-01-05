console.log("Todo app loaded");

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filters button');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all';

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';

  todos
    .filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    })
    .forEach((todo, index) => {
      const li = document.createElement('li');
      if (todo.completed) li.classList.add('completed');

      const span = document.createElement('span');
      span.textContent = todo.text;
      span.addEventListener('click', () => {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
      });

      const del = document.createElement('button');
      del.textContent = 'delete';
      del.className = 'delete';
      del.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });

      li.append(span, del);
      list.appendChild(li);
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  todos.push({ text: input.value.trim(), completed: false });
  input.value = '';
  saveTodos();
  renderTodos();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    renderTodos();
  });
});

renderTodos();
