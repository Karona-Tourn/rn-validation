# rn-validation

Supporting component helping validating values

## Features

- Provide validation rules
- Able to create custom validation rules
- Easy to use

## Installation

```sh
npm install rn-validation
```

or

```sh
yarn add rn-validation
```

## Usage

```js
import { createRef } from 'react';
import { ValidationGroup, Validator, ValidationRules } from 'rn-validation';

const validation = createRef();

<ValidationGroup
  ref={validation}
  onValidated={({ validated, validatedErrors }) => {
    if (validated) {
      alert('Validated successfully!');
    } else {
      alert(validatedErrors[0].firstValidatedErrorMessage);
    }
  }}
>
  <Validator
    getValidatedValue={() => value}
    validations={[
      ValidationRules.isNotEmpty,
      ValidationRules.isLengthLessThanOrEqualTo(20),
    ]}
    errorMessages={['Cannot be empty', 'Value length cannot exceed 20']}
  >
    {({ validated, firstValidatedErrorMessage }) => {
      return (
        <View>
          <TextInput
            value={value}
            style={{ borderWidth: 1, borderColor: validated ? 'grey' : 'red' }}
          />
          {validated ? null : <Text>{firstValidatedErrorMessage}</Text>}
        </View>
      );
    }}
  </Validator>
</ValidationGroup>;

// Call the method to start validating all validators inside the group
validation.current.validate();
```

### **ValidationGroup**

#### Props

| Name        | Type     | Required | Default | Description                                 |
| ----------- | -------- | :------: | :-----: | ------------------------------------------- |
| onValidated | function |    ❌    |  null   | Callback invoked after validating completed |

#### Methods

| Name     | Description                |
| -------- | -------------------------- |
| validate | Invoke to start validating |

### **Validator**

#### Props

| Name                        | Type       | Required | Default | Description                                                                               |
| --------------------------- | ---------- | :------: | :-----: | ----------------------------------------------------------------------------------------- |
| validations                 | function[] |    ✔️    |   []    | Array of validating functions to be used for validating                                   |
| errorMessages               | string[]   |    ❌    |   []    | Array of error messages corresponding the validation function array                       |
| getValidatedValue           | function   |    ✔️    |         | Function returning the value to be validated                                              |
| getExtraDataAfterValidating | function   |    ❌    |         | Function returning the extra data to be passed as argument to callback of ValidationGroup |
| children                    | function   |    ✔️    |         | Children must be function return an element                                               |

#### Methods

| Name     | Description                |
| -------- | -------------------------- |
| validate | Invoke to start validating |

### **ValidationRules**

- isNotEmpty
- isLengthLessThan
- isLengthLessThanOrEqualTo
- isLengthBetween
- isEqual
- isExactlyEqual
- matchRegExp
- isBetween
- isLessThan
- isLessThanOrEqualTo
- isGreaterThan
- isGreaterThanOrEqualTo
- requireNumericDigits
- isEmail
- isNotEmptyTrim

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
