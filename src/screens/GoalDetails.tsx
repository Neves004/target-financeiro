import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import TransactionItem from '@/components/transactionItem';
import { getGoals, deleteTransaction } from '@/storage/ItemStorage';

export default function GoalDetails({ navigation, route }) {

    const { goal: routeGoal } = route.params;

    const [goal, setGoal] = useState(null);

    useFocusEffect(
        useCallback(() => {
            loadGoal();
        }, [])
    );

    async function loadGoal() {
        const goals = await getGoals();
        const found = goals.find(g => g.id === routeGoal.id);
        setGoal(found);
    }

    async function handleDelete(transactionId: string) {
        await deleteTransaction(goal.id, transactionId);
        loadGoal();
    }

    if (!goal) return null;

    const progress = goal.total > 0 ? goal.saved / goal.total : 0;

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('NewGoal', { goal })
                    }
                >
                    <Ionicons name="pencil" size={20} color="#555" />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>{goal.name}</Text>

            <Text style={styles.saved}>
                R$ {goal.saved.toFixed(2)} de R$ {goal.total.toFixed(2)}
            </Text>

            <Text style={styles.percent}>
                {Math.min(100,Math.round(progress * 100))}%
            </Text>

            <View style={styles.progressBar}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${Math.min(progress * 100,100)}%` }
                    ]}
                />
            </View>

            <Text style={styles.sectionTitle}>Transações</Text>

            <FlatList
                data={goal.transactions}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={styles.empty}>
                        Nenhuma transação ainda.
                    </Text>
                }
                renderItem={({ item }) => (
                    <TransactionItem
                        item={item}
                        onDelete={() => handleDelete(item.id)}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    navigation.navigate('NewTransaction', { goal })
                }
            >
                <Text style={styles.buttonText}>Nova transação</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 30,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },

    saved: {
        marginTop: 5,
        color: '#666',
    },

    percent: {
        position: 'absolute',
        right: 20,
        top: 80,
        color: '#4B4FD3',
        fontWeight: 'bold',
        marginTop: 50,
    },

    progressBar: {
        height: 6,
        backgroundColor: '#eee',
        borderRadius: 10,
        marginVertical: 15,
    },

    progressFill: {
        height: 6,
        backgroundColor: '#4B4FD3',
        borderRadius: 10,
    },

    sectionTitle: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
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
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
});