import { Component } from 'react';

type ValidationRuleChecker = (value: any) => boolean | null;

type ValidatorResult = { validated: boolean, extraData: any, firstValidatedErrorMessage?: string | null, validatedErrorMessages?: string[] | null };

type ValidationGroupResult = { validated: boolean, validatedErrors?: ValidatorResult[] | null };

export interface ValidationGroupProps {
    onValidated?: (result: ValidationGroupResult) => void;
}

export class ValidationGroup extends Component<ValidationGroupProps> {
    validate(): Promise<ValidationGroupResult>;
}

export interface ValidatorProps {
    validations?: ValidationRuleChecker[];
    errorMessages?: string[] | null;
    getValidatedValue?: () => any;
    children?: (props: ValidatorResult) => JSX.Element;
    getExtraDataAfterValidating?: () => any | null;
}

export class Validator extends Component<ValidatorProps> {
    validate(): Promise<ValidatorResult>;
}

export namespace ValidationRules {
    export function isNotEmpty<T = string | null | undefined | Array>(value: T): boolean;
    export function isNotEmptyTrim<T = string | null | undefined | Array>(value: T): boolean;
    export function isLengthLessThan(maxLength: number): ValidationRuleChecker;
    export function isLengthLessThanOrEqualTo(maxLength: number): ValidationRuleChecker;
    export function isLengthBetween(min: number, max: number): ValidationRuleChecker;
    export function isEqual(anotherValue: any): ValidationRuleChecker;
    export function isExactlyEqual(anotherValue: any): ValidationRuleChecker;
    export function matchRegExp<T = string | RegExp>(regexp: T): ValidationRuleChecker;
    export function isBetween<T = string | number>(min: T, max: T): ValidationRuleChecker;
    export function isGreaterThan(min: number): ValidationRuleChecker;
    export function isGreaterThanOrEqualTo(min: number): ValidationRuleChecker;
    export function requireNumericDigits<T = string | number | null | undefined>(value: T): ValidationRuleChecker;
    export function isEmail<T = string | null | undefined>(value: T): boolean;
    export function isNotEmptyTrim<T = string | null | undefined>(value: T): boolean;
}