/**
* TextInputComponent.jsx
* Created by Katie Rose 12/17/15
**/

import React, { PropTypes } from 'react';

const propTypes = {
    inputDisabled: PropTypes.bool,
    inputName: PropTypes.string.isRequired,
    inputLength: PropTypes.number, // This not yet functional via React
    inputClass: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    inputLabel: PropTypes.string,
    handleChange: PropTypes.func,
    error: PropTypes.bool
};

// to do: complete implementation of inputLength prop
const defaultProps = {
    inputDisabled: false,
    inputLength: 40,
    inputClass: '',
    inputPlaceholder: '',
    inputLabel: '',
    error: false,
    tabIndex: null,
    isRequired: false
};

// A standard text input for submission that we can further turn into a sharable component
export default class TextInput extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
      let className = '';
      if (this.props.error) {
        className = 'error';
      }
      return (
          <div className="usa-da-input-container">
               <label className="sr-only" htmlFor="username">{this.props.inputPlaceholder}</label>
              <input
                id={this.props.inputName}
                className={className}
                name={this.props.inputName}
                type="text"
                placeholder={this.props.inputPlaceholder}
                aria-describedby={this.props.inputName}
                onChange={this.props.handleChange}
                tabIndex={this.props.tabIndex}
                aria-required={this.props.isRequired}
              />
          </div>
      );
    }
}

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;
