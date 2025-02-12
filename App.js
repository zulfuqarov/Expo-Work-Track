import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import 'react-native-gesture-handler';

// navigate componets start
import StackNavigate from './src/screens/navigation/StackNavigate';
// import BottomNavigation from './src/screens/navigation/BottomNavigation';

// context
import ContextWork from './src/context/ContextWork';



function App() {
  return (
    <NavigationContainer>
      <ContextWork>
        <StackNavigate />
        {/* <BottomNavigation /> */}
      </ContextWork>
    </NavigationContainer>

  );
}

export default App;
