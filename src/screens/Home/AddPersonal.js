import React, { useContext, useState } from "react";
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    TouchableWithoutFeedback, Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { WorkContext } from "../../context/ContextWork";

const AddPersonal = () => {

    const { addWorkersFunc, user } = useContext(WorkContext)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [dailySalary, setDailySalary] = useState();

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        position: false,
        dailySalary: false,
    });

    const handleAddUser = () => {
        let formValid = true;
        let newErrors = { ...errors };

        if (!firstName) {
            formValid = false;
            newErrors.firstName = true;
        } else {
            newErrors.firstName = false;
        }

        if (!lastName) {
            formValid = false;
            newErrors.lastName = true;
        } else {
            newErrors.lastName = false;
        }

        if (!position) {
            formValid = false;
            newErrors.position = true;
        } else {
            newErrors.position = false;
        }

        if (!dailySalary) {
            formValid = false;
            newErrors.dailySalary = true;
        } else {
            newErrors.dailySalary = false;
        }

        setErrors(newErrors);

        if (!formValid) {
            Toast.show({
                text1: "Xahiş edirik, bütün xanaları doldurun!",
                type: "error",
            });
            return;
        }


        addWorkersFunc(user.id, {
            firstName,
            lastName,
            position,
            dailySalary,
        })

    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Ionicons name="person-add" size={80} color="#FFA500" style={styles.profileIcon} />
                <Text style={styles.header}>İşçi Əlavə et</Text>

                <TextInput
                    style={[styles.input, errors.firstName && styles.inputError]}
                    placeholder="Ad"
                    value={firstName}
                    onChangeText={setFirstName}
                />
                <TextInput
                    style={[styles.input, errors.lastName && styles.inputError]}
                    placeholder="Soyad"
                    value={lastName}
                    onChangeText={setLastName}
                />
                <TextInput
                    style={[styles.input, errors.position && styles.inputError]}
                    placeholder="Vəzifə"
                    value={position}
                    onChangeText={setPosition}
                />
                <TextInput
                    style={[styles.input, errors.dailySalary && styles.inputError]}
                    placeholder="Gündəlik maaş (AZN)"
                    value={dailySalary}
                    onChangeText={setDailySalary}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
                    <Text style={styles.addButtonText}>Əlavə et</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
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
    profileIcon: {
        marginBottom: 20,
    },
    header: {
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
    inputError: {
        borderColor: "red",
    },
    addButton: {
        backgroundColor: "#FFA500",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default AddPersonal;
