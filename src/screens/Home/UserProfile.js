import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WorkContext } from "../../context/ContextWork";

const UserProfile = () => {
    const { user, logoutUser } = useContext(WorkContext);

    return (
        <View style={styles.container}>
            {/* Profil ikonu */}
            <Ionicons name="person-circle-outline" size={100} color="#FFA500" style={styles.profileIcon} />

            {/* Kullanıcı adı */}
            <Text style={styles.username}>{user?.name || "User Name"}</Text>
            
            {/* Kullanıcı email */}
            <Text style={styles.email}>{user?.email || "user@example.com"}</Text>

            {/* Department */}
            <View style={styles.departmentContainer}>
                <Text style={styles.departmentLabel}>Department:</Text>
                <Text style={styles.departmentValue}>{user?.department || "N/A"}</Text>
            </View>

            {/* Çıkış butonu */}
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
        paddingTop: 50,  // Üst kısmı biraz daha boş bırak
    },
    profileIcon: {
        marginBottom: 15,  // İkon ile metin arasındaki mesafeyi artırdık
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
        marginBottom: 15,
    },
    departmentContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
    },
    departmentLabel: {
        fontSize: 16,
        color: "#555",
        fontWeight: "bold",
    },
    departmentValue: {
        fontSize: 16,
        color: "#333",
        marginLeft: 10,
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
