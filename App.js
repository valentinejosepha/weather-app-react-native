import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import homeScreen from './app/screens/homeScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={homeScreen}
        options={{
          title: '🌤 Cityweather',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;