import React, { Component, createRef } from 'react';
import {
  Text,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextInput,
} from 'react-native';
import { ValidatorProps, Validator } from 'rn-validation';

interface AppTextInputProps extends TextInputProps, ValidatorProps {
  containerStyle?: StyleProp<ViewStyle> | null;
}

export default class AppTextInput extends Component<AppTextInputProps> {
  private _input: React.RefObject<TextInput>;

  constructor(props: Readonly<AppTextInputProps>) {
    super(props);

    this._input = createRef<TextInput>();
  }

  render() {
    const {
      getValidatedValue,
      validations,
      containerStyle,
      errorMessages,
      style,
      value,
      ...restProps
    } = this.props;

    return (
      <Validator
        getValidatedValue={() => value}
        validations={validations}
        errorMessages={errorMessages}
        getExtraDataAfterValidating={() => ({ input: this })}
      >
        {({ validated, firstValidatedErrorMessage }) => {
          return (
            <View
              style={[styles.container, StyleSheet.flatten(containerStyle)]}
            >
              <TextInput
                ref={this._input}
                value={value}
                {...restProps}
                style={[
                  styles.input,
                  { borderColor: validated ? 'grey' : 'red' },
                  style,
                ]}
              />
              {validated ? null : (
                <Text style={styles.errorText} numberOfLines={1}>
                  {firstValidatedErrorMessage}
                </Text>
              )}
            </View>
          );
        }}
      </Validator>
    );
  }

  focus() {
    this._input.current && this._input.current.focus();
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    height: 50,
    paddingHorizontal: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});
