import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import app from '../utils/conn';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { TouchableOpacity } from 'react-native';

const CreateMedico = () => {
    const db = getFirestore(app);
    const [formData, setFormData] = useState(initialsValue());
    const [formError, setFormError] = useState(initialsValueErrors());

    function initialsValue() {
        return {
            nombre: '',
            ap_pat: '',
            ap_mat: '',
            especialidad: '',
            status: '',
        };
    }

    function initialsValueErrors() {
        return {
            nombre: false,
            ap_pat: false,
            ap_mat: false,
            especialidad: false,
            status: false,
        };
    }

    const createMedico = async () => {
        let errors = initialsValueErrors();
        if (!formData.nombre || formData.nombre.trim().length === 0) {
            errors.nombre = true;
        }
        if (!formData.ap_pat || formData.ap_pat.trim().length === 0) {
            errors.ap_pat = true;
        }
        if (!formData.ap_mat || formData.ap_mat.trim().length === 0) {
            errors.ap_mat = true;
        }
        if (!formData.especialidad || formData.especialidad.trim().length === 0) {
            errors.especialidad = true;
        }

        setFormError(errors);
        if (errors.nombre || errors.ap_pat || errors.ap_mat || errors.especialidad) {
            return;
        }

        try {
            const docRef = await addDoc(collection(db, 'medicos'), {
                nombre: formData.nombre,
                ap_pat: formData.ap_pat,
                ap_mat: formData.ap_mat,
                especialidad: formData.especialidad,
                status: '1',
            });
            console.log('Document written with ID: ', docRef.id);
            setFormData((prevData) => ({ ...initialsValue(), ...prevData }));
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.textTitle}>Ingresa los datos</Text>
                <View style={styles.container}>
                    <TextInput
                        style={[styles.input, formError.nombre && { borderColor: 'red' }]}
                        placeholder="Nombre"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => setFormData({ ...formData, nombre: e.nativeEvent.text })}
                    />
                    <TextInput
                        style={[styles.input, formError.ap_pat && { borderColor: 'red' }]}
                        placeholder="Apellido Paterno"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => setFormData({ ...formData, ap_pat: e.nativeEvent.text })}
                    />
                    <TextInput
                        style={[styles.input, formError.ap_mat && { borderColor: 'red' }]}
                        placeholder="Apellido Materno"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => setFormData({ ...formData, ap_mat: e.nativeEvent.text })}
                    />
                    <TextInput
                        style={[styles.input, formError.especialidad && { borderColor: 'red' }]}
                        placeholder="Especialidad"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => setFormData({ ...formData, especialidad: e.nativeEvent.text })}
                    />
                    <View style={styles.buttonCreate}>
                        <Text style={styles.textBtn} onPress={createMedico}>
                            Crear
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default CreateMedico;

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
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});
