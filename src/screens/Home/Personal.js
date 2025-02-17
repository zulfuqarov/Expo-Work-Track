// import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
// import React, { useContext, useState, useMemo } from 'react';
// import { WorkContext } from './../../context/ContextWork';
// import DateTimePickerModal from "react-native-modal-datetime-picker"; // Tarix seçici

// const Personal = () => {

//     const { workers } = useContext(WorkContext);

//     // Gelib gelmeyenləri filtrələmək üçün state
//     const [filter, setFilter] = useState('all');

//     // Tarix state'i
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [isDatePickerVisible, setDatePickerVisible] = useState(false);

//     // Tarixi göstərmək üçün formatlama (local date format)
//     const formattedDate = currentDate.toLocaleDateString();

//     const filteredWorkers = useMemo(() => {
//         if (filter === 'attended') {
//             return workers.filter(worker => worker.status === 'attended');
//         }
//         if (filter === 'notAttended') {
//             return workers.filter(worker => worker.status === 'notAttended');
//         }
//         return workers; // Bütün işçilər
//     }, [workers, filter]);

//     const renderItem = ({ item }) => (
//         <View style={styles.userCard}>
//             <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
//         </View>
//     );

//     const attendedCount = workers.filter(worker => worker.status === 'attended').length;
//     const notAttendedCount = workers.filter(worker => worker.status === 'notAttended').length;

//     // Tarixi dəyişmək üçün funksiyanı təyin edirik
//     const handleConfirmDate = (date) => {
//         setCurrentDate(date);
//         setDatePickerVisible(false);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Bugünkü Hesabat</Text>
//                 <View style={styles.dateContainer}>
//                     <Text style={styles.dateText}>Tarix: {formattedDate}</Text>
//                     <View style={styles.dateView}>
//                         <TouchableOpacity
//                             style={styles.changeDateButton}
//                             onPress={() => setDatePickerVisible(true)}>
//                             <Text style={styles.changeDateButtonText}>Tarixi Dəyiş</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={styles.changeDateButton}
//                             onPress={() => setCurrentDate(new Date())}>
//                             <Text style={styles.changeDateButtonText}>Tarixi Sıfırla</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 <View style={styles.counts}>
//                     <Text style={styles.countText}>Gələnlər: {attendedCount}</Text>
//                     <Text style={styles.countText}>Gəlməyənlər: {notAttendedCount}</Text>
//                 </View>

//             </View>

//             <View style={styles.filterButtons}>
//                 <TouchableOpacity
//                     style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
//                     onPress={() => setFilter('all')}>
//                     <Text style={styles.filterButtonText}>Hamısı</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.filterButton, filter === 'attended' && styles.activeFilter]}
//                     onPress={() => setFilter('attended')}>
//                     <Text style={styles.filterButtonText}>Gələnlər</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={[styles.filterButton, filter === 'notAttended' && styles.activeFilter]}
//                     onPress={() => setFilter('notAttended')}>
//                     <Text style={styles.filterButtonText}>Gəlməyənlər</Text>
//                 </TouchableOpacity>
//             </View>

//             <FlatList
//                 data={filteredWorkers}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id.toString()}
//                 contentContainerStyle={styles.flatListContent}
//             />

//             {/* Tarix Seçici Modal */}
//             <DateTimePickerModal
//                 isVisible={isDatePickerVisible}
//                 mode="date"
//                 onConfirm={handleConfirmDate}
//                 onCancel={() => setDatePickerVisible(false)}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: 50,
//         // backgroundColor: '#f5f5f5',
//     },
//     header: {
//         width: '100%',
//         paddingBottom: 10,
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     headerText: {
//         fontSize: 24,
//         fontWeight: '600',
//         color: '#333',
//     },
//     counts: {
//         flexDirection: 'row',
//         marginTop: 10,
//     },
//     countText: {
//         fontSize: 16,
//         color: '#333',
//         marginHorizontal: 10,
//     },
//     filterButtons: {
//         flexDirection: 'row',
//         marginBottom: 20,
//         justifyContent: 'center',
//     },
//     filterButton: {
//         padding: 10,
//         borderRadius: 25,
//         marginHorizontal: 5,
//         backgroundColor: '#ddd',
//     },
//     activeFilter: {
//         backgroundColor: '#007bff', 
//     },
//     filterButtonText: {
//         fontSize: 16,
//         fontWeight: '500',
//         color: '#fff',
//     },
//     userCard: {
//         borderRadius: 15,
//         padding: 18,
//         marginBottom: 20,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderWidth: 1.5,
//         borderColor: '#ddd',
//         minWidth: 320,
//         backgroundColor: '#ffffff',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 5,
//     },
//     userName: {
//         fontSize: 18,
//         fontWeight: '500',
//         color: '#333',
//         textAlign: 'left',
//         maxWidth: '70%',
//     },
//     dateContainer: {
//         flexDirection: 'col',
//         marginTop: 10,
//         alignItems: 'center',
//     },
//     dateText: {
//         fontSize: 16,
//         fontWeight: '500',
//         paddingTop: 10,
//         paddingBottom: 15,
//         color: '#333',
//     },
//     dateView:{
//         flexDirection: 'row',
//         justifyContent:'space-between',
//         width: '50%',
//     },
//     changeDateButton: {
//         marginLeft: 10,
//         paddingVertical: 5,
//         paddingHorizontal: 15,
//         backgroundColor: '#007bff',
//         borderRadius: 20,
//     },
//     changeDateButtonText: {
//         fontSize: 14,
//         color: '#fff',
//         fontWeight: '500',
//     },
//     flatListContent: {
//         paddingBottom: 20,
//     }
// });

// export default Personal;

import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { WorkContext } from '../../context/ContextWork'
import Icon from 'react-native-vector-icons/FontAwesome'

const Personal = () => {
    const { navigate } = useNavigation()
    const { workers } = useContext(WorkContext)

    return (
        workers &&
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>İşçilər ({workers.length})</Text>
            </View>

            <FlatList
                data={workers}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigate("PersonalDetails", item)}>
                        <View style={styles.workerCard}>
                            <View style={styles.workerInfo}>
                                <Text style={styles.workerName}>{item.firstName} {item.lastName}</Text>
                                <Text style={styles.workerPosition}>{item.position}</Text>
                            </View>
                            <Icon name="chevron-right" size={24} color="#FF8C00" />
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Personal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    header: {
        backgroundColor: '#FFA500',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3
    },
    headerText: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold'
    },
    workerCard: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 15,
        borderRadius: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3
    },
    workerInfo: {
        flexDirection: 'column',
        flex: 1,
    },
    workerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333'
    },
    workerPosition: {
        fontSize: 14,
        color: '#777'
    }
})

