import React, { useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
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
        try {
            const response = await axios.post("http://50.21.186.23:41000/api/v1/users/authenticate", {
                email: email,
                password: password,
            });
        
            console.log(response.data);
        
            if (response.data.role === 'admin') {
                // Redirect to admin screen
                Alert.alert("Bienvenido", "Login exitoso como administrador");
                navigation.navigate('AdminHome');
            } else if (response.data.role === 'manager') {
                // Redirect to manager screen
                Alert.alert("Bienvenido", "Login exitoso como manager");
                navigation.navigate('ManagerHome');
            } else if (response.data.role === 'endUser') {
                // Redirect to end user screen
                Alert.alert("Bienvenido", "Login exitoso como usuario final");
                navigation.navigate('Home');
            } else {
                // Handle unexpected role
                Alert.alert("Error", "Rol no reconocido");
            }
        } catch (e) {
            setError(e);
            console.log('Datos incorrectos');
        } finally {
            setLoading(false);
        }
        

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
            navigation.navigate('Home');
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
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require('../assets/akari_logo_register.png')} style={{ width: '20%', height: '30%', alignSelf: 'center', marginTop: 20 }} />
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
                    style={{ marginBottom: 10, width: '90%' }}
                    mode='outlined'
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <TextInput
                    secureTextEntry={true}
                    label="Contraseña"
                    value={password}
                    onChangeText={text => {
                        setPassword(text);
                        setPasswordError('');
                    }}
                    style={{ marginBottom: 10, width: '90%' }}
                    mode='outlined'
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                {error && <Text style={styles.errorText}>Credenciales incorrectas. Inténtalo de nuevo.</Text>}
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
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: '#E0A966', textAlign: 'center' }}>Regístrate</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor:'white'
    },
    Inputs: {
        width: '100%',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 13,
        width: '90%',
    },
    LogInButtonText: {
        color: "#FFFFFF",
    },
    errorText: {
        color: 'red',
    }
});
