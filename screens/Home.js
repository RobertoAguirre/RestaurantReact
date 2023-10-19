import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button, Appbar, Divider } from 'react-native-paper';
import { BottomNavigation } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home() {
  const [index, setIndex] = useState(0);

  const cardData = [
    {
      title: 'Akari D1',
      content: 'Japonesa',
    },
    {
      title: 'Akari Ortiz Mena',
      content: 'Japonesa',
    },
    {
      title: 'Akari Plaza Hollywood',
      content: 'Japonesa',
    },
    {
      title: 'Akari Reliz',
      content: 'Japonesa',
    },
  ];

  const handleAccessContent = (title) => {
    console.log(`Accessing content for ${title}`);
  };

  const renderCards = () => {
    return cardData.map((card, index) => (
      <Card key={index} style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/akari_icon.png')}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>{card.title}</Title>
            </View>
            <Paragraph style={styles.contentText}>{card.content}</Paragraph>
            <Button
              style={styles.button}
              labelStyle={styles.buttonLabel}
              onPress={() => handleAccessContent(card.title)}>
              Rating
            </Button>
          </View>
        </View>
      </Card>
    ));
  };

  const routes = [
    { key: 'home', title: 'Inicio', icon: 'home' },
    { key: 'orders', title: 'Ordenes', icon: 'clipboard-list' },
    { key: 'cart', title: 'Carrito', icon: 'cart' },
    { key: 'account', title: 'Cuenta', icon: 'account' },
  ];

  const renderScene = BottomNavigation.SceneMap({
    home: () => (
      <ScrollView>{renderCards()}</ScrollView>
    ),
    orders: () => <View style={styles.container}><Text>Orders content</Text></View>,
    cart: () => <View style={styles.container}><Text>Cart content</Text></View>,
    account: () => <View style={styles.container}><Text>Account content</Text></View>,
  });

  return (
    <View style={styles.screen}>
      <Appbar.Header>
        <Divider />
        <Appbar.Content />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.navigationBar}
        inactiveColor='black' // Change to black
        activeColor='black' // Change to black
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffff',
  },
  container: {
    flex: 1,
    padding: 10,
    margin: 10,
    backgroundColor: '#03A9F4',
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: '#ffff',
    maxWidth: windowWidth - 40,
    marginLeft: '8%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10%',
  },
  imageContainer: {
    width: 70,
    alignItems: 'center',
    marginRight: '15%',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#ffff',
    padding: 10,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#E0A966',
    padding: 0.75,
    borderColor: '#E0A966',
    borderRadius: 4,
    marginLeft: '50%',
    paddingHorizontal: 1.5,
    maxWidth: (windowWidth - 40) * 0.2,
  },
  buttonLabel: {
    color: 'white',
    textAlign: 'center',
    borderRadius: 20,
  },
  navigationBar: {
    backgroundColor: 'white',
    activeColor: 'black', // Change to black
    inactiveColor: 'purple', // Change to black
  },
});
