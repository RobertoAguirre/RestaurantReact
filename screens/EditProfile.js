import React, { useState, useEffect } from "react";
import { useTheme, Appbar, Divider, TextInput, Button } from "react-native-paper";
import { View, StyleSheet, Text, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";

export default function EditProfile() {
    const theme = useTheme();
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nameError, setNameError] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');

                if (userId) {
                    await getUserData(userId);
                } else {
                    console.log("No se encontró un ID de usuario en AsyncStorage.");
                }
            } catch (error) {
                console.error("Error al obtener el ID de usuario desde AsyncStorage:", error);
            }
        };
        fetchUserId();
    }, []);

    const getUserData = async (userId) => {
        try {
            const response = await fetch(`http://50.21.186.23:41000/api/v1/users/${userId}`);
            const data = await response.json();
            console.log("Data from API:", data);

            if (data && data.email && data.username) {
                setName(data.email);
                setPhoneNumber(data.username);

                // Limpia el valor en AsyncStorage
                AsyncStorage.setItem('userEmail', '');

                // Guardar el Mail del usuario en AsyncStorage para verificar junto con su contraseña al editar la contraseña 
                await AsyncStorage.setItem('userEmail', data.email);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    const handleSaveProfile = () => {
        //Modificar perfil
    };

    const windowWidth = Dimensions.get('window').width;

    return (
        <ScrollView keyboardShouldPersistTaps="always">
            <View>
                <Image source={require('../assets/Salmon.jpg')} style={{ ...styles.TopImage, width: windowWidth }} />
                <Image source={require('../assets/Samurai.png')} style={styles.profilePicture} />
            </View>

            <View style={styles.divider}>
                <Text></Text>
                <Divider style={styles.divider} />
            </View>

            <View style={{ ...styles.nameInput, width: windowWidth - 40 }}>
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

            <View style={{ ...styles.phoneNumberInput, width: windowWidth - 40 }}>
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
                <Text style={{ width: windowWidth - 40, marginLeft: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Ingresar contraseña vieja')}>
                        <Text>¿Deseas modificar tu contraseña?</Text>
                    </TouchableOpacity>
                </Text>
            </View>

            <View>
                <Button buttonColor="#000000" style={{ ...styles.editProfileButton, width: windowWidth - 100 }} mode="contained" onPress={handleSaveProfile}>
                    <Text style={{ fontSize: 11.5 }}>Guardar Perfil</Text>
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    TopImage: {
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
        width: '100%',
    },
    nameInput: {
        marginTop: 10,
        marginLeft: 20,
    },
    phoneNumberInput: {
        marginLeft: 20,
        paddingBottom: 10,
    },
    editProfileButton: {
        marginTop: 100,
        alignSelf: 'center',
        color: "#FFFFFF",
        borderRadius: 50,
    }
});