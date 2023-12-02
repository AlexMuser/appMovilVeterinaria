import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import CreateDuenio from './views/CreateDuenio';
import ConsultDeleteDuenio from './views/ConsultDeleteDuenio';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View style={[styles.container, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Crear Dueño')}>
                <Text style={styles.text}>Dar de alta Dueño</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Consultar/Eliminar Dueño')}>
                <Text style={styles.text}>Consultar los dueños</Text>
            </TouchableOpacity>
        </View>
    );
}

function CreateDuenioScreen({ navigation }) {
    return (
        <CreateDuenio />
    );
}

function ConsultDeleteDuenioScreen({ navigation }) {
    return (
        <ConsultDeleteDuenio />
    );
}

const Stack = createStackNavigator();

const Duenios = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Crear/Consultar Dueño" component={HomeScreen} />
            <Stack.Screen name="Consultar/Eliminar Dueño" component={ConsultDeleteDuenioScreen} />
            <Stack.Screen name="Crear Dueño" component={CreateDuenioScreen} />
        </Stack.Navigator>
    )
}

export default Duenios

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