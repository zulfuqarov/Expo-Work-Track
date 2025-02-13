import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { View, StyleSheet, StatusBar } from 'react-native';

// navigate componets start
import StackNavigate from './src/screens/navigation/StackNavigate';
// import BottomNavigation from './src/screens/navigation/BottomNavigation';

// context
import ContextWork from './src/context/ContextWork';



function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <ContextWork>
        <StackNavigate />
        {/* <BottomNavigation /> */}
      </ContextWork>
      <Toast />
    </NavigationContainer>
  );
}



export default App;
