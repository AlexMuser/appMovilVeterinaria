import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import CreateMascota from './views/CreateMascota';
import ConsultDeleteMascota from './views/ConsultDeleteMascota';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View style={[styles.container, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Crear Mascota')}>
                <Text style={styles.text}>Dar de alta Mascota</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Consultar/Eliminar Mascota')}>
                <Text style={styles.text}>Consultar las Mascotas</Text>
            </TouchableOpacity>
        </View>
    );
}

function CreateMascotaScreen({ navigation }) {
    return (
        <CreateMascota />
    );
}

function ConsultDeleteMascotaScreen({ navigation }) {
    return (
        <ConsultDeleteMascota />
    );
}

const Stack = createStackNavigator();

const Mascotas = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Crear/Consultar Mascota" component={HomeScreen} />
            <Stack.Screen name="Consultar/Eliminar Mascota" component={ConsultDeleteMascotaScreen} />
            <Stack.Screen name="Crear Mascota" component={CreateMascotaScreen} />
        </Stack.Navigator>
    )
}

export default Mascotas

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