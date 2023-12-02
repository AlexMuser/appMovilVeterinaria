import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import app from '../utils/conn';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const ConsultDeleteMedico = () => {
    const db = getFirestore(app);
    const [medicos, setMedicos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const medicosCollection = collection(db, 'medicos');
            const medicosSnapshot = await getDocs(medicosCollection);
            const medicosData = medicosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setMedicos(medicosData);
        };

        fetchData();
    }, []);

    const handleDeleteMedico = async (id) => {
        try {
            await deleteDoc(doc(db, 'medicos', id));
            setMedicos((prevMedicos) => prevMedicos.filter((medico) => medico.id !== id));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    const renderMedicoItem = ({ item }) => (
        <View style={styles.medicoItem}>
            <View>
                <Text style={styles.text}>Nombre: {item.nombre}</Text>
                <Text style={styles.text}>Apellido Paterno: {item.ap_pat}</Text>
                <Text style={styles.text}>Apellido Materno: {item.ap_mat}</Text>
                <Text style={styles.text}>Especialidad: {item.especialidad}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteMedico(item.id)}>
                <Text style={styles.deleteButton}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {medicos.length > 0 ? (
                <FlatList data={medicos} renderItem={renderMedicoItem} keyExtractor={(item) => item.id} />
            ) : (
                <Text>No hay médicos registrados</Text>
            )}
        </View>
    );
};

export default ConsultDeleteMedico;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2fffe',
        alignItems: 'center',
        justifyContent: 'center',
    },
    medicoItem: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e2fffe',
        borderRadius: 10,
        padding: 20,
        margin: 10,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    deleteButton: {
        color: 'red',
        fontWeight: 'bold',
    },
});