import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import UserProfile from '../Home/UserProfile';
import AddPersonal from '../Home/AddPersonal';
import Personal from '../Home/Personal';
const MyTabs = createBottomTabNavigator()

const UserList = () => (
    <View>
        <Text>User List Screen</Text>
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
                name="Personal"
                component={Personal}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" color={color} size={size} />
                    ),
                    tabBarLabel: 'işçilər',
                    headerShown: false,
                }}
            />
            <MyTabs.Screen
                name="AddPersonal"
                component={AddPersonal}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-add" color={color} size={size} />
                    ),
                    tabBarLabel: 'əlavə et',
                    headerShown: false,
                }}
            />
            <MyTabs.Screen
                name="Profile"
                component={UserProfile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle" color={color} size={size} />
                    ),
                    tabBarLabel: 'Profil',
                    headerTitle: 'Profil',
                }}
            />
        </MyTabs.Navigator>
    )
}

export default BottomNavigation

const styles = StyleSheet.create({})