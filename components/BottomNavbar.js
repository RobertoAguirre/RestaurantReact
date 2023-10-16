import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const HomeRoute = () => <Text>Inicio</Text>;
const OrdenRoute = () => <Text>Ordenes</Text>;
const CarRoute = () => <Text>Carrito</Text>;
const AccountRoute = () => <Text>Cuenta</Text>;

const CustomBottomNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home', inactiveIcon: 'home-outline' },
    { key: 'orden', title: 'Ordenes', icon: 'clipboard-list', inactiveIcon: 'clipboard-list-outline' },
    { key: 'carrito', title: 'Carrito', icon: 'cart', inactiveIcon: 'cart-outline' },
    { key: 'cuenta', title: 'Cuenta', icon: 'account', inactiveIcon: 'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    orden: OrdenRoute,
    carrito: CarRoute,
    cuenta: AccountRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#ffff' }} // Change 'your_color_here' to your desired background color
      activeColor='blue' // Change 'your_active_color_here' to your desired color for focused icons
      inactiveColor='purple' // Change 'your_inactive_color_here' to your desired color for non-focused icons
      
    />
  );
};

export default CustomBottomNavigation;
