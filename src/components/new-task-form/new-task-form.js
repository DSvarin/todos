import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './new-task-form.css';

export default class TaskForm extends Component {
  state = {
    task: '',
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
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { onAdded } = this.props;
    const { task } = this.state;
    onAdded(task);
    this.setState({
      task: '',
    });
  };

  render() {
    const { task } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input className="new-todo" placeholder="What needs to be done?" value={task} onChange={this.onFormChange} />
      </form>
    );
  }
}
