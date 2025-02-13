import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const users = [
    { id: 1, firstName: 'Ali', lastName: 'Əliyev', status: 'Gəlmiş' },
    { id: 2, firstName: 'Leyla', lastName: 'Hüseynova', status: 'Gəlməyib' },
    { id: 3, firstName: 'Ramin', lastName: 'Quliyev', status: 'Gəlmiş' },
    { id: 4, firstName: 'Zeynəb', lastName: 'Məmmədova', status: 'Gəlməyib' },
    { id: 5, firstName: 'Nicat', lastName: 'Əsədov', status: 'Gəlmiş' },
    { id: 6, firstName: 'Nigar', lastName: 'Abdullayeva', status: 'Gəlməyib' },
    { id: 7, firstName: 'Elçin', lastName: 'Rzayev', status: 'Gəlmiş' },
    { id: 8, firstName: 'Səbinə', lastName: 'İsmayılova', status: 'Gəlməyib' },
    { id: 9, firstName: 'Samir', lastName: 'Cəfərov', status: 'Gəlmiş' },
    { id: 10, firstName: 'Aysel', lastName: 'Məhəmmədova', status: 'Gəlməyib' }
];

const Personal = () => {
    // State to hold the filtered users
    const [filteredUsers, setFilteredUsers] = useState(users);

    const gelib = () => {
        // Filter the users with 'Gəlmiş' status
        const filtered = users.filter((item) => item.status === 'Gəlmiş');
        setFilteredUsers(filtered);  // Update the state with filtered users
    }

    const gelmeyib = () => {
        // Filter the users with 'Gəlməyib' status
        const filtered = users.filter((item) => item.status === 'Gəlməyib');
        setFilteredUsers(filtered);  // Update the state with filtered users
    }

    const renderItem = ({ item }) => (
        <View style={styles.userCard}>
            <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
            <TouchableOpacity
                style={[styles.statusButton, item.status === 'Gəlmiş' ? styles.attended : styles.notAttended]}
                onPress={() => alert(`${item.firstName} ${item.lastName} statusu: ${item.status}`)}
            >
                <Text style={styles.buttonText}>{item.status === 'Gəlmiş' ? 'Gəlmiş' : 'Gəlməyib'}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity
                style={[styles.statusButton, styles.attended]}
                onPress={gelib}
            >
                <Text style={styles.buttonText}>Gəlmiş</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.statusButton, styles.notAttended]}
                onPress={gelmeyib}
            >
                <Text style={styles.buttonText}>Gəlməyib</Text>
            </TouchableOpacity> */}
            <FlatList
                data={filteredUsers}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start', // Kartların yuxarı hissədən başlayaraq ortalanmasına kömək edir
        alignItems: 'center', // Yatay mərkəzləşdirmə
        marginTop: 50, // Yuxarıdan boşluq əlavə edirik ki, kartlar mərkəzdə daha yuxarı yerləşsin
    },
    flatListContent: {
        paddingBottom: 20,
    },
    userCard: {
        borderRadius: 10,
        padding: 16,
        marginBottom: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        minWidth: 300, // Kartın daha böyük görünməsi üçün minimum en
    },
    userName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    statusButton: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 90,
    },
    attended: {
        backgroundColor: '#5cb85c',
    },
    notAttended: {
        backgroundColor: '#d9534f',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 12,
        fontWeight: '500',
    }
});

export default Personal;
