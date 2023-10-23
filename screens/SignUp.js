import React, { useState } from "react";
import { View, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, useTheme, Button, Text, Divider, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function SingUp() {

    const theme = useTheme();
    const navigation = useNavigation();


    const [role, setRole] = useState('admin');
    const [application, setApplication] = useState('restaurant');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        fullNameError: '',
        emailError: '',
        phoneNumberError: '',
        passwordError: '',
        confirmPasswordError: ''
    });



    const handleSignUp = () => {
        const errorsCopy = { ...errors };
        errorsCopy.fullNameError = fullName ? '' : 'El campo no puede quedar vacío';
        errorsCopy.emailError = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email) ? '' : 'Ingresa un correo electrónico válido';
        errorsCopy.phoneNumberError = phoneNumber ? '' : 'El campo no puede quedar vacío';
        errorsCopy.passwordError = password.length >= 8 ? '' : 'La contraseña debe tener al menos 8 caracteres';
        errorsCopy.confirmPasswordError = password === confirmPassword ? '' : 'Las contraseñas no coinciden';
        setErrors(errorsCopy);

        const noErrors = Object.values(errorsCopy).every(error => error === '');

        if (noErrors) {
            authenticate();
        }

    };

    const clearFields = () => {
        setEmail('');
        setFullName('');
        setPhoneNumber('');
        setPassword('');
        setApplication('restaurant');
        setRole('admin');
        setConfirmPassword('');
    };



    const authenticate = async () => {
        if (loading) {
            return;
        }

        setLoading(true);
        //setErrors(null);
        console.log('Valor de nombre', fullName);

        try {
            const response = await axios.post("http://50.21.186.23:41000/api/v1/users/", {
                email: email,
                fullName: fullName,
                password: password,
                role: role,
                application: application,
                username: phoneNumber,
            });

            console.log(response.data);
            clearFields();
            navigation.navigate('HomeScreen');
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };



    return (
        <ScrollView>
            <View style={styles.container}>

                <Image source={require('../assets/LogoAkari.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20 }} />

                <Text style={{ textAlign: 'center', margin: 20, fontWeight: 'bold' }}>
                    Ingresa tu información para registrarte
                </Text>

                <View style={styles.Inputs}>
                    <TextInput
                        label="Nombre Completo"
                        style={{ marginBottom: 10 }}
                        mode='outlined'
                        value={fullName}
                        onChangeText={text => setFullName(text)}
                    />
                    {errors.fullNameError ? <Text style={styles.errorText}>{errors.fullNameError}</Text> : null}
                    <TextInput
                        label="Correo electrónico"
                        style={{ marginBottom: 10 }}
                        mode='outlined'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    {errors.emailError ? <Text style={styles.errorText}>{errors.emailError}</Text> : null}
                    <TextInput
                        label="Número de teléfono"
                        style={{ marginBottom: 10 }}
                        mode='outlined'
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                        keyboardType="numeric"
                    />
                    {errors.phoneNumberError ? <Text style={styles.errorText}>{errors.phoneNumberError}</Text> : null}
                    <PasswordInput
                        label="Contraseña"
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    {errors.passwordError ? <Text style={styles.errorText}>{errors.passwordError}</Text> : null}
                    <PasswordInput
                        label="Confirmar contraseña"
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                    />
                    {errors.confirmPasswordError ? <Text style={styles.errorText}>{errors.confirmPasswordError}</Text> : null}
                </View>

                <View style={styles.buttonContainer}>
                    <Button buttonColor="#000000" style={styles.logOutButton} mode="contained" onPress={handleSignUp}>
                        <Text style={styles.SignUpButtonText}>Registrarse</Text>
                    </Button>
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 15 }}>
                    <Text style={{ textAlign: 'center' }}>Ya tienes una cuenta{' '}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={{ color: '#E0A966', textAlign: 'center' }}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    );
}

const PasswordInput = ({ label, value, onChangeText }) => {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <View style={{ marginBottom: 10 }}>
            <TextInput
                label={label}
                style={{ marginBottom: 10 }}
                mode='outlined'
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isHidden}
            />
            <TouchableOpacity
                style={{ position: 'absolute', right: 10, top: 35 }}
                onPress={() => setIsHidden(!isHidden)}
            >
                <Text>{isHidden ? 'Mostrar' : 'Ocultar'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        alignSelf: 'center'
    },
    Inputs: {
        width: 300,
    },
    buttonContainer: {
        marginTop: 13,
        width: 300,
    },
    SignUpButtonText: {
        color: "#FFFFFF",
    },
    errorText: {
        color: 'red',
    }

});
