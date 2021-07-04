import React from 'react';
import PropTypes from 'prop-types';

import Task from '../task/task';

import './task-list.css';

const TaskList = ({ todos, onDeleted, onToggleCompleted, onEdit }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <span key={id}>
        <Task
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleCompleted={() => onToggleCompleted(id)}
          onEdit={onEdit}
          id={id}
        />
      </span>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleCompleted: () => {},
  onEdit: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      createdTime: PropTypes.string,
      completed: PropTypes.bool,
      id: PropTypes.string,
    })
  ).isRequired,
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  onEdit: PropTypes.func,
};

export default TaskList;
