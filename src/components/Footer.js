import React from 'react';
import { useDispatch } from 'react-redux';
import {
  selectTodos
} from '../features/todos';
import { useSelector } from 'react-redux';
import { useBreakpoint } from "../hooks/useBreakpoint";
import { setFilter } from '../features/todos';

const Footer = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.filter);
  const todos = useSelector(selectTodos);
  const todosCount = todos.length;
  const isMobile = useBreakpoint();

  const handleClearCompleted = () => {
    dispatch({ type: 'todo/clearCompleted' });
  };


  return (
    <footer className="todo-footer">
      <span className="todo-count josefin-sans-400">
        {todosCount} {currentFilter} items
      </span>
      <>
        {isMobile ? (
          <></>
        ) : (
          <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <button style={{margin: '0 5px'}} className={`filter-btn josefin-sans-400 ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => dispatch(setFilter('all'))}>
              All
              </button>
              <button style={{margin: '0 5px'}}
                className={`filter-btn josefin-sans-400 ${currentFilter === 'active' ? 'active' : ''}`} onClick={() => dispatch(setFilter('active'))}>
              Active
              </button>
              <button style={{margin: '0 5px'}} className={`filter-btn josefin-sans-400 ${currentFilter === 'completed' ? 'active' : ''}`} onClick={() => dispatch(setFilter('completed'))}>
                Completed
              </button>
          </div>
        </>
        )}
      </>
      <button className="clear-completed josefin-sans-400" onClick={handleClearCompleted}>
        Clear Completed
      </button>
    </footer>
  );
};

export default Footer;
