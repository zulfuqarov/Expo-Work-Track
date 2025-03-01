import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

import Toast from 'react-native-toast-message';
import { StatusBar } from 'react-native';

// navigate componets start
import StackNavigate from './src/screens/navigation/StackNavigate';

// context
import ContextWork from './src/context/ContextWork';



function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <ContextWork>
        <StackNavigate />
      </ContextWork>
      <Toast />
    </NavigationContainer>
  );
}



export default App;
