import React, { useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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
            console.log(response.data);
            Alert.alert("Bienvenido", "Login exitoso");
            navigation.navigate('HomeScreen');
        } catch (e) {
            setError(e);
            console.log('Datos incorrectos');
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
