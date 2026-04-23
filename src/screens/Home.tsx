import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

import GoalCard from '@/components/goalCard';
import { getGoals } from '@/storage/ItemStorage';
import { Ionicons } from '@expo/vector-icons';

export default function Home({ navigation }) {

    const [goals, setGoals] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadGoals();
        }, [])
    );

    async function loadGoals() {
        const data = await getGoals();
        setGoals(data);
    }

    const totalSaved = goals.reduce((acc, item) => acc + item.saved, 0);

    const totalIncome = goals.reduce(
        (acc, goal) =>
            acc +
            goal.transactions
                .filter(t => t.type === 'in')
                .reduce((sum, t) => sum + t.value, 0),
        0
    );

    const totalExpense = goals.reduce(
        (acc, goal) =>
            acc +
            goal.transactions
                .filter(t => t.type === 'out')
                .reduce((sum, t) => sum + t.value, 0),
        0
    );

    return (
        <View style={styles.container}>

                 <LinearGradient style={styles.header} colors={['#4a2efe', '#1b2685']}>
                <Text style={styles.title}>Total que você possui</Text>
                <Text style={styles.balance}>
                    R$ {totalSaved.toFixed(2)}
                </Text>

                <View style={styles.row}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='arrow-up' size={14} color='#70ff44' />
                            <Text style={styles.title}> Entradas</Text>
                        </View>
                        <Text style={styles.title}>R$ {totalIncome.toFixed(2)}</Text>
                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='arrow-down' size={14} color='#ff4444' />
                            <Text style={styles.title}> Saídas</Text>
                        </View>
                        <Text style={styles.title}>-R$ {totalExpense.toFixed(2)}</Text>
                    </View>

                </View>
                </LinearGradient>

            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Metas</Text>

                <FlatList
                    data={goals}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text style={styles.empty}>
                            Nenhuma meta criada ainda.
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <GoalCard
                            goal={item}
                            onPress={() =>
                                navigation.navigate('GoalDetails', { goal: item })
                            }
                        />
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('NewGoal')}
                >
                    <Text style={styles.buttonText}>Nova meta</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        backgroundColor: '#4B4FD3',
        padding: 20,
        paddingTop: 100,
    },

    title: {
        color: '#ffffff',
    },

    balance: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#6e74aa',
        paddingBottom: 10,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    income: {
        color: '#00E676',
    },

    expense: {
        color: '#FF5252',
    },

    content: {
        flex: 1,
        padding: 20,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede',
        paddingBottom: 10,
    },

    empty: {
        textAlign: 'center',
        color: '#999',
        marginTop: 20,
    },

    button: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#4B4FD3',
        padding: 15,
        borderRadius: 10,
        marginBottom: 40,
    },

    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});