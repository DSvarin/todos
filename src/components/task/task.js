/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import TaskEditingForm from '../task-editing-form/task-editing-form';

import './task.css';

const Task = ({ description, createdTime, onDeleted, onToggleCompleted, completed, id, onEdit, timer }) => {
  const [editing, setEditing] = useState(false);
  const [time, setTime] = useState(timer);
  const [isPlaying, setPlayPause] = useState(false);

  useEffect(() => {
    let timerId = null;

    if (isPlaying) {
      timerId = setInterval(() => {
        if (time === 1) {
          setPlayPause(false);
        }
        setTime((oldTime) => oldTime - 1);
        onEdit('timer', time, id);
      }, 1000);
    }

    if (!isPlaying || completed) {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [isPlaying, completed, timer, time, onEdit, id]);

  const onButtonEditClick = () => {
    setEditing(true);
  };

  const onEditSubmit = () => {
    setEditing(false);
  };

  const onPlayClick = () => {
    setPlayPause(true);
  };

  const onPauseClick = () => {
    setPlayPause(false);
  };

  const onCompletedClick = () => {
    onToggleCompleted();
    onPauseClick();
  };

  const getTime = (currentTime) => {
    let content;
    const timeMs = new Date(currentTime * 1000);
    const seconds = <>{timeMs.getSeconds()}s</>;
    const minutes = <>{timeMs.getMinutes()}m</>;
    if (currentTime < 60) content = <>{seconds}</>;
    if (currentTime >= 60 && currentTime < 3600) {
      content =
        currentTime === 60 ? (
          <>{minutes}</>
        ) : (
          <>
            {minutes} {seconds}
          </>
        );
    }
    return content;
  };

  const getTimeDistance = (creationTime) =>
    formatDistanceToNow(creationTime, { includeSeconds: true, addSuffix: true });

  let liClass = '';
  if (completed) liClass = 'completed';
  if (editing) liClass = 'editing';

  const buttonEditClass = completed ? 'icon icon-edit hidden' : 'icon icon-edit';
  const buttonPlayClass = completed ? 'icon icon-play hidden' : 'icon icon-play';
  const buttonPauseClass = completed ? 'icon icon-pause hidden' : 'icon icon-pause';

  return (
    <li className={liClass}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onClick={onCompletedClick} readOnly />
        <label>
          <span className="title">{description}</span>
          <span className="description timer">
            <button type="button" aria-label="Play task" className={buttonPlayClass} onClick={onPlayClick} />
            <button type="button" aria-label="Pause task" className={buttonPauseClass} onClick={onPauseClick} />
            <span className="timer-time">{getTime(time)}</span>
          </span>
          <span className="description">created {getTimeDistance(createdTime)}</span>
        </label>
        <button type="button" aria-label="Edit task" className={buttonEditClass} onClick={onButtonEditClick} />
        <button type="button" aria-label="Delete task" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      <TaskEditingForm task={description} id={id} onEdit={onEdit} onEditSubmit={onEditSubmit} />
    </li>
  );
};

export default Task;

Task.defaultProps = {
  description: '',
  createdTime: '27.02.2000',
  onDeleted: () => {},
  onToggleCompleted: () => {},
  completed: false,
  onEdit: () => {},
  timer: 0,
};

Task.propTypes = {
  description: PropTypes.string,
  createdTime: PropTypes.instanceOf(Date),
  onDeleted: PropTypes.func,
  onToggleCompleted: PropTypes.func,
  completed: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  timer: PropTypes.number,
};
