import React, { useState } from "react";
import { View, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, useTheme, Button, Text, Divider, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

export default function ForgotPassword() {
    const theme = useTheme();
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        return re.test(email);
    };

    const handleSendLink = () => {
        if (!validateEmail(email)) {
            setEmailError('Ingresa un correo electrónico válido');
        } else {
            setEmailError('');
            console.log('Enviar enlace');
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/LogoAkari.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20 }} />

            <View style={styles.Inputs}>
                <TextInput
                    label="Correo electrónico"
                    style={{ marginBottom: 10, marginTop: 20 }}
                    mode='outlined'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            <View style={styles.buttonContainer}>
                <Button buttonColor="#000000" style={styles.logOutButton} mode="contained" onPress={handleSendLink}>
                    <Text style={styles.SendLinkButtonText}>Enviar enlace</Text>
                </Button>
            </View>
        </View>
    );
}

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
    SendLinkButtonText: {
        color: "#FFFFFF",
    },
    errorText: {
        color: 'red',
    },
});
