import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Verify from './Verify';
import Dashboard from './Dashboard';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown:false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown:false }} />
        <Stack.Screen name="Verify" component={Verify} options={{ headerShown:false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;