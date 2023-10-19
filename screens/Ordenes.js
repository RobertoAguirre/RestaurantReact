import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Appbar, Divider } from 'react-native-paper';
import { BottomNavigation } from 'react-native-paper';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const routes = [
    { key: 'home', title: 'Inicio', icon: 'home' },
    { key: 'orders', title: 'Ordenes', icon: 'clipboard-list' },
    { key: 'cart', title: 'Carrito', icon: 'cart' },
    { key: 'account', title: 'Cuenta', icon: 'account' },
  ];

  function Ordenes() {
    const alertme = () => {
        alert("hola");
        Alert.alert("Bienvenido", "Login exitoso");
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome to the Home Screen!</Text>
            <Button title="Click me" onPress={alertme} />
        </View>
    );
}

export default Ordenes;