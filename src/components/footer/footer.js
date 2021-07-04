import React from 'react';
import PropTypes from 'prop-types'

import TaskFilter from '../task-filter/task-filter';

import './footer.css'


const Footer = ({ leftTask, onClear, filter, onFilterChange }) => (

    <footer className="footer">
        <span className="todo-count">{leftTask} items left</span>
        <TaskFilter
            filter={ filter }
            onFilterChange={ onFilterChange }/>
        <button
            type="button"
            className="clear-completed"
            onClick={onClear}>
            Clear completed
        </button>
    </footer>

);

Footer.defaultProps = {
    leftTask: 1000,
    onClear: () => {},
    filter: 'All',
    onFilterChange: () => {}
};

Footer.propTypes = {
    leftTask: PropTypes.number,
    onClear: PropTypes.func,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func
};

export default Footer;