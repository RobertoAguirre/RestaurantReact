import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import EditProfile from "./screens/EditProfile";
import ManageAddress from "./screens/ManageAdress";
import Profile from "./screens/Profile";
import AddNewAdress from "./screens/AddNewAdress";
import SingUp from "./screens/SignUp";
import ForgotPassword from "./screens/ForgotPassword";

const Stack = createStackNavigator();

function AppNavigator() {

    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="Editar Perfil" component={EditProfile} />
            <Stack.Screen name="Administrar dirección" component={ManageAddress} />
            <Stack.Screen name="Perfil" component={Profile} />
            <Stack.Screen name="Agregar nueva dirección" component={AddNewAdress} />
            <Stack.Screen name="Registrarse" component={SingUp} />
            <Stack.Screen name="¿Olvidaste tu contraseña?" component={ForgotPassword} />
        </Stack.Navigator>
    );
};

export default AppNavigator;