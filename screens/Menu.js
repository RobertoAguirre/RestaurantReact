import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Text, TextInput, Modal, Portal, DefaultTheme } from "react-native-paper";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CheckBox } from 'react-native-elements';

const Menu = () => {
    const navigation = useNavigation();
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [showAddons, setShowAddons] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [notes, setNotes] = useState('');

    const addons = [
        { name: 'Soya Limón (Incluida)', price: 4.90 },
        { name: 'Agregado 2', price: 3.50 },
        { name: 'Agregado 3', price: 2.75 },
        { name: 'Agregado 4', price: 5.20 },
        { name: 'Agregado 5', price: 6.90 },
    ];

    const [addonChecked, setAddonChecked] = useState(Array(addons.length).fill(false));

    const handleCartUpdate = (updateCart) => {
        setCartItems(updateCart);
        checkCartVisibility();
    }

    const products = [
        {
            name: 'Atún importado',
            image: require('../assets/AtunImportado.jpg'),
            rating: 5,
            ratingCount: 0,
            description: 'Descripción de ejemplo para el atún importado. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: 229.99,
        },
        // Agregar más productos aquí si es necesario
    ];

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#E0A966', // Ajusta el color del borde según sea necesario
        },
    };

    const checkCartVisibility = () => {
        // Verifica si hay elementos en el carrito y actualiza el estado de la visibilidad
        const newCartVisible = cartItems.length > 0;

        if (newCartVisible !== isCartVisible) {
            setIsCartVisible(newCartVisible);
            navigation.setParams({ cartVisible: newCartVisible });
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            updateCartCount();
            checkCartVisibility();
        });

        return unsubscribe;
    }, [navigation, updateCartCount, checkCartVisibility, cartItems]);


    useEffect(() => {
        updateCartTotal();
    }, [cartItems]);

    const updateCartCount = () => {
        setCartCount(cartItems.reduce((count, item) => count + item.quantity, 0));
    };

    const updateCartTotal = () => {
        setCartTotal(cartItems.reduce((total, item) => total + item.totalPrice, 0));
    };

    const handleAddButtonPress = () => {
        setAddonChecked(Array(addons.length).fill(false));
        setShowAddons(true);
    };

    const handleCheckboxToggle = (index) => {
        const newAddonChecked = [...addonChecked];
        newAddonChecked[index] = !newAddonChecked[index];
        setAddonChecked(newAddonChecked);
    };

    const handleAddToCart = () => {
        const selectedProduct = products[0];
        const selectedAddons = addons.filter((_, index) => addonChecked[index]);

        // Calcula el precio total incluyendo los addons
        const totalAddonPrice = selectedAddons.reduce((acc, addon) => acc + addon.price, 0);
        const totalPrice = selectedProduct.price + totalAddonPrice;

        // Agrega el producto al carrito
        const cartItem = {
            product: selectedProduct,
            addons: selectedAddons,
            notes: notes,
            totalPrice: totalPrice,
            quantity: 1,
        };

        const updatedCart = [...cartItems, cartItem];
        setCartItems(updatedCart);

        // Muestra la barra de carrito al agregar el primer producto
        if (updatedCart.length === 1) {
            navigation.setParams({ cartVisible: true });
        }

        checkCartVisibility();

        setShowAddons(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            updateCartCount();
            checkCartVisibility();
        }, [updateCartCount, checkCartVisibility])
    );

    const updateCart = () => {
        updateCartCount();
        checkCartVisibility();
    };

    return (
        <View style={styles.container}>
            {products.map((product, index) => (
                <View key={index} style={styles.menuItem}>
                    <Image source={product.image} style={styles.productImage} />
                    <View style={styles.productDetails}>
                        <Text style={styles.productName}>{product.name}</Text>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>{'\u2605'.repeat(product.rating)}</Text>
                            <Text style={styles.ratingCount}>{`${product.ratingCount} (Calificaciones)`}</Text>
                        </View>
                        <Text style={styles.description}>{product.description}</Text>
                        <Text style={styles.price}>{`$${product.price.toFixed(2)}`}</Text>
                    </View>
                    <Button
                        mode="contained"
                        onPress={handleAddButtonPress}
                        style={styles.addButton}
                    >
                        Añadir
                    </Button>
                </View>
            ))}

            {cartCount > 0 && (
                <View style={styles.cartBar}>
                    <View style={styles.cartInfoContainer}>
                        <Text style={styles.cartInfoLabel}>{`Productos:`}</Text>
                        <Text style={styles.cartInfoValue}>{`${cartCount}`}</Text>
                    </View>
                    <View style={styles.cartInfoContainer}>
                        <Text style={styles.cartInfoLabel}>{`Total:`}</Text>
                        <Text style={styles.cartInfoValue}>{`$${cartTotal.toFixed(2)}`}</Text>
                    </View>
                    <View style={styles.viewCartButtonContainer}>
                        <Button
                            onPress={() => {
                                navigation.navigate('Carrito', {
                                    cartItems,
                                    updateCartCount,
                                    updateCartTotal,
                                    updateCart: updateCart,
                                    onCartUpdate: handleCartUpdate,
                                })
                            }}
                            style={styles.viewCartButton}
                            labelStyle={{ color: 'white' }}
                        >
                            Ver carrito
                        </Button>
                    </View>
                </View>
            )}

            <Portal>
                <Modal
                    visible={showAddons}
                    onDismiss={() => setShowAddons(false)}
                    contentContainerStyle={styles.modalContainer}
                >
                    <ScrollView>
                        <Text style={styles.modalTitle}>{products[0].name}</Text>

                        <Text style={styles.description}>{products[0].description}</Text>

                        {addons.map((addon, index) => (
                            <View key={index} style={styles.addonItem}>
                                <CheckBox
                                    checked={addonChecked[index]}
                                    onPress={() => handleCheckboxToggle(index)}
                                    containerStyle={styles.checkboxContainer}
                                />
                                <View style={styles.addonDetails}>
                                    <Text>{addon.name}</Text>
                                    <Text style={styles.addonPrice}>{`$${addon.price.toFixed(2)}`}</Text>
                                </View>
                            </View>
                        ))}

                        <TextInput
                            label="Notas"
                            value={notes}
                            onChangeText={(text) => setNotes(text)}
                            style={styles.notesInput}
                            multiline
                        />

                        <Button onPress={handleAddToCart} mode="contained" style={styles.addCartButton}>
                            Agregar
                        </Button>
                    </ScrollView>
                </Modal>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f4f4f4',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 5,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    rating: {
        color: '#FFD700',
    },
    ratingCount: {
        marginLeft: 5,
        color: '#666',
    },
    description: {
        marginBottom: 10,
        color: '#444',
        textAlign: 'justify',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    addButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#E0A966'
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addonItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    addonDetails: {
        flex: 1,
        marginLeft: 10,
    },
    addonPrice: {
        color: 'green',
    },
    notesInput: {
        marginBottom: 10,
    },
    addCartButton: {
        marginTop: 10,
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
        margin: 0,
    },
    cartBar: {
        flexDirection: 'row', // Cambiado a fila
        justifyContent: 'space-between', // Espaciado entre los elementos
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    cartInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    cartInfoLabel: {
        color: 'white',
        marginRight: 5,
    },
    cartInfoValue: {
        color: 'white',
        fontWeight: 'bold',
    },
    viewCartButton: {
        backgroundColor: '#E0A966',
    },
    viewCartButtonContainer: {},
});

export default Menu;
