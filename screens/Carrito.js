import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, navigation } from 'react-native';


const Carrito = ({ route, updateCart, updateCartCount, updateCartTotal, onCartUpdate }) => {
    const [cartItems, setCartItems] = useState(
        route.params.cartItems.map(item => ({ ...item, quantity: 1 }))
    );

    const navigation = useNavigation();

    const renderCartItem = ({ item, index }) => (
        <View style={styles.cartItem}>
            <Image source={item.product.image} style={styles.productImage} />
            <View style={styles.productDetails}>
                <View style={styles.header}>
                    <Text style={styles.productName}>{item.product.name}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                            <Text style={styles.quantityButton}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => handleAddItem(index)}>
                            <Text style={styles.quantityButton}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text>{`$${item.product.price.toFixed(2)}`}</Text>
                <Text style={{ color: '#555' }}>{`${item.notes || 'N/A'}`}</Text>
                <FlatList
                    data={item.addons}
                    renderItem={({ item: addon }) => (
                        <Text style={styles.addonText}>{`${addon.name}: $${addon.price.toFixed(2)}`}</Text>
                    )}
                    keyExtractor={(addon, index) => index.toString()}
                />
            </View>
        </View>
    );

    const handleAddItem = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity += 1;
        setCartItems(updatedCart);
        updateCartCount();
        updateCartTotal();
    };

    const handleRemoveItem = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity = Math.max(updatedCart[index].quantity - 1, 0);

        if (updatedCart[index].quantity === 0) {
            updatedCart.splice(index, 1);
        }

        setCartItems(updatedCart);
        updateCartCount();
        updateCartTotal();

        if (updateCart) {
            updateCart();
        }
    };

    return (
        <View style={styles.container}>
            {cartItems.length > 0 ? (
                <FlatList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <Text style={styles.emptyCart}>El carrito está vacío.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        paddingBottom: 10,
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 20,
        color: '#E0A966',
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 5,
    },
    emptyCart: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    addonText: {
        fontSize: 12,
    },
});

export default Carrito;
