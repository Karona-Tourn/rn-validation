import React, { createRef } from 'react';
import { SafeAreaView, StyleSheet, Button, View, Alert } from 'react-native';
import {
  ValidationGroup,
  ValidationRules,
  ValidationResult,
} from 'rn-validation';
import AppTextInput from './AppTextInput';

type AppProps = {};

type AppState = {
  username?: string;
  password?: string;
};

class App extends React.Component<AppProps, AppState> {
  private _validation: React.RefObject<ValidationGroup>;

  constructor(props: Readonly<AppProps>) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this._validation = createRef<ValidationGroup>();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <ValidationGroup
            ref={this._validation}
            onValidated={this._onValidated}
          >
            <AppTextInput
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              placeholder="Enter your username"
              validations={[
                ValidationRules.isNotEmpty,
                ValidationRules.isLengthLessThanOrEqualTo(20),
              ]}
              errorMessages={[
                'Field cannot be empty',
                'Username length cannot exceed 20',
              ]}
            />
            <AppTextInput
              secureTextEntry
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              placeholder="Enter your password"
              validations={[
                ValidationRules.isNotEmpty,
                ValidationRules.isLengthLessThanOrEqualTo(6),
              ]}
              errorMessages={[
                'Password cannot be empty',
                'Password length cannot exceed 6',
              ]}
            />
          </ValidationGroup>

          <Button title="Submit" onPress={this._onSubmitPressed} />
        </View>
      </SafeAreaView>
    );
  }

  _onValidated = ({ validated, validatedErrors }: ValidationResult) => {
    if (validated) {
      Alert.alert('', 'Validated!');
    } else if (validatedErrors != null) {
      Alert.alert('Invalid', validatedErrors[0].firstValidatedErrorMessage, [
        {
          text: 'OK',
          onPress: () => {
            requestAnimationFrame(() => {
              validatedErrors[0].extraData.input.focus();
            });
          },
        },
      ]);
    }
  };

  _onSubmitPressed = () => {
    this._validation.current && this._validation.current.validate();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
});

export default App;
