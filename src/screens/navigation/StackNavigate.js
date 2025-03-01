import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // İkon kütüphanesi

import Login from '../Form/Login'
import Register from './../Form/Register';
import BottomNavigation from './BottomNavigation';
import { WorkContext } from './../../context/ContextWork';
import Loading from '../../components/Loading';
import PersonalDetails from '../Home/PersonalDetails';
import DrawerNavigation from './DrawerNavigation';
import WorkMonthDetailsInfo from '../Home/WorkMonthDetailsInfo';

const MyStack = createStackNavigator()


const StackNavigate = () => {

    return (
        <MyStack.Navigator
        >

            <MyStack.Screen
                name="Loading"
                component={Loading}
                options={{
                    gestureEnabled: false,
                    headerShown: false,
                    cardStyleInterpolator: () => ({
                        cardStyle: { opacity: 1 }
                    }),
                    transitionSpec: {
                        open: { animation: 'timing', config: { duration: 0 } },
                        close: { animation: 'timing', config: { duration: 0 } },
                    }
                }}
            />

            <MyStack.Screen
                name="Login"
                component={Login}
                options={{
                    headerLeft: () => null,
                    gestureEnabled: false,

                }}
            />

            <MyStack.Screen
                name="Register"
                component={Register}
                options={{
                    title: "Register",
                    headerBackTitleStyle: {
                        color: "#FFA500",
                        marginLeft: 2,
                        display: "none"
                    },
                    headerBackImage: () => (
                        <Ionicons style={{ marginLeft: 10 }} name="arrow-back" size={24} color="#FFA500" />
                    ),

                }}
            />

            <MyStack.Screen
                name="PersonalDetails"
                component={PersonalDetails}
                options={{
                    title: "Işçi Haqqında",
                    headerBackTitleStyle: {
                        color: "#FFA500",
                        marginLeft: 2,
                        display: "none"
                    },
                    headerBackImage: () => (
                        <Ionicons style={{ marginLeft: 10 }} name="arrow-back" size={24} color="#FFA500" />
                    ),

                }}
            />

            <MyStack.Screen
                name="WorkMonthDetailsInfo"
                component={WorkMonthDetailsInfo}
                options={{
                    title: "Işçi Məlumatları",
                    headerBackTitleStyle: {
                        color: "#FFA500",
                        marginLeft: 2,
                        display: "none"
                    },
                    headerBackImage: () => (
                        <Ionicons style={{ marginLeft: 10 }} name="arrow-back" size={24} color="#FFA500" />
                    ),
                }}
            />
            
            <MyStack.Screen
                options={{
                    gestureEnabled: false,
                    headerShown: false,
                }}
                name='HomePage'
                component={DrawerNavigation}
            />

        </MyStack.Navigator>
    )


}

export default StackNavigate

const styles = StyleSheet.create({})