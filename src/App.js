import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppNavigator from './AppNavigator'

export default class App extends Component {

  render() {
    return <AppNavigator {...this.props} />
  }
}