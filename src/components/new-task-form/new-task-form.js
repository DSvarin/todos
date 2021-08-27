import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class TaskForm extends Component {
  state = {
    task: '',
    minutes: '',
    seconds: '',
  };

  static defaultProps = {
    onAdded: () => {},
  };

  static propTypes = {
    onAdded: PropTypes.func,
  };

  onFormChange = (event) => {
    const newTask = event.target.value;
    this.setState({
      task: newTask.charAt(0).toUpperCase() + newTask.slice(1),
    });
    event.preventDefault();
  };

  onMinutesSet = (event) => {
    this.setState({ minutes: Number(event.target.value) });
    event.preventDefault();
  };

  onSecondsSet = (event) => {
    this.setState({ seconds: Number(event.target.value) });
    event.preventDefault();
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { onAdded } = this.props;
    const { task, minutes, seconds } = this.state;
    if (task.trim().length > 0) {
      onAdded(task, minutes * 60 + seconds);
    }
    this.setState({
      task: '',
      minutes: '',
      seconds: '',
    });
  };

  render() {
    const { task, minutes, seconds } = this.state;
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          type="text"
          value={task}
          onChange={this.onFormChange}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          min="0"
          max="59"
          value={minutes}
          onChange={this.onMinutesSet}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          min="0"
          max="59"
          value={seconds}
          onChange={this.onSecondsSet}
        />
        <button type="submit" aria-label="Submit" />
      </form>
    );
  }
}
