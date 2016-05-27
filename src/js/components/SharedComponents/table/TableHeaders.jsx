/**
 * TableHeaders.jsx
 * Created by Kyle Fox 2/19/16
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import TableSorter from './TableSorter.jsx';

const propTypes = {
    data: PropTypes.array.isRequired,
    onSort: PropTypes.func
};

const defaultProps = {
    headerClasses: []
}

export default class TableHeaders extends React.Component {
    render() {

        const tableHeaders = [];
        for (let i = 0; i < this.props.data.length; i++) {

            let className = "table-header-value";

            // add sorter buttons only if this table is sortable
            let sorters = '';
            if (this.props.sortable && _.indexOf(this.props.unsortable, i) == -1) {
                className += " sortable"
                sorters = <TableSorter onSort={this.props.onSort} col={i} />;
            }

            tableHeaders.push(<th key={i} className={this.props.headerClasses[i]}>
                <span className={className} >
                    {this.props.data[i]}
                </span>
                {sorters}
            </th>);
        }

        

        return (
            <tr>
                {tableHeaders}
            </tr>
        );
    }
}

TableHeaders.propTypes = propTypes;
TableHeaders.defaultProps = defaultProps;
