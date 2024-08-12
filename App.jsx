import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/stack/Stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView >
      <AppNavigator />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
