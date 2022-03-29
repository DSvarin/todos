import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

const TaskForm = ({ onAdded }) => {
  const [task, setTask] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const onFormChange = (event) => {
    const newTask = event.target.value;
    setTask(newTask.charAt(0).toUpperCase() + newTask.slice(1));
    event.preventDefault();
  };

  const onMinutesSet = (event) => {
    setMinutes(Number(event.target.value));
    event.preventDefault();
  };

  const onSecondsSet = (event) => {
    setSeconds(Number(event.target.value));
    event.preventDefault();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (task.trim().length > 0) {
      onAdded(task, minutes * 60 + seconds);
    }
    setTask('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        type="text"
        value={task}
        onChange={onFormChange}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        type="number"
        min="0"
        max="59"
        value={minutes}
        onChange={onMinutesSet}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        type="number"
        min="0"
        max="59"
        value={seconds}
        onChange={onSecondsSet}
      />
      <button type="submit" aria-label="Submit" />
    </form>
  );
};

export default TaskForm;

TaskForm.defaultProps = {
  onAdded: () => {},
};

TaskForm.propTypes = {
  onAdded: PropTypes.func,
};
