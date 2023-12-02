import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import app from '../utils/conn';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const ConsultDeleteMascota = () => {
    const db = getFirestore(app);
    const [mascotas, setMascotas] = useState([]);
    const [duenios, setDuenios] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const mascotasCollection = collection(db, 'mascotas');
            const mascotasSnapshot = await getDocs(mascotasCollection);
            const mascotasData = mascotasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setMascotas(mascotasData);
            //console.log(mascotas)

            const dueniosCollection = collection(db, 'duenios');
            const dueniosSnapshot = await getDocs(dueniosCollection);
            const dueniosData = dueniosSnapshot.docs.reduce((acc, doc) => {
                acc[doc.id] = doc.data();
                return acc;
            }, {});
            setDuenios(dueniosData);
            //console.log(duenios)
        };

        fetchData();
    }, []);

    const handleDeleteMascota = async (id) => {
        try {
            await deleteDoc(doc(db, 'mascotas', id));
            setMascotas((prevMascotas) => prevMascotas.filter((mascota) => mascota.id !== id));
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    const renderMascotaItem = ({ item }) => (
        <View style={styles.mascotaItem}>
            <View style={styles.containerText}>
                <Text style={styles.text}>Nombre de la mascota: {item.nombre}</Text>
                <Text style={styles.text}>Especie: {item.especie}</Text>
                <Text style={styles.text}>Raza: {item.raza}</Text>
                <Text style={styles.text}>
                    Dueño: {duenios[item.duenio_id]?.nombre} {duenios[item.duenio_id]?.ap_pat} {duenios[item.duenio_id]?.ap_mat}
                </Text>
                <Text style={styles.text}>Estado: {item.status}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteMascota(item.id)} style={styles.buttonDelete}>
                <Text style={styles.deleteButton}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {mascotas.length > 0 ? (
                <FlatList
                    data={mascotas}
                    renderItem={renderMascotaItem}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text>No hay mascotas registradas</Text>
            )}
        </View>
    );
};

export default ConsultDeleteMascota;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2fffe',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mascotaItem: {
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
    containerText: {
        width: '70%',
    },
    buttonDelete: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
