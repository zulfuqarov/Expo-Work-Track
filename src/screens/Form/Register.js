import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WorkContext } from "../../context/ContextWork";
import Toast from "react-native-toast-message";

const Register = () => {

    const { signUp } = useContext(WorkContext)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = () => {
        if (!email || !password || !confirmPassword || !name) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "Bütün sahələri doldurun, zəhmət olmasa.",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
            return;
        }

        if (password !== confirmPassword) {
            // ✅ Xəta: Şifrələr eyni deyil
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "Şifrələr eyni deyil.",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
            return;
        } else {
            signUp(email, password, name);
        }
    };


    return (
        <View style={styles.container}>
            <Ionicons name="person-add-outline" size={80} color="#FFA500" style={styles.icon} />
            <Text style={styles.title}>Create an Account</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
                keyboardType="default"
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    icon: {
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#FFA500",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    loginContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
    },
    loginText: {
        color: "#666",
        fontSize: 14,
    },
    loginLink: {
        color: "#FFA500",
        fontWeight: "bold",
    },
});

export default Register;
