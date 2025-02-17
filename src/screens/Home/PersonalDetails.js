import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useContext, useState } from 'react';
import { WorkContext } from '../../context/ContextWork';
import { useNavigation } from '@react-navigation/native';
import Loading from '../../components/Loading';

const PersonalDetails = ({ route, navigation }) => {
    const { deleteWorkerFunc, updateWorkerFunc } = useContext(WorkContext)

    const [loading, setLoading] = useState(false)
    const [worker, setWorker] = useState(route.params);

    const [isEditing, setIsEditing] = useState(false);
    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            Alert.alert(
                "Yeniləməyi təsdiqlə",
                "Bu işçinin məlumatlarını yeniləmək istədiyinizə əminsiniz?",
                [
                    { text: "İmtina et" },
                    {
                        text: "Yenilə", onPress: async () => {
                            setLoading(true);
                            try {
                               await updateWorkerFunc(worker.id, worker);
                               setLoading(false)
                            } catch (error) {
                                console.log(error);
                                setLoading(false)
                            }
                        }
                    },
                ]
            );
        }
    };

    const handleDelete = () => {
        Alert.alert(
            'Silməyi təsdiq et',
            'Bu işçini silmək istədiyinizə əminsiniz?',
            [
                { text: 'İmtina et' },
                {
                    text: 'Sil', onPress: async () => {
                        setLoading(true)
                        try {
                            await deleteWorkerFunc(worker.id)
                            navigation.goBack()
                        } catch (error) {
                            console.log(error)
                        }

                    }
                },
            ]
        );
    };

    // Handle input changes
    const handleChange = (field, value) => {
        setWorker({
            ...worker,
            [field]: value,
        });
    };

    if (loading) {
        return <Loading />
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.label}>Ad</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={worker.firstName}
                                editable={isEditing}
                                onChangeText={(text) => handleChange('firstName', text)}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{worker.firstName}</Text>
                        )}
                    </View>

                    <View style={styles.cardHeader}>
                        <Text style={styles.label}>Soyad</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={worker.lastName}
                                editable={isEditing}
                                onChangeText={(text) => handleChange('lastName', text)}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{worker.lastName}</Text>
                        )}
                    </View>

                    <View style={styles.cardHeader}>
                        <Text style={styles.label}>Vəzifə</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={worker.position}
                                editable={isEditing}
                                onChangeText={(text) => handleChange('position', text)}
                            />
                        ) : (
                            <Text style={styles.fieldText}>{worker.position}</Text>
                        )}
                    </View>

                    <View style={styles.cardHeader}>
                        <Text style={styles.label}>Gündəlik Maaş </Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={worker.dailySalary}
                                editable={isEditing}
                                onChangeText={(text) => handleChange('dailySalary', text)}
                                keyboardType="numeric"
                            />
                        ) : (
                            <Text style={styles.fieldText}>{worker.dailySalary} ₼</Text>
                        )}
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleEdit}
                    >
                        <Text style={styles.buttonText}>{isEditing ? 'Saxla' : 'Düzəliş'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={handleDelete}
                    >
                        <Text style={styles.buttonText}>Sil</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default PersonalDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 20,
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginRight: 15,
        flex: 1,
    },
    input: {
        height: 45,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        backgroundColor: '#f1f1f1',
        fontSize: 16,
        flex: 2,
    },
    valueText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333', // Bu kısmı belirgin yapmak için
        flex: 2, // Text alanının daha fazla yer kaplaması için
    },
    // Yeni stil: Diğer alanlar için soluk renkler
    fieldText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#777', // Soluk renk
        flex: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#FF8C00', // Turuncu arka plan
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    deleteButton: {
        backgroundColor: '#e74c3c', // Kırmızı silme butonu
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
