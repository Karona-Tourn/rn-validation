import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const ValidationGroupContext = React.createContext(null);

export default class ValidationGroup extends Component {
  constructor(props) {
    super(props);
    this._validators = [];
  }

  render() {
    return (
      <ValidationGroupContext.Provider value={this}>
        {this.props.children}
      </ValidationGroupContext.Provider>
    );
  }

  attachValidator(validator) {
    const alreadyExists = this._validators.some(v => v === validator);

    if (alreadyExists) {
      return;
    }

    this._validators.push(validator);
  }

  deattachValidator(validator) {
    const index = this._validators.findIndex(v => v === validator);

    if (index < 0) {
      return;
    }

    this._validators.splice(index, 1);
  }

  validate() {
    return new Promise(async (resolve, reject) => {
      Promise.all(this._validators.map(v => v.validate())).then(results => {
        const finalResult = {};

        // Filter for validated errors
        const validatedErrors = results.filter(r => !r.validated);
        if (validatedErrors.length > 0) {
          finalResult.validatedErrors = validatedErrors;
          finalResult.validated = false;
        } else {
          finalResult.validated = true;
        }

        this.props.onValidated && this.props.onValidated(finalResult);

        resolve(finalResult);
      });
    });
  }
}

/**
 * Prop types
 * --------------------------------------------------------------------------
 */
ValidationGroup.propTypes = {
  onValidated: PropTypes.func
};
