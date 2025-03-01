import React, { useContext, useState, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select"

import { WorkContext } from '../../context/ContextWork';

const months = [
    { label: "Harry January", value: "01" },
    { label: "Harry February", value: "02" },
    { label: "Harry March", value: "03" },
    { label: "Harry April", value: "04" },
    { label: "Harry May", value: "05" },
    { label: "Harry June", value: "06" },
    { label: "Harry July", value: "07" },
    { label: "Harry August", value: "08" },
    { label: "Harry September", value: "09" },
    { label: "Harry October", value: "10" },
    { label: "Harry November", value: "11" },
    { label: "Harry December", value: "12" },
];



const EditWorkersWorkDay = () => {

    const { workers } = useContext(WorkContext);

    const [selectedWorker, setSelectedWorker] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateMonth, setSelectedDateMonth] = useState(null);

    const [currentDate, setCurrentDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);

    const handleConfirmDate = (date) => {
        setCurrentDate(date);
        setSelectedDate(date.toLocaleDateString('en-GB').replace(/\//g, '-'));
        setDatePickerVisible(false);
    };

    const handleConfirmMonth = (date) => {
        setCurrentMonth(date);
        setSelectedDateMonth(date.toLocaleDateString('en-GB').replace(/\//g, '-'));
        setMonthPickerVisible(false);
    }



    const showDatePicker = () => setDatePickerVisible(true);
    const showMonthPicker = () => setMonthPickerVisible(true);

    const [selectedMonth, setSelectedMonth] = useState(null);

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
                            {/* <TouchableOpacity onPress={showMonthPicker} style={styles.datePickerButton}>
                                <Text>Tarixi Seç: {selectedDateMonth || 'Seçilməyib'}</Text>
                            </TouchableOpacity> */}
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
                            {/* <DateTimePickerModal
                                isVisible={isMonthPickerVisible}
                                mode="date"
                                display="spinner"
                                date={currentMonth}
                                onConfirm={handleConfirmMonth}
                                onCancel={() => setMonthPickerVisible(false)}
                            /> */}

                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={() => setMonthPickerVisible(true)} style={{ backgroundColor: "orange", padding: 10, borderRadius: 5 }}>
                                    <Text style={{ color: "white" }}>{selectedMonth ? `Seçilen Ay: ${months.find(val => val.value === selectedMonth)?.label}` : "Ay Seç"}</Text>
                                </TouchableOpacity>

                                <Modal visible={isMonthPickerVisible} transparent animationType="slide">
                                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
                                        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: 300 }}>
                                            <Text style={{ fontSize: 18, marginBottom: 10 }}>Ay Seç</Text>
                                            <RNPickerSelect
                                                onValueChange={(value) => setSelectedMonth(value)}
                                                items={months}
                                            />
                                            <TouchableOpacity onPress={() => setMonthPickerVisible(false)} style={{ marginTop: 10, backgroundColor: "green", padding: 10, borderRadius: 5 }}>
                                                <Text style={{ color: "white", textAlign: "center" }}>Tamam</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                            </View>

                            <FlatList
                                data={selectedWorker.workerDay.filter(day => {
                                    if (!selectedDate) {
                                        return true;
                                    } else if (selectedDate && selectedDateMonth) {
                                        day.date.split("-")[1] === selectedDateMonth.split("-")[1];
                                    }
                                    return day.date === selectedDate;
                                })}
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
