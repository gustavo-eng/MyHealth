import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../drawwNavigator/screens/Home'
import Tela2 from '../drawwNavigator/screens/Tela2'
const   Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={Home}/>
          <Drawer.Screen name="Tela2" component={Tela2}/>
        </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App;

// Gustavo Alexandre Dias  