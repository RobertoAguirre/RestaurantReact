import React from "react";
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Button, Text, Divider } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../assets/Salmon.jpg')} style={styles.image} />

            <View style={styles.circleContainer}>
                <Image source={require('../assets/Samurai.png')} style={styles.circle} />
            </View>
            <Text style={styles.name}>{"Marco Antonio Ramos Tadeo"}</Text>
            <Text style={styles.Email}>{"marco@gmail.com"}</Text>

            <View style={styles.buttonContainer}>
                <Button style={styles.EditProfile} mode="contained" onPress={() => navigation.navigate('Editar Perfil')}>
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                </Button>
                <Button style={styles.ManageAddress} mode="contained" onPress={() => navigation.navigate('Administrar dirección')}>
                    <Text style={styles.buttonText}>Administrar dirección</Text>
                </Button>
            </View>

            <View style={styles.dividerContainer}>
                <Text style={styles.dividerText}>Reseñas</Text>
                <Divider style={styles.divider} />
            </View>

            <View style={styles.reviews}>
                <View style={styles.reviewsContent}>
                    <Image source={require('../assets/review.png')} style={styles.reviewsImage} />
                    <Text style={styles.reviewsText}>Aún no has escrito ninguna reseña</Text>
                </View>
            </View>

            <View style={styles.logOutButtonContainer}>
                <Button style={styles.logOutButton} mode="contained" onPress={() => console.log('Cerrar Sesión')}>
                    <Text style={styles.logOutButtonText}>Cerrar Sesión</Text>
                </Button>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 300,
    },
    circleContainer: {
        position: 'absolute',
        top: 220,
        alignSelf: 'center',
        backgroundColor: 'transparent',
    },
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: 'white',
    },
    name: {
        alignSelf: "center",
        marginTop: 80,
        fontSize: 15,
        fontWeight: "bold"
    },
    Email: {
        alignSelf: "center",
        fontSize: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    EditProfile: {
        borderRadius: 50,
        width: 170,
        height: 45,
        marginRight: 10,
        backgroundColor: "#E0A966"
    },
    ManageAddress: {
        borderRadius: 50,
        width: 180,
        height: 45,
        backgroundColor: "#E0A966"
    },
    buttonText: {
        fontSize: 11.5,
        color: "white",
    },
    dividerContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    dividerText: {
        fontSize: 15,
        top: -5,
        paddingHorizontal: 10,
    },
    divider: {
        width: '90%',
        height: 1,
        backgroundColor: 'black',
    },
    logOutButtonContainer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
    },
    logOutButton: {
        borderRadius: 50,
        width: 230,
        height: 45,
        backgroundColor: "#000000"
    },
    reviews: {
        marginTop: 80,
        alignItems: 'center',
    },
    reviewsContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    reviewsText: {
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
        bottom: 70
    },
    reviewsImage: {
        bottom: 70,
        width: 40,
        height: 40,
        marginBottom: 0,
    },
    logOutButtonText: {
        fontSize: 11.5,
        color: "#FFFFFF",
    }
});
