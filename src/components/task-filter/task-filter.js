import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './task-filter.css'

export default class TaskFilter extends Component {

    buttons = [
        { name: 'All' },
        { name: 'Active' },
        { name: 'Completed' }
    ];

    static defaultProps = {
        filter: 'All',
        onFilterChange: () => {}
    }

    static propTypes = {
        filter: PropTypes.string,
        onFilterChange: PropTypes.func
    }

    render() {

        const {filter, onFilterChange} = this.props

        const buttons = this.buttons.map(({name}) => {
            const isActive = filter === name;
            const classNameButton = isActive ? 'selected' : '' ;
            return (
                <li key = { name }>
                    <button
                        type="button"
                        className={ classNameButton }
                        onClick={()=> onFilterChange(name)}>
                        { name }
                    </button>
                </li>
            )
        })

        return (
        <ul className="filters">
                {buttons}
        </ul>
        );
    }

};
