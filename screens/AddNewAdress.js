import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Divider, Appbar, TextInput, RadioButton, Button } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

export default function AddNewAdress() {
    const navigation = useNavigation();
    const [direccion, setDireccion] = useState('');
    const [puntoReferencia, setPuntoReferencia] = useState('');
    const [interfon, setInterfon] = useState('');
    const [direccionError, setDireccionError] = useState('');
    const [puntoReferenciaError, setPuntoReferenciaError] = useState('');
    const [interfonError, setInterfonError] = useState('');

    const handleAddAddress = () => {
        if (direccion === '') {
            setDireccionError('Este campo es obligatorio');
        } else {
            setDireccionError('');
        }

        if (puntoReferencia === '') {
            setPuntoReferenciaError('Este campo es obligatorio');
        } else {
            setPuntoReferenciaError('');
        }

        if (interfon === '') {
            setInterfonError('Este campo es obligatorio');
        } else {
            setInterfonError('');
        }

        // Si todos los campos están completos, continuar con la lógica de guardado
        if (direccion !== '' && puntoReferencia !== '' && interfon !== '') {
            console.log('Se puede guardar')
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ marginTop: 200 }}>
                <Text></Text>
                <Divider style={styles.divider} />
            </View>

            <View style={styles.Pin}>
                <Text style={{ color: "#E0A966" }}>Arrastra el pin a la ubicación de entrega</Text>

                <TextInput style={styles.Inputs}
                    label="Dirección y número"
                    theme={{
                        colors: {
                            primary: "#000000",
                            text: "#FFFFFF"
                        }
                    }}
                    mode='outlined'
                    value={direccion}
                    onChangeText={text => setDireccion(text)}
                />
                {direccionError !== '' && <Text style={styles.errorText}>{direccionError}</Text>}

                <TextInput style={styles.Inputs}
                    label="Punto de referencia"
                    theme={{
                        colors: {
                            primary: "#000000",
                            text: "#FFFFFF"
                        }
                    }}
                    mode='outlined'
                    value={puntoReferencia}
                    onChangeText={text => setPuntoReferencia(text)}
                />
                {puntoReferenciaError !== '' && <Text style={styles.errorText}>{puntoReferenciaError}</Text>}

                <TextInput style={styles.Inputs}
                    label="Interfon"
                    theme={{
                        colors: {
                            primary: "#000000",
                            text: "#FFFFFF"
                        }
                    }}
                    mode='outlined'
                    value={interfon}
                    onChangeText={text => setInterfon(text)}
                    keyboardType="numeric"
                />
                {interfonError !== '' && <Text style={styles.errorText}>{interfonError}</Text>}

                <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 20 }}>Guardar como</Text>

            </View>
            
            <View style={styles.radioButtonList}>
                <View style={styles.radioButton}>
                    <Image source={require('../assets/home.png')} style={styles.CasaButton} />
                    <View style={styles.radioButtonText}>
                        <Text>Casa</Text>
                        <RadioButton/>
                    </View>
                </View>
                <View style={styles.radioButton}>
                    <Image source={require('../assets/portfolio.png')} style={styles.CasaButton} />
                    <View style={styles.radioButtonText}>
                        <Text>Trabajo</Text>
                        <RadioButton/>
                    </View>
                </View>
                <View style={styles.radioButton}>
                    <Image source={require('../assets/location.png')} style={styles.CasaButton} />
                    <View style={styles.radioButtonText}>
                        <Text>Otro</Text>
                        <RadioButton/>
                    </View>
                </View>
                <View>
                <Button style={styles.logOutButton} mode="contained" onPress={handleAddAddress}>
                    <Text style={styles.logOutButtonText}>Añadir</Text>
                </Button>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
    },
    divider: {
        alignSelf: "center",
        width: 400,
        height: 1.3,
        backgroundColor: 'black',
    },
    Pin: {
        marginLeft: 20,
        marginTop: 10,
    },
    Inputs: {
        marginTop: 10,
        width: 360,
    },
    errorText: {
        color: 'red',
    },
    radioButtonList: {
        marginTop: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'black',
        marginLeft: 20,
        width: 360,
    },
    CasaButton: {
        width: 20,
        height: 20,
        marginRight: 10,
        borderWidth: 10,
    },
    radioButtonText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logOutButton: {
        alignSelf: 'center',
        borderRadius: 50,
        width: 300,
        height: 40,
        marginTop: 30,
        backgroundColor: 'black',
        marginBottom: 10,
    },
    logOutButtonText:{
        fontSize: 18,
        color: "#FFFFFF",
    }

});
