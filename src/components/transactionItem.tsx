import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TransactionItem({ item, onDelete }) {

    const isIncome = item.type === 'in';

    return (
        <View style={styles.container}>

            <Ionicons
                name={isIncome ? 'arrow-up' : 'arrow-down'}
                size={20}
                color={isIncome ? '#1008f3' : '#F44336'}
            />

            <View style={styles.info}>

                <Text style={styles.value}>
                    {isIncome ? '+' : '-'} R$ {item.value.toFixed(2)}
                </Text>

                <Text style={styles.details}>
                    {item.date} • {item.description || 'Sem descrição'}
                </Text>

            </View>

            <TouchableOpacity onPress={onDelete}>
                <Ionicons name="close" size={18} color="#999" />
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    info: {
        flex: 1,
        marginLeft: 10,
    },

    value: {
        fontWeight: 'bold',
        fontSize: 15,
    },

    details: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
});