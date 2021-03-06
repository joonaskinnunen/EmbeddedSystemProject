import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import {HomeStackScreen, TemperatureStackScreen, MoistureStackScreen, LightnessStackScreen, ActivityStackScreen} from '../Components/StackScreens'
import AppContext from '../Components/AppContext'
import axios from 'axios'
import {Platform} from 'react-native'


const Tab = createMaterialTopTabNavigator();
// const Tab = createBottomTabNavigator();


const TabNavigation = () => {
    const [actData, setActData] = React.useState([{}])
    const [data, setData] = React.useState([])
    const values = {
        data: data,
        actData: actData,
        setActData: setActData
    }
    console.log('values: ', values)
    const getData = () => {
        const config = {
            method: 'get',
            ...Platform.select({
                ios: {
                    url: 'http://localhost:3001/api/data'    
                },
                android: {
                    url: 'http://ouluweather.herokuapp.com/api/data'
                },
                default: {
                    url: 'http://localhost:3001/api/data', 
                }
              }),
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
        <AppContext.Provider value={values}>
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
                        ...Platform.select({
                            android: {
                                showLabel: false
                            },
                            ios: {
                                showLabel: false
                            },
                            default: {
                                tabStyle: {flexDirection: 'row'},
                            }
                        })
                    }}
                >
                    <Tab.Screen name="Home" component={HomeStackScreen}
                        options={{ title: 'Koti' }} />
                    <Tab.Screen name="Temperature" component={TemperatureStackScreen}
                        options={{ title: 'L??mp??tila' }} />
                    <Tab.Screen name="Moisture" component={MoistureStackScreen}
                        options={{ title: 'Ilman kosteus' }} />
                    <Tab.Screen name="Lightness" component={LightnessStackScreen}
                        options={{ title: 'Valon m????r??' }} />
                    <Tab.Screen name="Activity" component={ActivityStackScreen}
                        options={{ title: 'Aktiivisuus' }} />
                </Tab.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )
}

export default TabNavigation