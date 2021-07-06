import React from 'react';
import PropTypes from 'prop-types';
import './task-filter.css';

const TaskFilter = ({ filter, onFilterChange }) => {
  let buttons = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }];

  buttons = buttons.map(({ name }) => {
    const isActive = filter === name;
    const classNameButton = isActive ? 'selected' : '';
    return (
      <li key={name}>
        <button type="button" className={classNameButton} onClick={() => onFilterChange(name)}>
          {name}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
};

TaskFilter.defaultProps = {
  filter: 'All',
  onFilterChange: () => {},
};

TaskFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TaskFilter;
