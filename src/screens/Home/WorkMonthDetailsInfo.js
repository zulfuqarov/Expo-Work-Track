import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import React from 'react';





const WorkMonthDetailsInfo = () => {

    const route = useRoute()
    const { worker, formattedDate } = route.params;

    const DaysWorked = worker.workerDay.filter(day => day.date.split("-")[1] === formattedDate.split("-")[1]);
    const totalDaysWorked = DaysWorked.filter(day => day.status === 'Gəldi').length;

    const totalSalaryOverTime = DaysWorked.reduce((sum, day) => sum + (day.workHours * worker.workHoursSalary), 0);
    const totalSalary = (totalDaysWorked * worker.dailySalary) + totalSalaryOverTime;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>İşçi Məlumatları</Text>
            <View style={styles.card}>
                <Text style={styles.info}>Ad: {worker.firstName} {worker.lastName}</Text>
                <Text style={styles.info}>Vəzifə: {worker.position}</Text>
                <Text style={styles.info}>Bu ay qazancı: ${totalSalary}</Text>
                <Text style={styles.info}>İşlədiyi günlər: {totalDaysWorked}</Text>
            </View>
            <Text style={styles.subtitle}>İş Günü Detalları</Text>
            <FlatList
                data={DaysWorked}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.dayCard, item.status === 'Gəlmədi' ? styles.absent : styles.present]}>
                        <Text style={styles.dayText}>{item.date}</Text>
                        <Text style={styles.dayStatus}>{item.status}</Text>
                        <Text style={styles.dayHours}>{item.workHours} saat</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default WorkMonthDetailsInfo;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f4f4f4',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#555',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        marginBottom: 15,
        elevation: 3,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
        color: '#444',
    },
    dayCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 },
        marginVertical: 8,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    dayStatus: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    dayHours: {
        fontSize: 14,
        color: '#666',
    },
    present: {
        borderLeftWidth: 5,
        borderLeftColor: '#28a745',
    },
    absent: {
        borderLeftWidth: 5,
        borderLeftColor: '#dc3545',
    },
});
