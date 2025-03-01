import React, { useContext, useState, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { WorkContext } from '../../context/ContextWork';


const EditWorkersWorkDay = () => {

    const { workers } = useContext(WorkContext);

    const [selectedWorker, setSelectedWorker] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateMonth, setSelectedDateMonth] = useState(null);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const formattedDate = currentDate.toLocaleDateString('en-GB').replace(/\//g, '-');

    const handleConfirmDate = (date) => {
        setCurrentDate(date);
        setSelectedDate(date.toLocaleDateString('en-GB').replace(/\//g, '-'));
        setSelectedDateMonth(date.toLocaleDateString('en-GB').replace(/\//g, '-'));
        setDatePickerVisible(false);
    };




    const showDatePicker = () => setDatePickerVisible(true);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>İşçi Siyahısı</Text>
            <FlatList
                data={workers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.workerItem}
                        onPress={() => {
                            setSelectedWorker(item);
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.workerText}>{item.firstName} {item.lastName} - {item.position}</Text>
                    </TouchableOpacity>
                )}
            />

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>İşçi Detayları</Text>
                    {selectedWorker && (
                        <>
                            <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
                                <Text>Tarixi Seç: {selectedDate || 'Seçilməyib'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setSelectedDate(null)} style={styles.datePickerButton}>
                                <Text>Tarixi Sıfırla</Text>
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                date={currentDate}
                                onConfirm={handleConfirmDate}
                                onCancel={() => setDatePickerVisible(false)}
                            />
                            <FlatList
                                data={selectedWorker.workerDay.filter(day => !selectedDate || day.date === selectedDate)}
                                keyExtractor={(item) => item.date}
                                renderItem={({ item }) => (
                                    <View style={styles.dayItem}>
                                        <Text>{item.date} - Status: <Text style={{ color: item.status === "Gəldi" ? "green" : "red" }}>{item.status}</Text> - Saat: {item.workHours}</Text>
                                        <TextInput style={styles.input} placeholder="Yeni saat" keyboardType="numeric" />
                                        <TouchableOpacity style={styles.saveButton}><Text>Yadda saxla</Text></TouchableOpacity>
                                    </View>
                                )}
                            />
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text>Bağla</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    workerItem: { padding: 15, backgroundColor: '#fff', marginVertical: 5, borderRadius: 8 },
    workerText: { fontSize: 16 },
    modalContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    datePickerButton: { padding: 10, backgroundColor: '#e1e1e1', marginBottom: 10, borderRadius: 5 },
    dayItem: { padding: 10, backgroundColor: '#f1f1f1', marginVertical: 5, borderRadius: 5 },
    input: { borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5 },
    saveButton: { padding: 10, backgroundColor: '#4CAF50', marginTop: 5, borderRadius: 5 },
    closeButton: { padding: 10, backgroundColor: '#d9534f', marginTop: 10, borderRadius: 5 },
});

export default EditWorkersWorkDay;
