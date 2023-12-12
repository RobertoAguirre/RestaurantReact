import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { IconButton } from 'react-native-paper'; // Asegúrate de importar IconButton

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import EditProfile from "./screens/EditProfile";
import ManageAddress from "./screens/ManageAdress";
import Profile from "./screens/Profile";
import AddNewAdress from "./screens/AddNewAdress";
import SingUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";
import ChangePassword from "./screens/ChangePassword";
import CodeToChangePassword from "./screens/CodeToChangePassword";
import InsertOldPassword from "./screens/InsertOldPassword";
import Menu from "./screens/Menu";
import Carrito from "./screens/Carrito";

const Stack = createStackNavigator();

function AppNavigator() {

    return (
        <Stack.Navigator initialRouteName="Menu">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Editar Perfil" component={EditProfile} />
            <Stack.Screen name="Administrar dirección" component={ManageAddress} />
            <Stack.Screen name="Perfil" component={Profile} />
            <Stack.Screen name="Agregar nueva dirección" component={AddNewAdress} />
            <Stack.Screen name="Registrarse" component={SingUp} />
            <Stack.Screen name="¿Olvidaste tu contraseña?" component={ForgotPassword} />
            <Stack.Screen name="Cambiar contraseña" component={ChangePassword} />
            <Stack.Screen name="Codigo cambiar contraseña" component={CodeToChangePassword} />
            <Stack.Screen name="Ingresar contraseña vieja" component={InsertOldPassword} />
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={{ headerLeft: null }}
            />
            <Stack.Screen name="Carrito" component={Carrito} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
