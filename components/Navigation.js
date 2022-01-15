import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/HomeScreen'
import WatchlistScreen from '../screens/WatchlistScreen'

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#b8c2d1',
                    
                    borderRadius: 20,
                    elevation: 0,
                    
                }                
            }}>
            <Tab.Screen name="Paieška" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="home-search" color={'#5ee669'} size={26} />
                    ),
                }}/>
            <Tab.Screen name="Watchlist" component={WatchlistScreen}
                options={{
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="heart" color={'#fc0303'} size={26} />
                ),
            }}/>
        </Tab.Navigator>
    )
}

export default Navigation
