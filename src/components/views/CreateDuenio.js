import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react'
import app from "../utils/conn";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const CreateDuenio = () => {
    const db = getFirestore(app);
    const [formData, setFormData] = useState(initialsValue());
    const [formError, setFormError] = useState(initialsValueErrors());

    function initialsValue() {
        return {
            nombre: "",
            ap_pat: "",
            ap_mat: "",
            telefono: "",
            email: "",
            status: "",
        };
    }

    function initialsValueErrors() {
        return {
            nombre: false,
            ap_pat: false,
            ap_mat: false,
            telefono: false,
            email: false,
            status: false,
        };
    }

    const createDuenio = async () => {
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
        if (!formData.telefono || formData.telefono.trim().length === 0) {
            errors.telefono = true;
        }
        if (!formData.email || formData.email.trim().length === 0) {
            errors.email = true;
        }

        setFormError(errors);
        if (
            errors.nombre ||
            errors.ap_pat ||
            errors.ap_mat ||
            errors.telefono ||
            errors.email
        ) {
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "duenios"), {
                nombre: formData.nombre,
                ap_pat: formData.ap_pat,
                ap_mat: formData.ap_mat,
                telefono: formData.telefono,
                email: formData.email,
                status: "1"
            });
            console.log("Document written with ID: ", docRef.id);
            setFormData((prevData) => ({ ...initialsValue(), ...prevData }));
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

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
                        placeholder="Nombre(s)"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => {
                            setFormData({ ...formData, nombre: e.nativeEvent.text });
                        }}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            formError.ap_pat && { borderColor: 'red' },
                        ]}
                        placeholder="Apellido Paterno"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => {
                            setFormData({ ...formData, ap_pat: e.nativeEvent.text });
                        }}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            formError.ap_mat && { borderColor: 'red' },
                        ]}
                        placeholder="Apellido Materno"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => {
                            setFormData({ ...formData, ap_mat: e.nativeEvent.text });
                        }}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            formError.telefono && { borderColor: 'red' },
                        ]}
                        placeholder="Telefono"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => {
                            setFormData({ ...formData, telefono: e.nativeEvent.text });
                        }}
                    />
                    <TextInput
                        style={[
                            styles.input,
                            formError.email && { borderColor: 'red' },
                        ]}
                        placeholder="Correo"
                        placeholderTextColor="#dabdc1"
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.nativeEvent.text });
                        }}
                    />
                    <View style={styles.buttonCreate}>
                        <Text style={styles.textBtn} onPress={createDuenio}>
                            Crear
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CreateDuenio

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
