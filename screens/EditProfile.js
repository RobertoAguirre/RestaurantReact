import React, { useState } from "react";
import { useTheme, Appbar, Divider, TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Text, Image, KeyboardAvoidingView, ScrollView, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditProfile() {
    const theme = useTheme();
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const navigation = useNavigation();

    const handleSaveProfile = () => {

        if (name.trim() === "") {
            setNameError("El nombre es obligatorio");
        }
        else{
            setNameError("");
        }

        if (!/^\d+$/.test(phoneNumber)) {
            setPhoneNumberError("Ingrese un número de teléfono válido");
        }
        else{
            setPhoneNumberError("");
        }

        if (name.trim() === "" || phoneNumber.trim() === ""){
            console.log('Existe al menos un campo vacio, no se puede guardar')
            return;
        }

        if(name !== '' && phoneNumber !== ''){
            console.log('Se puede guardar perfil');
        }
    };

    return (
        <ScrollView keyboardShouldPersistTaps="always">
            <View>
                <Image source={require('../assets/Salmon.jpg')} style={styles.TopImage} />
                <Image source={require('../assets/Samurai.png')} style={styles.profilePicture} />
            </View>

            <View style={styles.divider}>
                <Text></Text>
                <Divider style={styles.divider} />
            </View>

            <View style={styles.nameInput}>
                <TextInput
                    label="Nombre"
                    value={name}
                    onChangeText={setName}
                    theme={{
                        colors: {
                            primary: "#000000",
                            text: "#FFFFFF"
                        }
                    }}
                    mode='outlined'
                />
                <Text style={{ color: 'red' }}>{nameError}</Text>
            </View>

            <View style={styles.phoneNumberInput}>
                <TextInput
                    label="Número de teléfono"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    theme={{
                        colors: {
                            primary: "#000000",
                            text: "#FFFFFF"
                        }
                    }}
                    keyboardType="numeric"
                    mode='outlined'
                />
                <Text style={{ color: 'red' }}>{phoneNumberError}</Text>
            </View>

            <View>
                <Button buttonColor="#000000" style={styles.editProfileButton} mode="contained" onPress={handleSaveProfile}>
                    <Text style={{ fontSize: 11.5 }}>Guardar Perfil</Text>
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    TopImage: {
        width: '100%',
        height: 200,
    },
    profilePicture: {
        marginTop: 15,
        marginLeft: 15,
        width: 90,
        height: 90,
        borderRadius: 75,
    },
    divider: {
        marginTop: 5,
        alignSelf: "center",
        width: 350,
    },
    nameInput: {
        marginTop: 10,
        marginLeft: 20,
        width: 350,
    },
    phoneNumberInput: {
        marginLeft: 20,
        width: 350,
    },
    editProfileButton: {
        marginTop: 130,
        alignSelf: 'center',
        color: "#FFFFFF",
        borderRadius: 50,
        width: 200,
    }
});
