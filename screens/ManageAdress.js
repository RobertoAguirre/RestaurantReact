import React, { useState } from "react";
import { Appbar, Button, button } from "react-native-paper";
import { ScrollView, View, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function ManageAddress(){

    const navigation = useNavigation();

    return(
        <ScrollView>
            <View>
                <Button type="submit" style={styles.AddAdress} onPress={()=> navigation.navigate('Agregar nueva dirección')} >
                    + Añadir Dirección 
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    AddAdress:{
        marginTop: 10,
        alignSelf: 'center',
        width: 300,
        backgroundColor: '#E0A966',
        borderRadius: 0,
    },

});