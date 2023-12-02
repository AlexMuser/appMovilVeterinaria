import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import app from "../utils/conn";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateConsulta = () => {
    const db = getFirestore(app);
    const [formData, setFormData] = useState(initialsValue());
    const [formError, setFormError] = useState(initialsValueErrors());
    const [mascotas, setMascotas] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const mascotasCollection = collection(db, 'mascotas');
            const medicosCollection = collection(db, 'medicos');

            const mascotasSnapshot = await getDocs(mascotasCollection);
            const medicosSnapshot = await getDocs(medicosCollection);

            const mascotasData = mascotasSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            const medicosData = medicosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            setMascotas(mascotasData);
            setMedicos(medicosData);
        };

        fetchData();
    }, []);

    function initialsValue() {
        return {
            fecha: "",
            hora: "",
            mascota_id: "",
            medico_id: "",
        };
    }

    function initialsValueErrors() {
        return {
            fecha: false,
            hora: false,
            mascota_id: false,
            medico_id: false,
        };
    }

    const createConsulta = async () => {
        let errors = initialsValueErrors();
        if (!formData.fecha || formData.fecha.trim().length === 0) {
            errors.fecha = true;
        }
        if (!formData.hora || formData.hora.trim().length === 0) {
            errors.hora = true;
        }
        if (!formData.mascota_id || formData.mascota_id.trim().length === 0) {
            errors.mascota_id = true;
        }
        if (!formData.medico_id || formData.medico_id.trim().length === 0) {
            errors.medico_id = true;
        }

        setFormError(errors);
        if (errors.fecha || errors.hora || errors.mascota_id || errors.medico_id) {
            return;
        }

        try {
            const docRef = await addDoc(collection(db, 'consultas'), {
                fecha: formData.fecha,
                hora: formData.hora,
                mascota_id: formData.mascota_id,
                medico_id: formData.medico_id,
            });
            console.log('Document written with ID: ', docRef.id);
            setFormData((prevData) => ({ ...initialsValue(), ...prevData }));
        } catch (error) {
            console.error('Error adding document: ', error);
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimerPicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimerPicker = () => {
        setTimePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        setFormData({ ...formData, fecha: date.toISOString().split('T')[0] });
        hideDatePicker();
    };

    const handleTimeConfirm = (date) => {
        setFormData({ ...formData, hora: date.toISOString().split('T')[1].substring(0, 5) });
        hideTimerPicker();
    };

    return (
        <>
            <Text>Fecha: {formData.fecha}</Text>
            <TouchableOpacity
                style={styles.buttonDatePicker}
                onPress={showDatePicker}
            >
                <Text style={styles.textBtnDatePicker}>Seleccionar Fecha</Text>
            </TouchableOpacity>

            <Text>Hora: {formData.hora}</Text>
            <TouchableOpacity
                style={styles.buttonDatePicker}
                onPress={showTimerPicker}
            >
                <Text style={styles.textBtnDatePicker}>Seleccionar Hora</Text>
            </TouchableOpacity>

            <Text>
                Mascota: {mascotas.find((mascota) => mascota.id === formData.mascota_id)?.nombre}
            </Text>
            <View style={[styles.inputContainer, formError.mascota_id && { borderColor: 'red' }]}>
                <Picker
                    selectedValue={formData.mascota_id}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setFormData({ ...formData, mascota_id: itemValue });
                    }}
                >
                    {/* Mostrar las opciones de las mascotas */}
                    {mascotas.map((mascota) => (
                        <Picker.Item key={mascota.id} label={mascota.nombre} value={mascota.id} />
                    ))}
                </Picker>
            </View>

            <Text>
                Médico: {medicos.find((medico) => medico.id === formData.medico_id)?.nombre}
            </Text>
            <View style={[styles.inputContainer, formError.medico_id && { borderColor: 'red' }]}>
                <Picker
                    selectedValue={formData.medico_id}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                        setFormData({ ...formData, medico_id: itemValue });
                    }}
                >
                    {/* Mostrar las opciones de los médicos */}
                    {medicos.map((medico) => (
                        <Picker.Item key={medico.id} label={medico.nombre} value={medico.id} />
                    ))}
                </Picker>
            </View>
            <View style={styles.buttonLogin}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={createConsulta}
                >
                    <Text style={styles.textBtn}>Crear Consulta</Text>
                </TouchableOpacity>
            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />

            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimerPicker}
            />
        </>
    );
};

export default CreateConsulta;

const styles = StyleSheet.create({
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
        color: "#fff",
        width: "40%",
        backgroundColor: "#d7929c",
        borderRadius: 10,
        marginBottom: 10,
    },
    login: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 20,
    },
    buttonLogin: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 50,
    },
    buttonDatePicker: {
        alignItems: "center",
        backgroundColor: "#d7929c",
        padding: 7,
        borderRadius: 40,
        width: "40%",
        marginBottom: 10,
    },
    textBtnDatePicker: {
        color: "#fff",
        fontSize: 16,
    },
    inputContainer: {
        width: '40%',
        backgroundColor: "#d7929c",
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
    },

    picker: {
        color: "#fff",
    },
});
