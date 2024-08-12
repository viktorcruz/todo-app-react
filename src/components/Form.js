import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComplete, selectTodos } from '../features/todos';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useBreakpoint } from "../hooks/useBreakpoint";
import styled from 'styled-components';

const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  appearance: none;
  cursor: pointer;
  border: 2px solid #f1f1f3;
  position: relative;

  &:checked {
    background: linear-gradient(
      135deg,
      hsl(192, 100%, 67%),
      hsl(280, 87%, 65%)
    );

    border: 2px solid #f1f1f3;
    &::before {
      content: ''; 
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 11px;
      height: 9px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="%23FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }

  &:hover {
    border-color: #f1f1f3; 
  }

  &:focus {
    outline: none; 
  }
`;

const StyledButton = styled.button`
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#ccc',
  fontSize: '13px'
`;
const iconCross = '/images/icon-cross.svg';

const TodoItem = ({ todo, index }) => {
  const dispatch = useDispatch();
  const isMobile = useBreakpoint();
  const handleChange = e => {
    dispatch(setComplete(todo));
  };

  const handleDelete = () => {
    dispatch({ type: 'todo/delete', payload: todo.id });
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => {
        return (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`todo-item ${todo.completed ? 'completed' : ''}`}
          >
            <label>
              <StyledCheckbox
                type="checkbox"
                checked={todo.completed}
                onChange={handleChange}
              />
              <span>
                {todo.title}
              </span>
            </label>
            <>
            {isMobile ? (
              <StyledButton className="delete-btn" onClick={handleDelete}>
                <img src={iconCross} alt="" style={{ height: '13px' }} />
              </StyledButton>
            ) : (<></>)}
            </>
          </li>
        );
      }}
    </Draggable>
  );
};

const Form = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  const submit = e => {
    e.preventDefault();
    if (!value.trim()) {
      return;
    }
    const id = Math.random().toString(36).substr(2, 9);
    const todo = { title: value, completed: false, id };
    dispatch({ type: 'todo/add', payload: todo });
    setValue('');
  };


  const onDragEnd = result => {
    const { destination, source } = result;
  
    if (!destination || (destination.index === source.index)) {
      return;
    }
  
    const newTodos = Array.from(todos);
    const [movedTodo] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, movedTodo);
  
    dispatch({ type: 'todo/update', payload: newTodos });
  };

  return (
    <div className="new-todo-wrapper">
      <form onSubmit={submit} className="todo-form">
        <input
          className="josefin-sans-400"
          value={value}
          onChange={e => setValue(e.target.value)}
          type="text"
          placeholder="Create a new todo..."
        />
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {provided =>
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="todo-list"
            >
              {todos.map((todo, index) =>
                <TodoItem key={todo.id} todo={todo} index={index} />
              )}
              {provided.placeholder}
            </ul>}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Form;
