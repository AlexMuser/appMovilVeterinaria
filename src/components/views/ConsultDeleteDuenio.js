import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import app from '../utils/conn';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const ConsultDeleteDuenio = () => {
    const db = getFirestore(app);
    const [duenios, setDuenios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const dueniosCollection = collection(db, 'duenios');
            const dueniosSnapshot = await getDocs(dueniosCollection);
            const dueniosData = dueniosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setDuenios(dueniosData);
        };

        fetchData();
    }, []);

    const handleDeleteDuenio = async (id) => {
        try {
            await deleteDoc(doc(db, 'duenios', id));
            setDuenios((prevDuenios) => prevDuenios.filter((duenio) => duenio.id !== id));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    const renderDuenioItem = ({ item }) => (
        <View style={styles.duenioItem}>
            <View>
                <Text style={styles.text}>Nombre: {item.nombre}</Text>
                <Text style={styles.text}>Apellido Paterno: {item.ap_pat}</Text>
                <Text style={styles.text}>Apellido Materno: {item.ap_mat}</Text>
                <Text style={styles.text}>Teléfono: {item.telefono}</Text>
                <Text style={styles.text}>Correo: {item.email}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteDuenio(item.id)}>
                <Text style={styles.deleteButton}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {duenios.length > 0 ? (
                <FlatList
                    data={duenios}
                    renderItem={renderDuenioItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text>No hay dueños registrados</Text>
            )}
        </View>
    );
};

export default ConsultDeleteDuenio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2fffe',
        alignItems: 'center',
        justifyContent: 'center',
    },
    duenioItem: {
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
