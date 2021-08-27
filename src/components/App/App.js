import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Header from '../header/header';
import TaskList from '../task-list/task-list';
import Footer from '../footer/footer';
import './App.css';

const App = () => {
  function createTask(description, timer) {
    return {
      description,
      createdTime: new Date(),
      completed: false,
      id: nanoid(3),
      timer,
    };
  }

  const [data, setData] = useState([
    createTask('Completed task', 60),
    createTask('Editing task', 60),
    createTask('Active task', 60),
  ]);
  const [filter, setFilter] = useState('All');

  const addTask = (task, timer) => {
    const newTask = createTask(task, timer);
    setData((oldData) => [...oldData, newTask]);
  };

  const editTask = (key, value, id) => {
    setData((oldData) => {
      const i = oldData.findIndex((el) => el.id === id);
      const oldTask = oldData[i];

      return [...oldData.slice(0, i), { ...oldTask, [key]: value }, ...oldData.slice(i + 1)];
    });
  };

  const deleteTask = (id) => {
    setData((oldData) => {
      const i = oldData.findIndex((el) => el.id === id);
      return [...oldData.slice(0, i), ...oldData.slice(i + 1)];
    });
  };

  const onToggleCompleted = (id) => {
    setData((oldData) => {
      const i = oldData.findIndex((el) => el.id === id);
      const oldTask = oldData[i];

      return [...oldData.slice(0, i), { ...oldTask, completed: !oldTask.completed }, ...oldData.slice(i + 1)];
    });
  };

  const clearCompleted = () => {
    setData((oldData) => oldData.filter((el) => !el.completed));
  };

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  function filterSwitch(tasks, filterValue) {
    switch (filterValue) {
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

  const visibleTasks = filterSwitch(data, filter);

  const leftTaskCount = data.filter((el) => !el.completed).length;

  return (
    <section className="todoapp">
      <Header onAdded={addTask} />
      <section className="main">
        <TaskList todos={visibleTasks} onDeleted={deleteTask} onToggleCompleted={onToggleCompleted} onEdit={editTask} />
        <Footer leftTask={leftTaskCount} onClear={clearCompleted} filter={filter} onFilterChange={onFilterChange} />
      </section>
    </section>
  );
};

export default App;
