import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import GoalCard from '@/components/goalCard';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';

export type goalType = {
    id: string;
    name: string;
    current: number;
    amount: number;
    transactions: transactionType[];
}

export type transactionType = {
    id: string;
    amount: number;
    observation: string;
    target_id: string;
}

export default function Home({ navigation }: { navigation: any }) {
    const [goals, setGoals] = useState([] as goalType[]);

    //banco de dados
    const db = useSQLiteContext();

    const getAllFromDatabase = async () => {
        let res = await db.getAllAsync(`
            SELECT
                m.id,
                m.name,
                m.amount,
                COALESCE(SUM(t.amount),0) AS current
            FROM targets m
            LEFT JOIN transactions t on t.target_id = m.id
            GROUP BY m.id, m.name, m.amount;
            `) as goalType[];
        res.map((v: goalType) => { return { ...v, transactions: [] } as goalType })
        return res;
    }

    const getGoals = async () => {
        setGoals(await getAllFromDatabase() as goalType[]);
    }

    navigation.addListener('focus', getGoals); //reload quando focar

    useEffect(() => { getGoals(); }, []);

    const calculateTotalMoney = async (): Promise<number> => {
        const total = await calculateGains() - await calculateLosses();
        return total;

    }

    const calculateGains = async (): Promise<number> => {
        let total = (await db.getFirstAsync(`SELECT sum(t.amount) as sum FROM transactions t WHERE t.amount>0`)) as { sum: number };
        return total.sum ?? 0;

    }

    const calculateLosses = async (): Promise<number> => {
        let total = (await db.getFirstAsync(`SELECT sum(t.amount) as sum FROM transactions t WHERE t.amount<0`)) as { sum: number };
        return Math.abs(total.sum) ?? 0;
    }

    return (
        <View style={styles.container}>

            <LinearGradient style={styles.header} colors={['#4a2efe', '#1b2685']}>
                <Text style={styles.title}>Total que você possui</Text>
                <Text style={styles.balance}>
                    R$ {calculateTotalMoney()}
                </Text>

                <View style={styles.row}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='arrow-up' size={14} color='#70ff44' />
                            <Text style={styles.title}> Entradas</Text>
                        </View>
                        <Text style={styles.title}>
                            R$ {calculateGains()}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name='arrow-down' size={14} color='#ff4444' />
                            <Text style={styles.title}> Saídas</Text>
                        </View>
                        <Text style={styles.title}>
                            R$ {calculateLosses()}
                        </Text>
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