import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function GoalCard({ goal, onPress }) {
    const progress = goal.saved / goal.total;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>

            <View style={styles.header}>
                <Text style={styles.title}>{goal.name}</Text>
                <Ionicons name='chevron-forward' size={20} style={{alignSelf:'center'}}/>
            </View>

            <Text style={styles.value}>
                R$ {goal.saved.toFixed(2)} de R$ {goal.total.toFixed(2)}
            </Text>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    percent: {
        color: '#4B4FD3',
        fontWeight: 'bold',
    },

    value: {
        marginVertical: 5,
        color: '#666',
    },

    progressBar: {
        height: 6,
        backgroundColor: '#ddd',
        borderRadius: 10,
    },

    progressFill: {
        height: 6,
        backgroundColor: '#4B4FD3',
        borderRadius: 10,
    },
});