import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FullInfoScreen from "./Screens/FullInfoScreen";
import StateInfoScreen from "./Screens/StateInfoScreen";


const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="FullInfoScreen" screenOptions={{headerShown: false}}>
        <Stack.Screen name="FullInfoScreen" component={FullInfoScreen} />
        <Stack.Screen name="StateInfoScreen" component={StateInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;