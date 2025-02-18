import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useMemo } from 'react';
import { WorkContext } from './../../context/ContextWork';
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Tarix seçici

const WorkMonth = () => {

    const { workers } = useContext(WorkContext);

    const [filter, setFilter] = useState('all');

    const [currentDate, setCurrentDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const formattedDate = currentDate.toLocaleDateString('en-GB').replace(/\//g, '-');

    const filteredWorkers = useMemo(() => {

        if (filter === 'Gəlmədi') {
            return workers.filter(worker =>
                worker.workerDay.some(day => day.date === formattedDate && day.status === "Gəlmədi")
            );
        }
        if (filter === 'Gəldi') {
            return workers.filter(worker =>
                worker.workerDay.some(day => day.date === formattedDate && day.status === "Gəldi")
            );
        }

        return workers;
    }, [workers, filter]);


    const renderItem = ({ item }) => (
        <View style={styles.userCard}>
            <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
        </View>
    );

    const attendedCount = workers.filter(worker =>
        worker.workerDay.some(day => day.date === formattedDate && day.status === "Gəldi")
    ).length;

    const notAttendedCount = workers.filter(worker =>
        worker.workerDay.some(day => day.date === formattedDate && day.status === "Gəlmədi")
    ).length;

    // Tarixi dəyişmək üçün funksiyanı təyin edirik
    const handleConfirmDate = (date) => {
        setCurrentDate(date);
        setDatePickerVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bugünkü Hesabat</Text>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>Tarix: {formattedDate}</Text>
                    <View style={styles.dateView}>
                        <TouchableOpacity
                            style={styles.changeDateButton}
                            onPress={() => setDatePickerVisible(true)}>
                            <Text style={styles.changeDateButtonText}>Tarixi Dəyiş</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.changeDateButton}
                            onPress={() => setCurrentDate(new Date())}>
                            <Text style={styles.changeDateButtonText}>Tarixi Sıfırla</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.counts}>
                    <Text style={styles.countText}>Gələnlər: {attendedCount}</Text>
                    <Text style={styles.countText}>Gəlməyənlər: {notAttendedCount}</Text>
                </View>

            </View>

            <View style={styles.filterButtons}>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                    onPress={() => setFilter('all')}>
                    <Text style={styles.filterButtonText}>Hamısı</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'Gəldi' && styles.activeFilter]}
                    onPress={() => setFilter('Gəldi')}>
                    <Text style={styles.filterButtonText}>Gələnlər</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'Gəlmədi' && styles.activeFilter]}
                    onPress={() => setFilter('Gəlmədi')}>
                    <Text style={styles.filterButtonText}>Gəlməyənlər</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredWorkers}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
            />

            {/* Tarix Seçici Modal */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={() => setDatePickerVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50,
        // backgroundColor: '#f5f5f5',
    },
    header: {
        width: '100%',
        paddingBottom: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    counts: {
        flexDirection: 'row',
        marginTop: 10,
    },
    countText: {
        fontSize: 16,
        color: '#333',
        marginHorizontal: 10,
    },
    filterButtons: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center',
    },
    filterButton: {
        padding: 10,
        borderRadius: 25,
        marginHorizontal: 5,
        backgroundColor: '#ddd',
    },
    activeFilter: {
        backgroundColor: '#007bff',
    },
    filterButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
    userCard: {
        borderRadius: 15,
        padding: 18,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#ddd',
        minWidth: 320,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    userName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        textAlign: 'left',
        maxWidth: '70%',
    },
    dateContainer: {
        flexDirection: 'col',
        marginTop: 10,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        fontWeight: '500',
        paddingTop: 10,
        paddingBottom: 15,
        color: '#333',
    },
    dateView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },
    changeDateButton: {
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#007bff',
        borderRadius: 20,
    },
    changeDateButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },
    flatListContent: {
        paddingBottom: 20,
    }
});

export default WorkMonth;