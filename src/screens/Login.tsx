import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'react-native-elements/dist/input/Input';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthApi } from '../api';
import { User } from '../api/authAPI';

type Props = {
  navigation: { navigate: Function };
};

export const Login = ({ navigation }: Props) => {
  const passwordRef = useRef<Input>(null);
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fulfilled, setFulfilled] = useState<boolean>(false);
  const [inRegistration, setInRegistration] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(true);

  console.log('render');

  useEffect(() => {
    AsyncStorage.getItem('@user')
      .then((value) => {
        if (value) {
          navigation.navigate('BookList', { user: JSON.parse(value) });
        }
        setisLoading(false);
      })
      .catch(() => setisLoading(false));
  }, []);

  const storeUserAndProceed = (user: User) => {
    AsyncStorage.setItem('@user', JSON.stringify(user))
      .then(() => navigation.navigate('BookList', { user }))
      .catch(() =>
        Alert.alert('Error', 'Unable to store user!', [
          {
            text: 'OK',
          },
        ])
      );
  };

  useEffect(() => {
    setFulfilled(userName.length > 2 && password.length > 2);
  }, [userName, password]);

  const submit = () => {
    if (fulfilled) {
      setisLoading(true);
      if (inRegistration) {
        AuthApi.register(userName, password).then(storeUserAndProceed);
      } else {
        AuthApi.login(userName, password).then(storeUserAndProceed);
      }
    }
  };

  return (
    <SafeAreaView style={styles.externalContainer}>
      <Spinner visible={isLoading} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={60}
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.internalContainer}>
            <Text h1>Book Discovery</Text>
            <Input
              autoCompleteType="username"
              keyboardType={Platform.OS === 'ios' ? 'name-phone-pad' : 'visible-password'}
              textContentType="username"
              returnKeyType="next"
              enablesReturnKeyAutomatically
              onSubmitEditing={() => passwordRef?.current?.focus()}
              onChangeText={setUserName}
              value={userName}
              placeholder="Username"
              leftIcon={<FontAwesome name="user" size={24} color="black" />}
            />
            <Input
              ref={passwordRef}
              textContentType="password"
              secureTextEntry
              returnKeyType="done"
              enablesReturnKeyAutomatically
              onSubmitEditing={submit}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              leftIcon={<FontAwesome name="lock" size={24} color="black" />}
            />
            <Button
              onPress={submit}
              disabled={!fulfilled && !isLoading}
              title={inRegistration ? 'Sign Up' : 'Login'}
              containerStyle={styles.button}
            />
            <Button
              disabled={isLoading}
              onPress={() => setInRegistration(!inRegistration)}
              title={inRegistration ? 'Already have an account? Log In.' : "Don't have an account? Sign Up."}
              type="clear"
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  internalContainer: {
    height: '60%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  externalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    width: 200,
  },
});
