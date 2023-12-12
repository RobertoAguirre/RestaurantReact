import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function CodeToChangePassword() {
    const [code, setCode] = useState('');
    const navigation = useNavigation();

    const handleVerify = () => {
        // Lógica de verificación aquí
        console.log('Verificando código', code);

        //Si es correcto 
        navigation.navigate('Cambiar contraseña');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.descriptionText}>Ingresa el código enviado al correo para cambiar la contraseña</Text>
            <TextInput
                label="Ingresa código"
                value={code}
                onChangeText={setCode}
                secureTextEntry
                mode='outlined'
                style={styles.input}
            />
            <Button
                mode="contained"
                onPress={handleVerify}
                style={styles.verifyButton}
                buttonColor='#000000'
            >
                Verificar
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    descriptionText: {
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        marginTop: 10,
    },
    verifyButton: {
        marginTop: 20,
    },
});
