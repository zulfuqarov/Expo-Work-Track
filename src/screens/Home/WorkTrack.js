import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo iconlarını kullanmak için
import { WorkContext } from '../../context/ContextWork';




const WorkTrack = () => {

    const { workers, updateWorkerDay } = useContext(WorkContext)

    const date = new Date().toLocaleDateString('en-GB').replace(/\//g, '-')

    const checkDate = workers.map((user) => {
        const todayRecord = user.workerDay ? user.workerDay.find((oneFind) => oneFind.date === date) : null;
        
        const updatedUser = { ...user };


        if (!updatedUser.workerDay) {
            updatedUser.workerDay = [
                {
                    date: date,
                    status: ''
                }
            ];
        } else if (!todayRecord) {

            updatedUser.workerDay = [{
                date: date,
                status: ''
            }];

        } else {
            updatedUser.workerDay = [{ ...todayRecord }];
        }

        return updatedUser;
    });


    const [filter, setFilter] = useState('all');

    const filteredData = checkDate.filter(item =>
        filter === 'all' ? true : item.workerDay[0].status === filter
    );


    const getStatusStyle = (status) => {
        if (status === 'Gəldi') {
            return styles.geldiStatus;
        } else if (status === 'Gəlmədi') {
            return styles.gelmediStatus;
        }
        return styles.defaultStatus;
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Tarix: {date}</Text>
                <View style={styles.filterButtons}>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'Gəldi' && styles.activeFilter]}
                        onPress={() => setFilter('Gəldi')}
                    >
                        <Text style={styles.filterText}>Gələnlər</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'Gəlmədi' && styles.activeFilter]}
                        onPress={() => setFilter('Gəlmədi')}
                    >
                        <Text style={styles.filterText}>Gəlməyənlər</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                        onPress={() => setFilter('all')}
                    >
                        <Text style={styles.filterText}>Hamısı</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Liste */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.workerName}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.workerPosition}>{item.position}</Text>
                        <View style={styles.statusContainer}>
                            <Text style={[styles.statusText, getStatusStyle(item.workerDay[0].status)]}>{item.workerDay[0].status ? item.workerDay[0].status : "---"}</Text>
                            <Text style={styles.timeText}>{item.workerDay[0].date ? item.workerDay[0].date : "---"}</Text>
                        </View>
                        <View style={styles.iconsContainer}>
                            <TouchableOpacity
                                onPress={() => updateWorkerDay(item.id, {
                                    status: "Gəldi",
                                    date: date
                                })}
                                style={styles.iconButton}>
                                <Ionicons name="add-circle-outline" size={40} color="#4CAF50" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => updateWorkerDay(item.id, {
                                    status: "Gəlmədi",
                                    date: date
                                })}
                                style={styles.iconButton}>
                                <Ionicons name="remove-circle-outline" size={40} color="#FF5722" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 20,
    },
    headerContainer: {
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    filterButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#FF8C00',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeFilter: {
        backgroundColor: '#000000',
    },
    filterText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    workerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    workerPosition: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 5,
        color: '#999',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '500',
    },
    timeText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FF5722',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    iconButton: {
        width: 50,
        height: 50,
        backgroundColor: '#f4f4f4',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        transition: 'all 0.3s ease',
    },
    // Renkli status stilleri
    geldiStatus: {
        color: '#4CAF50',
    },
    gelmediStatus: {
        color: '#FF5722',
    },
    defaultStatus: {
        color: '#333',
    },
});

export default WorkTrack;
