import React from 'react';
import { ValidationGroupContext } from './ValidationGroup';

type Result = {
  validated: boolean;
  extraData?: any;
  firstValidatedErrorMessage?: string;
  validatedErrorMessages?: string[];
};

type ValidationFunction = (value: any) => boolean;

export interface ValidatorProps {
  validations?: ValidationFunction[];
  getValidatedValue?: () => any;
  children?: (result: Result) => JSX.Element;
  errorMessages: string[];
  getExtraDataAfterValidating?: () => any;
}

interface ValidatorState {
  validated: boolean;
  validatedErrorMessages: string[];
}

export default class Validator extends React.Component<
  ValidatorProps,
  ValidatorState
> {
  constructor(props: Readonly<ValidatorProps>) {
    super(props);

    this.state = {
      validated: true,
      validatedErrorMessages: [],
    };
  }

  componentDidMount() {
    this.context.attachValidator(this);
  }

  componentWillUnmount() {
    this.context.deattachValidator(this);
  }

  _getValidatedResult(): Result {
    const { validated, validatedErrorMessages } = this.state;
    const result: Result = { validated };

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

  validate(): Promise<Result> {
    return new Promise((resolve: (value?: Result) => void) => {
      const {
        validations,
        getValidatedValue,
        errorMessages,
        getExtraDataAfterValidating,
      } = this.props;

      const extraData = getExtraDataAfterValidating
        ? getExtraDataAfterValidating()
        : undefined;

      if (!validations || !getValidatedValue) {
        return resolve({
          validated: true,
          extraData,
        });
      }

      const errorMessageCount = errorMessages ? errorMessages.length : 0;
      const validatedErrorMessages: string[] = [];
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
