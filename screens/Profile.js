import React from "react";
import { View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Avatar, useTheme, Button, Text, Divider } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';


export default function Profile() {
    const theme = useTheme();
    const navigation = useNavigation();

    return (
<SafeAreaView>
        <View style={styles.container}>
            <Image source={require('../assets/Salmon.jpg')} style={styles.image} />

            <View style={styles.circleContainer}>
                <Image source={require('../assets/Samurai.png')} style={styles.circle} />
            </View>
            <Text style={styles.name}>{"Marco Antonio Ramos Tadeo"}</Text>
            <Text style={styles.Email}>{"marco@gmail.com"}</Text>

            <View style={styles.buttonContainer}>
                <Button buttonColor="#E0A966" style={styles.EditProfile} mode="contained" onPress={() => navigation.navigate('Editar Perfil')}>
                    <Text style={styles.buttonText}>Editar Perfil</Text>
                </Button>
                <Button buttonColor="#E0A966" style={styles.ManageAddress} mode="contained" onPress={() => navigation.navigate('Administrar dirección')}>
                    <Text style={styles.buttonText}>Administrar dirección</Text>
                </Button>
            </View>

            <View style={styles.divider}>
                <Text style={styles.dividerText}>Reseñas</Text>
                <Divider style={styles.divider} />
            </View>

            <View sytle = {styles.reviews}>   
                <Image source={require('../assets/review.png')} style={styles.reviewsImage} />
                <Text style={styles.reviewsText}> Aún no has escrito ninguna reseña</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button buttonColor="#000000" style={styles.logOutButton} mode="contained" onPress={() => console.log('Cerrar Sesión')}>
                    <Text style={styles.logOutButtonText}>Cerrar Sesión</Text>
                </Button>
            </View>

        </View>
</SafeAreaView>
        
    )
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
        width: 'auto',
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 80,
        fontSize: 15,
        fontWeight: "bold"
    },
    Email: {
        width: 'auto',
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        fontSize: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    EditProfile: {
        borderRadius: 50,
        width: 170,
        height: 45,
        marginRight: 10,
    },
    ManageAddress: {
        borderRadius: 50,
        width: 180,
        height: 45,
    },
    buttonText: {
        fontSize: 11.5,
    },
    dividerText: {
        marginTop: 50,
        fontSize: 15,
        position: 'absolute',
        top: -30,
    },
    divider: {
        marginTop: 40,
        alignSelf: "center",
        width: 350,
    },
    logOutButton: {
        borderRadius: 50,
        width: 230,
        height: 45,
        marginTop: 220
    },
    reviews:{
        
    },
    reviewsText:{
        width: 'auto',
        height: 30,
        alignSelf: "center",
        marginTop: 10,
        fontSize: 12,
    },
    reviewsImage:{
        width: '10%',
        height: 40,
        alignSelf: 'center',
        marginTop: 80,
    },
    logOutButtonText:{
        fontSize: 11.5,
        color: "#FFFFFF",
    }
});
