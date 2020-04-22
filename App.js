import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import homeScreen from './app/screens/homeScreen';
import searchScreen from './app/screens/searchScreen';

const MainStack = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="Home" component={homeScreen} />
        <MainStack.Screen name="Two" component={searchScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
