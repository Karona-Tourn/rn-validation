import React, { Component } from 'react';
import type Validator from './Validator';

export const ValidationGroupContext = React.createContext<
  ValidationGroup | undefined | null
>(null);

type Result = {
  validated: boolean;
  extraData?: any;
  firstValidatedErrorMessage?: string;
  validatedErrorMessages?: string[];
};

export type ValidationResult = {
  validated?: boolean;
  validatedErrors?: Result[];
};

export interface ValidationGroupProps {
  onValidated?: (result: ValidationResult) => void;
}

export default class ValidationGroup extends Component<ValidationGroupProps> {
  private _validators: Validator[];

  constructor(props: Readonly<ValidationGroupProps>) {
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

  attachValidator(validator: any) {
    const alreadyExists = this._validators.some((v: any) => v === validator);

    if (alreadyExists) {
      return;
    }

    this._validators.push(validator);
  }

  deattachValidator(validator: any) {
    const index = this._validators.findIndex((v: any) => v === validator);

    if (index < 0) {
      return;
    }

    this._validators.splice(index, 1);
  }

  validate(): Promise<ValidationResult> {
    return new Promise(async (resolve) => {
      Promise.all(this._validators.map((v) => v.validate())).then((results) => {
        const finalResult: ValidationResult = {};

        // Filter for validated errors
        const validatedErrors = results.filter((r) => !r.validated);
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
