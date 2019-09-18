import React from 'react';
import { ValidationGroupContext } from './ValidationGroup';
import PropTypes from 'prop-types';

export default class Validator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: true,
      validatedErrorMessages: []
    };
  }

  componentDidMount() {
    this.context.attachValidator(this);
  }

  componentWillUnmount() {
    this.context.deattachValidator(this);
  }

  _getValidatedResult() {
    const { validated, validatedErrorMessages } = this.state;
    const result = { validated };

    if (!result.validated && validatedErrorMessages.length > 0) {
      result.firstValidatedErrorMessage = validatedErrorMessages[0];
      result.validatedErrorMessages = validatedErrorMessages;
    }

    return result;
  }

  render() {
    const { children } = this.props;

    if (typeof children === 'function') {
      return children(this._getValidatedResult());
    }

    return null;
  }

  validate() {
    return new Promise((resolve, reject) => {
      const {
        validations,
        getValidatedValue,
        errorMessages,
        getExtraDataAfterValidating
      } = this.props;
      const extraData = getExtraDataAfterValidating
        ? getExtraDataAfterValidating()
        : undefined;

      if (!validations || !getValidatedValue) {
        return resolve({
          validated: true,
          extraData
        });
      }

      const errorMessageCount = errorMessages ? errorMessages.length : 0;
      const validatedErrorMessages = [];
      let validated = true;

      validations.forEach((v, i) => {
        const value = getValidatedValue();

        if (!v(value) && i < errorMessageCount) {
          validatedErrorMessages.push(errorMessages[i]);
          validated = false;
        }
      });

      this.setState({ validated, validatedErrorMessages }, () => {
        resolve({ ...this._getValidatedResult(), extraData });
      });
    });
  }
}

/**
 * Context
 * --------------------------------------------------------------------------
 */
Validator.contextType = ValidationGroupContext;

/**
 * Prop types
 * --------------------------------------------------------------------------
 */
Validator.propTypes = {
  validations: PropTypes.arrayOf(PropTypes.func).isRequired,
  getValidatedValue: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string)
};

/**
 * Default props
 * --------------------------------------------------------------------------
 */
Validator.defaultProps = {
  validations: [],
  errorMessages: []
};
