import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/screens/Login';
import { StatusBar } from 'react-native';
import { BookList } from './src/screens/BookList';
import { Book } from './src/screens/Book';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar translucent barStyle="dark-content" backgroundColor="white" />
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BookList"
          component={BookList}
        />
        <Stack.Screen
          options={{
            title: 'Book synopsis',
          }}
          name="Book"
          component={Book}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
