import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../features/todos';

const Filter = () => {
  const dispatch = useDispatch();
  const currentFilter = useSelector(state => state.filter);

  return (
    <div className="filters">
      <button
        className={`filter-btn josefin-sans-400 ${currentFilter === 'all'
          ? 'active'
          : ''}`}
        onClick={() => dispatch(setFilter('all'))}
      >
        All
      </button>
      <button
        className={`filter-btn josefin-sans-400 ${currentFilter === 'active'
          ? 'active'
          : ''}`}
        onClick={() => dispatch(setFilter('active'))}
      >
        Active
      </button>
      <button
        className={`filter-btn josefin-sans-400 ${currentFilter === 'completed'
          ? 'active'
          : ''}`}
        onClick={() => dispatch(setFilter('completed'))}
      >
        Completed
      </button>
    </div>
  );
};

export default Filter;
