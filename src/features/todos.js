import { combineReducers } from 'redux';
import { mac, mat, makeFetchingReducer, makeSetReducer } from './utils';

const asyncTodos = mat('todos');

export const setComplete = mac('todo/complete', 'payload');
export const setFilter = mac('filter/set', 'payload');

export const filterReducer = makeSetReducer(['filter/set']);

export const fetchingReducer = makeFetchingReducer(asyncTodos);

export const selectTodosCount = state => {
  return state.todos.entities.length;
};

export const selectCompletedCount = state => {
  return state.todo.entities.filter(todo => todo.completed).length;
};

export const selectActiveTodoCount = state => {
  return state.todos.entities.filter(todo => !todo.completed).length;
};

export const toggleComplete = mac('todo/toggleComplete', 'payload');

export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'todos/fulfilled': {
      return action.payload;
    }
    case 'todo/add': {
      return state.concat({ ...action.payload });
    }
    case 'todo/update': {
      return action.payload ? [...action.payload] : state;
    }
    case 'todo/delete': {
      return state.filter(todo => todo.id !== action.payload);
    }
    case 'todo/complete': {
      const newTodos = state.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      return newTodos;
    }
    case 'todo/toggleComplete': {
      return state.map(
        todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
      );
    }
    case 'todo/clearCompleted': {
      return state.filter(todo => !todo.completed);
    }
    default:
      return state;
  }
};

export const reducer = combineReducers({
  todos: combineReducers({
    entities: todosReducer,
    status: fetchingReducer
  }),
  filter: filterReducer
});

export const selectStatus = state => state.todos.status;

export const selectTodos = state => {
  const { todos: { entities }, filter } = state;

  if (filter === 'completed') {
    return entities.filter(todo => todo.completed);
  }

  if (filter === 'active') {
    return entities.filter(todo => !todo.completed);
  }
  return entities;
};
