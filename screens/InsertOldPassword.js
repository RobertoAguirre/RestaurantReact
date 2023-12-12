import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function InsertOldPassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [userMail, setUserMail] = useState('');
    const [showError, setShowError] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserMail = async () => {
            try {
                const mail = await AsyncStorage.getItem('userEmail');
                setUserMail(mail);
            } catch (error) {
                console.error('Error al obtener el correo electrónico del usuario desde AsyncStorage:', error);
            }
        };
        fetchUserMail();
    }, []);

    const handlePasswordChange = async () => {
        try {
            const response = await axios.post('http://50.21.186.23:41000/api/v1/users/authenticate', {
                email: userMail,
                password: oldPassword,
            });

            if (response.data.access) {
                navigation.navigate('Cambiar contraseña');
            } else {
                setShowError(true);
            }
        } catch {
            // Eliminar console.error
            setShowError(true);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ingresa tu contraseña anterior antes de cambiar a una nueva</Text>
            <TextInput
                style={styles.input}
                label="Contraseña Vieja"
                value={oldPassword}
                onChangeText={(text) => {
                    setOldPassword(text);
                    setShowError(false); // Ocultar el mensaje de error al escribir
                }}
                secureTextEntry
                theme={{
                    colors: {
                        primary: '#000000',
                        text: '#FFFFFF',
                    },
                }}
                mode="outlined"
            />
            {showError && (
                <Text style={styles.errorText}>Contraseña incorrecta</Text>
            )}
            <Button
                mode="contained"
                onPress={handlePasswordChange}
                style={styles.button}
                labelStyle={styles.buttonLabel}
            >
                Cambiar Contraseña
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
        width: '100%',
    },
    input: {
        width: '100%',
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        alignSelf: 'flex-start',
    },
    button: {
        width: '100%',
        backgroundColor: '#000000',
        marginTop: 15,
    },
    buttonLabel: {
        color: '#FFFFFF',
    },
});
