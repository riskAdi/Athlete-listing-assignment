
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Olympic Athletes' }}
      />
      <Stack.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{ title: '' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default App;