import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Register from "./screens/Register";
import Home from "./screens/Home";
import Carrito from "./screens/Carrito";
import Cuenta from "./screens/Cuenta";
import Ordenes from "./screens/Ordenes"
const Stack = createStackNavigator();

function AppNavigator() {

    return(
        <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Carrito" component={Carrito} />
            <Stack.Screen name="Cuenta" component={Cuenta} />
            <Stack.Screen name="Ordenes" component={Ordenes} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;