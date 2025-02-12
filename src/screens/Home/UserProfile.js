import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WorkContext } from "../../context/ContextWork";

const UserProfile = () => {
    const { user, logoutUser } = useContext(WorkContext);



    return (
        <View style={styles.container}>
            <Ionicons name="person-circle-outline" size={100} color="#FFA500" style={styles.profileIcon} />

            <Text style={styles.username}>{user?.name || "User Name"}</Text>
            <Text style={styles.email}>{user?.email || "user@example.com"}</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={logoutUser}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UserProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    profileIcon: {
        marginBottom: 10,
    },
    username: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: "#777",
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: "#FFA500",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    logoutText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
