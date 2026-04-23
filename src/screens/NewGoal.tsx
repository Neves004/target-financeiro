import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { addGoal, updateGoal, deleteGoal } from '@/storage/ItemStorage';

export default function NewGoal({ navigation, route }) {

    const { goal } = route.params || {};

    const [name, setName] = useState(goal ? goal.name : '');
    const [value, setValue] = useState(goal ? String(goal.total) : '');

    async function handleSave() {
        if (!name || !value) return;

        const parsedValue = parseFloat(value.replace(',', '.'));

        if (isNaN(parsedValue) || parsedValue <= 0) return;

        try {
            if (goal) {
                await updateGoal({
                    ...goal,
                    name,
                    total: parsedValue,
                });
            } else {
                await addGoal({
                    id: Date.now().toString(),
                    name,
                    total: parsedValue,
                    saved: 0,
                    transactions: [],
                });
            }

            navigation.goBack();
        } catch (error) {
            console.log('Erro ao salvar:', error);
        }
    }

    function handleDelete() {
        if (!goal) return;

        Alert.alert(
            'Excluir meta',
            'Tem certeza que deseja excluir esta meta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteGoal(goal.id);
                        navigation.navigate('Home');
                    },
                },
            ]
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>

                {goal && (
                    <TouchableOpacity onPress={handleDelete}>
                        <Ionicons name="trash" size={22} color="#838383" />
                    </TouchableOpacity>
                )}
            </View>

            <Text style={styles.title}>
                {goal ? 'Editar meta' : 'Nova meta'}
            </Text>

            <Text style={styles.subtitle}>
                Economize para alcançar sua meta financeira.
            </Text>

            <Text style={styles.label}>Nome da meta</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Viagem, Apple Watch..."
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Valor alvo (R$)</Text>
            <TextInput
                style={styles.input}
                placeholder="0,00"
                keyboardType="numeric"
                value={value}
                onChangeText={setValue}
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar</Text>
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
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 30,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },

    subtitle: {
        color: '#666',
        marginBottom: 20,
    },

    label: {
        marginTop: 10,
        marginBottom: 5,
        color: '#555',
    },

    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },

    button: {
        marginTop: 20,
        backgroundColor: '#4B4FD3',
        padding: 15,
        borderRadius: 10,
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
});