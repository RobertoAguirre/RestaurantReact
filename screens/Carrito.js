function Carrito() {
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

export default Carrito;