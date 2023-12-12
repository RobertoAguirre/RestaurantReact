import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/LoginScreen";

import Register from "./screens/Register";
import Home from "./screens/Home";
import Carrito from "./screens/Carrito";
import Cuenta from "./screens/Cuenta";
import Ordenes from "./screens/Ordenes";
import AdminHome from "./screens/AdminHome";
import ManagerHome from "./screens/ManagerHome";
import HomeCards from "./components/HomeCards";

const Stack = createStackNavigator();

function AppNavigator() {

    return(
        <Stack.Navigator initialRouteName="AdminHome">
            <Stack.Screen name="Register" component={Register} /> 
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Carrito" component={Carrito} />
            <Stack.Screen name="Cuenta" component={Cuenta} />
            <Stack.Screen name="Ordenes" component={Ordenes} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="AdminHome" component={AdminHome} />
            <Stack.Screen name="ManagerHome" component={ManagerHome} />

            <Stack.Screen name="MenuScreen" component={HomeCards} /> 
        </Stack.Navigator>
    );
};

export default AppNavigator;