import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Dashboard from '../screens/Dashboard';
import Transactions from '../screens/Transactions';
import Clients from '../screens/Clients';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="Clients" component={Clients} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
