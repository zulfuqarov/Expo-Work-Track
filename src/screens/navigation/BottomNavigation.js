import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
            initialRouteName="About"

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
                name="About"
                component={About}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="information-circle" color={color} size={size} />
                    ),
                    tabBarLabel: 'Abouts', // Tab başlığı
                }}
            />
        </MyTabs.Navigator>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({})