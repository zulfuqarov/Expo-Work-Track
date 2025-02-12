import React, { useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WorkContext } from "../../context/ContextWork";

const Login = () => {
    const navigation = useNavigation();
    const { loginUser } = useContext(WorkContext);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleLogin = () => {
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }
        loginUser(email, password);
    }

    return (
        <View style={styles.container}>
            <Ionicons name="person-circle-outline" size={80} color="#FFA500" style={styles.icon} />
            <Text style={styles.title}>Welcome Back</Text>

            <TextInput
                onChangeText={(text) => setEmail(text)}
                value={email}
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                style={styles.input}
                placeholder="Password"
                secureTextEntry
            />

            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Register bölməsi */}
            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.registerLink}> Sign Up</Text>
                </TouchableOpacity>
            </View>
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
    registerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 25,
    },
    registerText: {
        color: "#666",
        fontSize: 14,
    },
    registerLink: {
        color: "#FFA500",
        fontWeight: "bold",
    },
});

export default Login;
