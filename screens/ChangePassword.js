import React, { useState, useEffect, useLayoutEffect } from "react";
import { useTheme, TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function ChangePassword() {
    const windowWidth = Dimensions.get('window').width;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const navigation = useNavigation();

    // Limpiar los valores al abrir la pantalla
    useEffect(() => {
        setPassword('');
        setConfirmPassword('');
    }, []);

    const handleSavePassword = async () => {
        if (password.length < 8) {
            setPasswordError("La contraseña debe tener al menos 8 caracteres");
            return;
        } else {
            setPasswordError("");
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Las contraseñas no coinciden");
            return;
        } else {
            setConfirmPasswordError("");
        }

        console.log("Contraseñas válidas. Proceder con el cambio de contraseña.");

        let userEmail = "";

        try {
            const value = await AsyncStorage.getItem('userEmail');
            if (value != null) {
                // Email conseguido desde Editar Perfil
                userEmail = value;
                // Realiza las operaciones necesarias con userEmail
                console.log("Email obtenido desde editar perfil", userEmail);
            }
        } catch (error) {
            // Manejar errores si es necesario
            console.error('Error al obtener userEmail:', error);
        }

        try {
            const value = await AsyncStorage.getItem('userEmailForgotPassword');
            if (value != null) {
                // Email conseguido desde olvidar contraseña
                userEmail = value;
            }
        } catch (error) {
            // Manejar errores si es necesario
            console.error('Error al obtener userEmailForgotPassword:', error);
        }

        const response = await axios.post("http://50.21.186.23:41000/api/v1/users/resetpassword", {
            email: userEmail,
            password: password,
        });

        // Limpia el valor en AsyncStorage
        AsyncStorage.setItem('userEmail', '');

        // Limpia el valor en AsyncStorage
        AsyncStorage.setItem('userEmailForgotPassword', '');

        navigation.navigate('LoginScreen');
    };

    // Ocultar la opción de regresar en el header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => null,
        });
    }, [navigation]);

    return (
        <View style={{ ...styles.container, width: windowWidth - 40 }}>
            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                mode='outlined'
            />
            <Text style={{ color: 'red' }}>{passwordError}</Text>

            <TextInput
                label="Confirmar Contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                mode='outlined'
            />
            <Text style={{ color: 'red' }}>{confirmPasswordError}</Text>

            <Button
                style={styles.saveButton}
                mode="contained"
                onPress={handleSavePassword}
                buttonColor="#000000"
            >
                Guardar Contraseña
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 20,
    },
    saveButton: {
        marginTop: 20,
    }
});
