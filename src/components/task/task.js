/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import TaskEditingForm from '../task-editing-form/task-editing-form';

import './task.css';

export default class Task extends Component {
  state = {
    editing: false,
    timerId: null,
    timer: this.props.timer,
  };

  static defaultProps = {
    description: '',
    createdTime: '27.02.2000',
    onDeleted: () => {},
    onToggleCompleted: () => {},
    completed: false,
    onEdit: () => {},
    timer: 0,
  };

  static propTypes = {
    description: PropTypes.string,
    createdTime: PropTypes.instanceOf(Date),
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    completed: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onEdit: PropTypes.func,
    timer: PropTypes.number,
  };

  componentWillUnmount() {
    this.onPauseClick();
  }

  onButtonEditClick = () => {
    this.setState({
      editing: true,
    });
  };

  onEditSubmit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing,
    });
  };

  getTime = (timer) => {
    let content;
    const time = new Date(timer * 1000);
    const seconds = <>{time.getSeconds()}s</>;
    const minutes = <>{time.getMinutes()}m</>;
    if (timer < 60) content = <>{seconds}</>;
    if (timer >= 60 && timer < 3600) {
      content =
        timer === 60 ? (
          <>{minutes}</>
        ) : (
          <>
            {minutes} {seconds}
          </>
        );
    }
    return content;
  };

  onCompletedClick = () => {
    const { onToggleCompleted } = this.props;
    onToggleCompleted();
    this.onPauseClick();
  };

  onPlayClick = () => {
    const { id, onEdit } = this.props;
    if (!this.state.timerId) {
      const timerId = setInterval(() => {
        const oldTimer = this.state.timer;
        const newTimer = oldTimer - 1;
        if (newTimer === 0) {
          clearInterval(timerId);
        }
        this.setState({ timer: newTimer });
        onEdit('timer', newTimer, id);
      }, 1000);
      this.setState({ timerId });
    }
  };

  onPauseClick = () => {
    const { timerId } = this.state;
    clearInterval(timerId);
    this.setState({ timerId: null });
  };

  getTimeDistance = (createdTime) => formatDistanceToNow(createdTime, { includeSeconds: true, addSuffix: true });

  render() {
    const { description, createdTime, onDeleted, completed, id, onEdit } = this.props;
    const { editing, timer } = this.state;

    let liClass = '';
    if (completed) liClass = 'completed';
    if (editing) liClass = 'editing';

    const buttonEditClass = completed ? 'icon icon-edit hidden' : 'icon icon-edit';
    const buttonPlayClass = completed ? 'icon icon-play hidden' : 'icon icon-play';
    const buttonPauseClass = completed ? 'icon icon-pause hidden' : 'icon icon-pause';

    return (
      <li className={liClass}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onClick={this.onCompletedClick} readOnly />
          <label>
            <span className="title">{description}</span>
            <span className="description timer">
              <button type="button" aria-label="Play task" className={buttonPlayClass} onClick={this.onPlayClick} />
              <button type="button" aria-label="Pause task" className={buttonPauseClass} onClick={this.onPauseClick} />
              <span className="timer-time">{this.getTime(timer)}</span>
            </span>
            <span className="description">created {this.getTimeDistance(createdTime)}</span>
          </label>
          <button type="button" aria-label="Edit task" className={buttonEditClass} onClick={this.onButtonEditClick} />
          <button type="button" aria-label="Delete task" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <TaskEditingForm task={description} id={id} onEdit={onEdit} onEditSubmit={this.onEditSubmit} />
      </li>
    );
  }
}
