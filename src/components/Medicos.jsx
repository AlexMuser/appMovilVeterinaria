import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import CreateMedico from './views/CreateMedico';
import ConsultDeleteMedico from './views/ConsultDeleteMedico';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View style={[styles.container, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Crear Medico')}>
                <Text style={styles.text}>Dar de alta Medico</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Consultar/Eliminar Medico')}>
                <Text style={styles.text}>Consultar los Medicos</Text>
            </TouchableOpacity>
        </View>
    );
}

function CreateMedicoScreen({ navigation }) {
    return (
        <CreateMedico />
    );
}

function ConsultDeleteMedicoScreen({ navigation }) {
    return (
        <ConsultDeleteMedico />
    );
}

const Stack = createStackNavigator();

const Medicos = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Crear/Consultar Medico" component={HomeScreen} />
            <Stack.Screen name="Consultar/Eliminar Medico" component={ConsultDeleteMedicoScreen} />
            <Stack.Screen name="Crear Medico" component={CreateMedicoScreen} />
        </Stack.Navigator>
    )
}

export default Medicos

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#e2fffe",
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        backgroundColor: "#d7929c",
        padding: 10,
        marginBottom: 10,
        borderRadius: 20,
        width: "80%",
        height: 50,
        justifyContent: "center",
    },
    text: {
        fontSize: 18,
        color: "#5c4a47",
    },
})