import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import Duenios from './Duenios';
import Mascotas from './Mascotas';
import Consultas from './Consultas';
import Medicos from './Medicos';

function ConsultasScreen() {
    return (
        <Consultas />
    );
}

function MascotasScreen() {
    return (
        <Mascotas />
    );
}

function DueniosScreen() {
    return (
        <Duenios />
    );
}

function MedicosScreen() {
    return (
        <Medicos />
    );
}

const Tab = createBottomTabNavigator();

export default function Nav() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Consultas" component={ConsultasScreen} options={{
                            tabBarIcon: ({ focused, color }) => <Ionicons name="ios-list" size={24} color={focused ? 'blue' : 'gray'} />,
                        }} />
                        <Tab.Screen name="Mascotas" component={MascotasScreen} options={{
                            tabBarIcon: ({ focused, color }) => <Ionicons name="ios-paw" size={24} color={focused ? 'blue' : 'gray'} />,
                        }} />
                        <Tab.Screen name="Dueños" component={DueniosScreen} options={{
                            tabBarIcon: ({ focused, color }) => <Ionicons name="ios-person" size={24} color={focused ? 'blue' : 'gray'} />,
                        }} />
                        <Tab.Screen name="Medicos" component={MedicosScreen} options={{
                            tabBarIcon: ({ focused, color }) => <Ionicons name="ios-medkit" size={24} color={focused ? 'blue' : 'gray'} />,
                        }} />
                    </Tab.Navigator>
                </NavigationContainer>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
