import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import TemperatureScreen from './TemperatureScreen'
import MoistureScreen from './MoistureScreen'
import LightnessScreen from './LightnessScreen'

const screenOptions = {
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
}

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
    screenOptions={screenOptions}
    >
      <HomeStack.Screen name="Home" component={HomeScreen}
        options={{ title: 'Sää nyt'}} />
    </HomeStack.Navigator>
  )
}

const TemperatureStackScreen = () => {
  return (
    <HomeStack.Navigator
    screenOptions={screenOptions}
    >
      <HomeStack.Screen name="Temperature" component={TemperatureScreen}
        options={{ title: 'Lämpötila'}}/>
    </HomeStack.Navigator>
  )
}

const MoistureStackScreen = () => {
  return (
    <HomeStack.Navigator
    screenOptions={screenOptions}
    >
      <HomeStack.Screen name="Moisture" component={MoistureScreen}
        options={{ title: 'Ilmankosteus'}}/>
    </HomeStack.Navigator>
  )
}

const LightnessStackScreen = () => {
  return (
    <HomeStack.Navigator
    screenOptions={screenOptions}
    >
      <HomeStack.Screen name="Lightness" component={LightnessScreen}
        options={{ title: 'Valon määrä'}}/>
    </HomeStack.Navigator>
  )
}

export {HomeStackScreen, TemperatureStackScreen, MoistureStackScreen, LightnessStackScreen}