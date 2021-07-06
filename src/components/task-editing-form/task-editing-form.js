import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TaskEditingForm extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    task: this.props.task,
  };

  static defaultProps = {
    onEdit: () => {},
    onEditSubmit: () => {},
    task: 'Ops',
  };

  static propTypes = {
    onEdit: PropTypes.func,
    onEditSubmit: PropTypes.func,
    id: PropTypes.string.isRequired,
    task: PropTypes.string,
  };

  onFieldChange = (event) => {
    const newTask = event.target.value;

    this.setState({
      task: newTask.charAt(0).toUpperCase() + newTask.slice(1),
    });
  };

  onSubmitEditing = (event) => {
    event.preventDefault();

    const { onEdit, onEditSubmit, id } = this.props;
    const { task } = this.state;

    if (task.trim().length > 0) {
      onEdit(task, id);
    }
    onEditSubmit();
  };

  render() {
    const { task } = this.state;
    return (
      <form onSubmit={this.onSubmitEditing}>
        <input type="text" className="edit" value={task} onChange={this.onFieldChange} />
      </form>
    );
  }
}
