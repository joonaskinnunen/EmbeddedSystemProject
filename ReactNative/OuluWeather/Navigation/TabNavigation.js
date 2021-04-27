import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import {HomeStackScreen, TemperatureStackScreen, MoistureStackScreen, LightnessStackScreen, ActivityStackScreen} from '../Components/StackScreens'
import AppContext from '../Components/AppContext'
import axios from 'axios'


const Tab = createMaterialTopTabNavigator();
// const Tab = createBottomTabNavigator();


const TabNavigation = () => {
    const [data, setData] = React.useState([])
    const getData = () => {
        const config = {
            method: 'get',
            url: 'http://ouluweather.herokuapp.com/api/data',
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
        getData()
        const interval_id = setInterval(getData, 10000)
        return () => {
            clearInterval(interval_id)
        }
    }, [])
    return (
        <AppContext.Provider value={data}>
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Home"
                    tabBarPosition= "bottom"
                    screenOptions={({ route }) => ({
                        headerStyle: {
                            backgroundColor: 'blue',
                        },
                        headerTintColor: '#4cdbc4',
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
                            else if (route.name === 'Activity') {
                                iconName = 'walk-outline'
                            }
                            return iconName == 'temperature-high' ? <FontAwesome5 name={iconName} size={23} color={color} /> : <Ionicons name={iconName} size={23} color={color} />;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: '#4cdbc4',
                        inactiveTintColor: 'gray',
                        showIcon: 'true',
                        labelStyle: {
                            textTransform: 'none'
                        },
                        tabStyle: {
                            flexDirection: 'row'
                        }
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
                    <Tab.Screen name="Activity" component={ActivityStackScreen}
                        options={{ title: 'Aktiivisuus' }} />
                </Tab.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )
}

export default TabNavigation