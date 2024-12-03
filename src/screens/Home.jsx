import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Gallery from './Gallery';
import Vision from './Vision';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Gallery">
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="Vision" component={Vision} />
    </Stack.Navigator>
  );
}

function Home() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default Home;
