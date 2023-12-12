import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Limpiar los valores al abrir la pantalla
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Restablecer los valores al volver a la pantalla
            setEmail('');
            setPassword('');
            setError(null);
            setEmailError('');
            setPasswordError('');
        });

        // Limpiar el efecto
        return unsubscribe;
    }, [navigation]);

    const authenticate = async () => {
        setLoading(true);
        setError(null);

        let isValid = true;

        if (!email) {
            setEmailError('El correo electrónico es requerido');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('La contraseña es requerida');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!isValid) {
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://50.21.186.23:41000/api/v1/users/authenticate", {
                email: email,
                password: password,
            });

            console.log("Response from server:", response.data); // Verificar la estructura de la respuesta

            // Verificar si la respuesta contiene la información esperada con 'id' en lugar de '_id'
            if (response.data.access && response.data.id) {
                const userId = response.data.id; // Acceder al ID de usuario utilizando 'id'

                // Guardar el ID del usuario en AsyncStorage y el email para actualizar datos en un futuro
                await AsyncStorage.setItem('userId', userId);

                Alert.alert("Bienvenido", "Login exitoso");
                navigation.navigate('Editar Perfil');
            }
        } catch (error) {
            // Manejar el error aquí
            console.error('Error al autenticar usuario:', error);
            setError('Error al autenticar usuario.');
        } finally {
            setLoading(false);
        }
    };

    const RegistratePress = async () => {
        console.log('Regístrate');
    };

    return (
        <View style={styles.Container}>
            <Image source={require('../assets/LogoAkari.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20 }} />
            <Text style={{ textAlign: 'center', margin: 20, fontWeight: 'bold' }}>
                Ingresa tu información para acceder
            </Text>
            <View style={styles.Inputs}>
                <TextInput
                    label="Correo electrónico"
                    value={email}
                    onChangeText={text => {
                        setEmail(text);
                        setEmailError('');
                    }}
                    style={{ marginBottom: 10 }}
                    mode='outlined'
                />
                {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
                <TextInput
                    secureTextEntry={true}
                    label="Contraseña"
                    value={password}
                    onChangeText={text => {
                        setPassword(text);
                        setPasswordError('');
                    }}
                    style={{ marginBottom: 10 }}
                    mode='outlined'
                />
                {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
                {error && <Text style={{ color: 'red', marginBottom: 10 }}>Credenciales incorrectas. Inténtalo de nuevo.</Text>}
            </View>
            <Text style={{ textAlign: 'right', marginTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate('¿Olvidaste tu contraseña?')}>
                    <Text>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>
            </Text>
            <View style={styles.buttonContainer}>
                <Button buttonColor="#000000" style={styles.logOutButton} mode="contained" onPress={authenticate}>
                    <Text style={styles.LogInButtonText}>Iniciar Sesión</Text>
                </Button>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>
                <Text style={{ textAlign: 'center' }}>¿No tienes cuenta?{' '}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Registrarse')}>
                    <Text style={{ color: '#E0A966', textAlign: 'center' }}>Regístrate</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        alignSelf: 'center',
    },
    Inputs: {
        width: 300,
    },
    buttonContainer: {
        marginTop: 13,
        width: 300,
    },
    LogInButtonText: {
        color: "#FFFFFF",
    }
});
