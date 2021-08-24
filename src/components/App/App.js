import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Header from '../header/header';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './App.css';

export default class App extends Component {
  state = {
    data: [this.createTask('Completed task'), this.createTask('Editing task'), this.createTask('Active task')],
    filter: 'All',
  };

  deleteTask = (id) => {
    this.setState(({ data }) => {
      const i = data.findIndex((el) => el.id === id);

      const newData = [...data.slice(0, i), ...data.slice(i + 1)];

      return {
        data: newData,
      };
    });
  };

  addTask = (task) => {
    const newTask = this.createTask(task);

    this.setState(({ data }) => {
      const newData = [...data, newTask];

      return {
        data: newData,
      };
    });
  };

  editTask = (key, value, id) => {
    this.setState(({ data }) => {
      const i = data.findIndex((el) => el.id === id);

      const oldTask = data[i];
      const edittingTask = { ...oldTask, [key]: value };

      const newData = [...data.slice(0, i), edittingTask, ...data.slice(i + 1)];

      return {
        data: newData,
      };
    });
  };

  onToggleCompleted = (id) => {
    this.setState(({ data }) => {
      const i = data.findIndex((el) => el.id === id);

      const oldTask = data[i];
      const newTask = { ...oldTask, completed: !oldTask.completed };

      const newData = [...data.slice(0, i), newTask, ...data.slice(i + 1)];

      return {
        data: newData,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ data }) => {
      const newData = data.filter((el) => !el.completed);
      return {
        data: newData,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  createTask(task) {
    return {
      description: task,
      createdTime: new Date(),
      completed: false,
      id: nanoid(3),
      timer: 0,
    };
  }

  filter(tasks, filter) {
    switch (filter) {
      case 'All':
        return tasks;
      case 'Active':
        return tasks.filter((task) => !task.completed);
      case 'Completed':
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  }

  render() {
    const { data, filter } = this.state;

    const visibleTasks = this.filter(data, filter);

    const leftTaskCount = data.filter((el) => !el.completed).length;

    return (
      <section className="todoapp">
        <Header onAdded={this.addTask} />
        <section className="main">
          <TaskList
            todos={visibleTasks}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            onEdit={this.editTask}
          />
          <Footer
            leftTask={leftTaskCount}
            onClear={this.clearCompleted}
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </section>
      </section>
    );
  }
}
