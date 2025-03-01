import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import WorkTrack from '../Home/WorkTrack';
import WorkHours from '../Home/WorkHours';
import WorkDealy from '../Home/WorkDealy';
import WorkMonth from '../Home/WorkMonth';
import EditWorkersWorkDay from '../Home/EditWorkersWorkDay';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={({ navigation }) => ({
                headerLeft: () => (
                    <MaterialCommunityIcons
                        name="menu"
                        size={30}
                        color="#FF8C00"
                        onPress={() => navigation.toggleDrawer()}
                        style={{ marginLeft: 10 }}
                    />
                ),
                headerStyle: {
                    height: 100,
                },
                drawerActiveTintColor: '#FF8C00',
                drawerInactiveTintColor: '#8E8E8E',
            })}
        >
            <Drawer.Screen
                options={{
                    title: 'Profil',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
                name="Home"
                component={BottomNavigation}
            />
            <Drawer.Screen
                options={{
                    title: 'İşçi Gəlişinin Qeydiyyatı',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
                name="WorkTracking"
                component={WorkTrack} />

            <Drawer.Screen
                options={{
                    title: 'Mesai saatların əlavəsi',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
                name="WorkHours"
                component={WorkHours} />

            <Drawer.Screen
                options={{
                    title: 'Günluk Hesabat',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
                name="WorkDealy"
                component={WorkDealy} />

            <Drawer.Screen
                options={{
                    title: 'Aylıq Hesabat',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
                name="WorkMonth"
                component={WorkMonth} />

            <Drawer.Screen
                options={{
                    title: 'İşçi Gününü və Mesai Düzəliş Et',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
                name="EditWorkersWorkDay"
                component={EditWorkersWorkDay} />

        </Drawer.Navigator>
    );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
