import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

import TaskEditingForm from '../task-editing-form/task-editing-form';

import './task.css';

export default class Task extends Component {
  state = {
    editing: false,
  };

  static defaultProps = {
    description: '',
    createdTime: '27.02.2000',
    onDeleted: () => {},
    onToggleCompleted: () => {},
    completed: false,
    onEdit: () => {},
  };

  static propTypes = {
    description: PropTypes.string,
    createdTime: PropTypes.instanceOf(Date),
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    completed: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onEdit: PropTypes.func,
  };

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

  getTimeDistance = (createdTime) => formatDistanceToNow(createdTime, { includeSeconds: true, addSuffix: true });

  render() {
    const { description, createdTime, onDeleted, onToggleCompleted, completed, id, onEdit } = this.props;

    const { editing } = this.state;

    let liClass = '';
    let buttonEditClass = 'icon icon-edit';
    if (completed) {
      liClass += 'completed';
      buttonEditClass = 'hidden';
    }
    if (editing) {
      liClass += 'editing';
    }

    return (
      <li className={liClass}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} onClick={onToggleCompleted} readOnly />
          <label>
            <span className="description">{description}</span>
            <span className="created">created {this.getTimeDistance(createdTime)}</span>
          </label>
          <button type="button" aria-label="Edit task" className={buttonEditClass} onClick={this.onButtonEditClick} />
          <button type="button" aria-label="Delete task" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <TaskEditingForm task={description} id={id} onEdit={onEdit} onEditSubmit={this.onEditSubmit} />
      </li>
    );
  }
}
