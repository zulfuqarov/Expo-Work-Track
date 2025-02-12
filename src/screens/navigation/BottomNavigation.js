import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UserProfile from '../Home/UserProfile';
const MyTabs = createBottomTabNavigator()

const UserList = () => (
    <View>
        <Text>User List Screen</Text>
    </View>
);

const Home = () => (
    <View>
        <Text>Home Screen</Text>
    </View>
);

const About = () => (
    <View>
        <Text>About Screen</Text>
    </View>
);

const BottomNavigation = () => {

    return (
        <MyTabs.Navigator
            initialRouteName="Profile"

            screenOptions={{
                tabBarActiveTintColor: '#FFA500',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <MyTabs.Screen
                name="UserList"
                component={UserList}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                    tabBarLabel: 'Users', // Tab başlığı
                }}
            />
            <MyTabs.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                    tabBarLabel: 'Home', // Tab başlığı
                }}
            />
            <MyTabs.Screen
                name="Profile"
                component={UserProfile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="information-circle" color={color} size={size} />
                    ),
                    tabBarLabel: 'Profile', // Tab başlığı
                }}
            />
        </MyTabs.Navigator>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({})