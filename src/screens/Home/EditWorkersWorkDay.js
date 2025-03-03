import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";
import { WorkContext } from '../../context/ContextWork';

const months = [
    { label: "Yanvar", value: "01" },
    { label: "Fevral", value: "02" },
    { label: "Mart", value: "03" },
    { label: "Aprel", value: "04" },
    { label: "May", value: "05" },
    { label: "İyun", value: "06" },
    { label: "İyul", value: "07" },
    { label: "Avqust", value: "08" },
    { label: "Sentyabr", value: "09" },
    { label: "Oktyabr", value: "10" },
    { label: "Noyabr", value: "11" },
    { label: "Dekabr", value: "12" },
];


const EditWorkersWorkDay = () => {
    const { workers, updateWorkerHours, updateWorkerDay } = useContext(WorkContext);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    // const [selectedDateMonth, setSelectedDateMonth] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isMonthPickerVisible, setMonthPickerVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [expandedCard, setExpandedCard] = useState(null);
    const [expandedStatusCard, setExpandedStatusCard] = useState(null);

    const handleConfirmDate = (date) => {
        setCurrentDate(date);
        setSelectedDate(date.toLocaleDateString('en-GB').replace(/\//g, '-'));
        setDatePickerVisible(false);
        setSelectedMonth(false);
    };


    const showDatePicker = () => setDatePickerVisible(true);

    const toggleExpandCard = (date) => {
        setExpandedCard(expandedCard === date ? null : date);
    };

    const toggleExpandStatusCard = (date) => {
        setExpandedStatusCard(expandedStatusCard === date ? null : date);
    };


    // const filteredData = useMemo(() => {
    //     return selectedWorker.workerDay.filter(day => {
    //         if (selectedDate) {
    //             return day.date === selectedDate;
    //         } else if (!selectedDate && selectedMonth) {
    //             return day.date.split('-')[1] === selectedMonth;
    //         } else {
    //             return true;
    //         }
    //     });
    // }, [selectedWorker.workerDay, selectedDate, selectedMonth]); 


    //update state workerDay start
    const [workerHours, setworkerHours] = useState('')


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
                            <Text style={{
                                fontSize: 14,
                                color: '#333',
                                marginBottom: 5
                            }}>
                                Müəyyən tarixə görə  tap
                            </Text>
                            <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
                                <Text>Tarixi Seç: {selectedDate || 'Seçilməyib'}</Text>
                            </TouchableOpacity>
                            <Text style={{
                                fontSize: 14,
                                color: '#333',
                                marginBottom: 5
                            }}>
                                Müəyyən Ay-a görə  tap
                            </Text>
                            <TouchableOpacity onPress={() => setMonthPickerVisible(true)} style={styles.datePickerButton}>
                                <Text >
                                    <Text>{selectedMonth ? `Seçilen Ay: ${months.find(val => val.value === selectedMonth)?.label}` : "Ay Seç"}</Text>
                                </Text>

                                <Modal visible={isMonthPickerVisible} transparent animationType="slide">
                                    <View style={styles.modalOverlay}>
                                        <View style={styles.modalContent}>
                                            <Text style={styles.modalText}>Ay Seç</Text>
                                            <RNPickerSelect
                                                onValueChange={(value) => setSelectedMonth(value)}
                                                items={months}
                                            />
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setSelectedDate(null);
                                                    setCurrentDate(new Date())
                                                    setMonthPickerVisible(false)
                                                }}
                                                style={styles.confirmButton}>
                                                <Text style={styles.confirmButtonText}>Tamam</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedMonth(null)
                                    setSelectedDate(null)
                                    setCurrentDate(new Date())
                                }}
                                style={styles.datePickerButton}>
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
                                data={selectedWorker.workerDay.filter(day => {
                                    if (selectedDate) {
                                        return day.date === selectedDate;
                                    } else if (!selectedDate && selectedMonth) {
                                        return day.date.split('-')[1] === selectedMonth;
                                    } else {
                                        return true
                                    }
                                })}
                                keyExtractor={(item) => item.date}
                                renderItem={({ item }) => (

                                    <View style={styles.dayItem}>
                                        <Text style={styles.workerName}>{selectedWorker.firstName} {selectedWorker.lastName}</Text>
                                        <Text style={{
                                            paddingBottom: 5,
                                            color: item.status === 'Gəldi' ? '#4CAF50' : '#d9534f'
                                        }}>
                                            {item.status}
                                        </Text>
                                        <Text style={styles.dayText}>{item.date}</Text>
                                        <Text style={styles.dayText}>Mesai saatı:  {item.workHours}</Text>
                                        <TouchableOpacity style={styles.statusButton} onPress={() => toggleExpandStatusCard(item.date)}>
                                            <Text style={styles.statusButtonText}>Qeydiyyat</Text>
                                        </TouchableOpacity>
                                        {expandedStatusCard === item.date && (
                                            <View style={styles.statusButtonsContainer}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        updateWorkerDay(selectedWorker.id, {
                                                            status: "Gəldi",
                                                            date: item.date,
                                                            dailyEarnings: item.dailySalary,
                                                            workHoursSalary: item.workHoursSalary,
                                                            workHours: item.workHours
                                                        })
                                                    }
                                                    }
                                                    style={styles.statusChangeButtonArrived}>
                                                    <Text style={styles.statusChangeButtonText}>Gəldi</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        updateWorkerDay(selectedWorker.id, {
                                                            status: "Gəlmədi",
                                                            date: item.date,
                                                            dailyEarnings: 0,
                                                            workHoursSalary: 0,
                                                            workHours: 0
                                                        })
                                                    }}
                                                    style={styles.statusChangeButtonNoArrived}>
                                                    <Text style={styles.statusChangeButtonText}>Gəlmədi</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        <TouchableOpacity style={styles.changeHoursButton} onPress={() => toggleExpandCard(item.date)}>
                                            <Text style={styles.changeHoursButtonText}>Mesai Saatini Dəyiş</Text>
                                        </TouchableOpacity>
                                        {expandedCard === item.date && (
                                            <View>
                                                <TextInput
                                                    value={workerHours.trim()}
                                                    onChangeText={(text) => setworkerHours(text)}
                                                    style={styles.input}
                                                    placeholder="Yeni saat"
                                                    keyboardType="number-pad"
                                                />
                                                <TouchableOpacity
                                                    onPress={() => {

                                                        if (workerHours.trim() === '') {
                                                            alert('Saatı daxil edin');
                                                            return;
                                                        }

                                                        const updatedWorker = {
                                                            ...selectedWorker,
                                                            workerDay: selectedWorker.workerDay.map(day =>
                                                                day.date === item.date ? { ...day, workHours: parseFloat(workerHours) } : day
                                                            )
                                                        };

                                                        updateWorkerHours(selectedWorker.id, {
                                                            date: item.date,
                                                            workHours: parseFloat(workerHours)
                                                        });

                                                        setSelectedWorker(updatedWorker);
                                                        setworkerHours('');
                                                    }}
                                                    style={styles.changeHoursButtonConfirm}>
                                                    <Text style={styles.changeHoursButtonText}>Yadda saxla</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                )}
                            />
                            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButtonText}>Bağla</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f0f2f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    workerItem: { padding: 15, backgroundColor: '#fff', marginVertical: 8, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    workerText: { fontSize: 18, color: '#333' },
    modalContainer: { flex: 1, padding: 20, backgroundColor: '#fff' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    datePickerButton: { padding: 12, backgroundColor: '#e1e1e1', marginBottom: 12, borderRadius: 8, alignItems: 'center' },
    modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: 300 },
    modalText: { fontSize: 18, marginBottom: 10, color: '#333' },
    confirmButton: { marginTop: 10, backgroundColor: "#4CAF50", padding: 12, borderRadius: 8 },
    confirmButtonText: { color: "white", textAlign: "center", fontWeight: 'bold' },
    dayItem: { padding: 12, backgroundColor: '#f9f9f9', marginVertical: 8, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
    workerName: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    dayText: { fontSize: 16, color: '#666', marginBottom: 10 },
    statusButton: { padding: 10, backgroundColor: '#e1e1e1', borderRadius: 8, alignItems: 'center', marginBottom: 10 },
    statusButtonText: { color: 'black', fontWeight: 'bold' },
    statusButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    statusChangeButtonNoArrived: { padding: 10, backgroundColor: '#d9534f', borderRadius: 8, alignItems: 'center', flex: 1, marginHorizontal: 5 },
    statusChangeButtonArrived: { padding: 10, backgroundColor: '#4CAF50', borderRadius: 8, alignItems: 'center', flex: 1, marginHorizontal: 5 },
    statusChangeButtonText: { color: 'white', fontWeight: 'bold' },
    changeHoursButton: { padding: 10, backgroundColor: '#007BFF', borderRadius: 8, alignItems: 'center', marginBottom: 10 },
    changeHoursButtonConfirm: { padding: 10, backgroundColor: '#4CAF50', borderRadius: 8, alignItems: 'center', width: 130, marginBottom: 10 },
    changeHoursButtonText: { color: 'white', fontWeight: 'bold' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 8, borderRadius: 8 },
    closeButton: { padding: 12, backgroundColor: '#FF8C00', marginTop: 12, borderRadius: 8, alignItems: 'center' },
    closeButtonText: { color: 'white', fontWeight: 'bold' },
});

export default EditWorkersWorkDay;