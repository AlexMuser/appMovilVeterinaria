import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Crear consulta"
                onPress={() => navigation.navigate('Profile')}
            />
            <Button
                title="Consultar consultas"
                onPress={() => navigation.navigate('Profile')}
            />
        </View>
    );
}

function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Notifications"
                onPress={() => navigation.navigate('Notifications')}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

function SettingsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

const Stack = createStackNavigator();

const Consultas = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Crear/Consultar Consultas" component={HomeScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    )
}

export default Consultas

const styles = StyleSheet.create({})