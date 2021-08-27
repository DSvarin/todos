import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskEditingForm = ({ onEdit, onEditSubmit, id, task }) => {
  const [taskDescription, setTask] = useState(task);

  const onFieldChange = (event) => {
    const newTask = event.target.value;
    setTask(newTask.charAt(0).toUpperCase() + newTask.slice(1));
    event.preventDefault();
  };

  const onSubmitEditing = (event) => {
    if (task.trim().length > 0) {
      onEdit('description', taskDescription, id);
    }
    onEditSubmit();
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmitEditing}>
      <input type="text" className="edit" value={taskDescription} onChange={onFieldChange} />
    </form>
  );
};

export default TaskEditingForm;

TaskEditingForm.defaultProps = {
  onEdit: () => {},
  onEditSubmit: () => {},
  task: 'Ops',
};

TaskEditingForm.propTypes = {
  onEdit: PropTypes.func,
  onEditSubmit: PropTypes.func,
  id: PropTypes.string.isRequired,
  task: PropTypes.string,
};
