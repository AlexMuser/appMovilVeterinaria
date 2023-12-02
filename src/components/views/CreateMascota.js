import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import app from "../utils/conn";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const CreateMascota = () => {
    const db = getFirestore(app);
    const [formData, setFormData] = useState(initialsValue());
    const [formError, setFormError] = useState(initialsValueErrors());
    const [duenios, setDuenios] = useState([]); // Estado para almacenar los dueños

    useEffect(() => {
        const fetchData = async () => {
            const dueniosCollection = collection(db, 'duenios');
            const dueniosSnapshot = await getDocs(dueniosCollection);
            const dueniosData = dueniosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setDuenios(dueniosData);
        };

        fetchData();
    }, []);

    function initialsValue() {
        return {
            nombre: "",
            especie: "",
            raza: "",
            duenio_id: "", // Cambié el nombre del atributo de "duenio_id"
            status: "",
        };
    }

    function initialsValueErrors() {
        return {
            nombre: false,
            especie: false,
            raza: false,
            duenio_id: false, // Cambié el nombre del atributo de "duenio_id"
            status: false,
        };
    }

    const createMascota = async () => {
        let errors = initialsValueErrors();
        if (!formData.nombre || formData.nombre.trim().length === 0) {
            errors.nombre = true;
        }
        if (!formData.especie || formData.especie.trim().length === 0) {
            errors.especie = true;
        }
        if (!formData.raza || formData.raza.trim().length === 0) {
            errors.raza = true;
        }
        if (!formData.duenio_id || formData.duenio_id.trim().length === 0) {
            errors.duenio_id = true;
        }

        setFormError(errors);
        if (
            errors.nombre ||
            errors.especie ||
            errors.raza ||
            errors.duenio_id
        ) {
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "mascotas"), {
                nombre: formData.nombre,
                especie: formData.especie,
                raza: formData.raza,
                duenio_id: formData.duenio_id,
                status: "1"
            });
            console.log("Document written with ID: ", docRef.id);
            setFormData((prevData) => ({ ...initialsValue(), ...prevData }));
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.textTitle}>Ingresa los datos</Text>
                    <TextInput
                        style={[
                            styles.input,
                            formError.nombre && { borderColor: 'red' },
                        ]}
                        placeholder="Nombre de la mascota"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => {
                            setFormData({ ...formData, nombre: e.nativeEvent.text });
                        }}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            formError.especie && { borderColor: 'red' },
                        ]}
                        placeholder="Especie"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => {
                            setFormData({ ...formData, especie: e.nativeEvent.text });
                        }}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            formError.raza && { borderColor: 'red' },
                        ]}
                        placeholder="Raza"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => {
                            setFormData({ ...formData, raza: e.nativeEvent.text });
                        }}
                    />
                    <Text style={styles.textBtn}>Dueño</Text>
                    <View style={[styles.inputContainer, formError.mascota_id && { borderColor: 'red' }]}>
                        <Picker
                            selectedValue={formData.duenio_id}
                            style={[
                                styles.picker,
                                formError.duenio_id && { borderColor: 'red' },
                            ]}
                            onValueChange={(itemValue) => {
                                setFormData({ ...formData, duenio_id: itemValue });
                            }}
                        >
                            {/* Mostrar las opciones de los dueños */}
                            {duenios.map((duenio) => (
                                <Picker.Item key={duenio.id} label={duenio.nombre} value={duenio.id} />
                            ))}
                        </Picker>
                    </View>
                    <View style={styles.buttonCreate}>
                        <Text style={styles.textBtn} onPress={createMascota}>
                            Crear Mascota
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateMascota;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e2fffe",
        alignItems: "center",
    },
    textBtn: {
        color: "#5c4a47",
        fontSize: 18,
    },
    button: {
        backgroundColor: "#d7929c",
        padding: 15,
        borderRadius: 40,
        width: "40%",
        alignItems: "center",
    },
    input: {
        height: 50,
        color: "#fff",
        width: "100%",
        backgroundColor: "#d7929c",
        borderRadius: 40,
        borderColor: "#d7929c",
        borderWidth: 1,
        fontSize: 18,
        paddingHorizontal: 40,
        marginBottom: 30,
    },
    login: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20,
    },
    buttonCreate: {
        alignItems: "center",
        bottom: 0,
        marginBottom: 50,
        backgroundColor: "#d7929c",
        padding: 10,
        borderRadius: 40,
        width: "80%",
        marginTop: 50
    },
    inputContainer: {
        width: '60%',
        backgroundColor: "#d7929c",
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },
    picker: {
        color: "#fff",
    },
    textTitle: {
        color: "#5c4a47",
        fontSize: 30,
        marginBottom: 30,
        marginTop: 30,
    }
});
