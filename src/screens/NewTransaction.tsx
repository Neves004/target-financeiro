import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { addTransaction } from '@/storage/ItemStorage';

export default function NewTransaction({ navigation, route }) {

    const { goal } = route.params;

    const [type, setType] = useState<'in' | 'out'>('in');
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');

    async function handleSave() {
        if (!value) return;

        await addTransaction(goal.id, {
            id: Date.now().toString(),
            type,
            value: parseFloat(value.replace(',', '.')),
            description,
            date: new Date().toLocaleDateString(),
        });
        navigation.goBack();
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
            </View>

            <Text style={styles.title}>Nova transação</Text>
            <Text style={styles.subtitle}>
                A cada valor guardado você fica mais próximo da sua meta. Se esforçe para guardar e evite retirar.
            </Text>

            <View style={styles.tabs}>

                <TouchableOpacity
                    style={[styles.tab, type === 'in' && styles.activeTab]}
                    onPress={() => setType('in')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Ionicons name='arrow-up' size={18} color={type==='in'?'white':'gray'} />
                        <Text style={[styles.tabText, type === 'in' && styles.activeTabText]}>
                            Guardar
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, type === 'out' && styles.activeTab]}
                    onPress={() => setType('out')}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Ionicons name='arrow-down' size={18} color={type==='out'?'white':'gray'} />
                        <Text style={[styles.tabText, type === 'out' && styles.activeTabText]}>
                            Resgatar
                        </Text>
                    </View>
                </TouchableOpacity>

            </View>

            <Text style={styles.label}>Valor (R$)</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="50,00"
                value={value}
                onChangeText={setValue}
            />

            <Text style={styles.label}>Motivo (opcional)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Investimento..."
                value={description}
                onChangeText={setDescription}
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
        marginBottom: 10,
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 3,
        marginTop: 10,
    },

    subtitle: {
        color: '#666',
        marginBottom: 20,
    },

    tabs: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        marginTop: 5,
    },

    tab: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
    },

    activeTab: {
        backgroundColor: '#4B4FD3',
    },

    tabText: {
        color: '#666',
        fontWeight: 'bold',
    },

    activeTabText: {
        color: '#fff',
    },

    label: {
        marginTop: 10,
        marginBottom: 5,
        color: '#555',
    },

    input: {
        borderWidth: 0,
        borderBottomWidth:1,
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