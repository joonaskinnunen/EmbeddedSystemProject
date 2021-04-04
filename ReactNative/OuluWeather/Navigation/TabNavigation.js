import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import {HomeStackScreen, TemperatureStackScreen, MoistureStackScreen, LightnessStackScreen} from '../Components/StackScreens'
import AppContext from '../Components/AppContext'
import axios from 'axios'


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    const [data, setData] = React.useState([])
    const getData = () => {
        const config = {
            method: 'get',
            url: 'http://localhost:3001/api/data',
        }
        axios(config)
        .then(response => {
            setData(response.data)
        })
        .catch(error => {
          console.log('Error: ' + error.message)
        })
    }
    React.useEffect(() => {
        const interval_id = setInterval(getData, 1000)
        return () => {
            clearInterval(interval_id)
        }
    }, [])
    return (
        <AppContext.Provider value={data}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Home"
                    screenOptions={({ route }) => ({
                        headerStyle: {
                            backgroundColor: '#f4511e',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = 'home'
                            } else if (route.name === 'Temperature') {
                                iconName = 'temperature-high'
                            }
                            else if (route.name === 'Moisture') {
                                iconName = 'water'
                            }
                            else if (route.name === 'Lightness') {
                                iconName = 'sunny'
                            }
                            return iconName == 'temperature-high' ? <FontAwesome5 name={iconName} size={size} color={color} /> : <Ionicons name={iconName} size={size} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Home" component={HomeStackScreen}
                        options={{ title: 'Koti' }} />
                    <Tab.Screen name="Temperature" component={TemperatureStackScreen}
                        options={{ title: 'Lämpötila' }} />
                    <Tab.Screen name="Moisture" component={MoistureStackScreen}
                        options={{ title: 'Ilman kosteus' }} />
                    <Tab.Screen name="Lightness" component={LightnessStackScreen}
                        options={{ title: 'Valon määrä' }} />
                </Tab.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )
}

export default TabNavigation