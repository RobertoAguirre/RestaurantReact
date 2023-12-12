import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, TextInput } from 'react-native';
import { Card, Title, Paragraph, Button, Appbar, Divider } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

export default function Home() {
  const [showList, setShowList] = useState(false); // State to control whether to show the list
  const [quantity, setQuantity] = useState(0); // State to manage the quantity of the selected meal
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

  const jsonContent = {
    "cid": "/categories/DU102MGmjJxxmo8V5JUlGuqCI",
    "cover": "https://firebasestorage.googleapis.com/v0/b/akari-go.appspot.com/o/appfiles%2Fuser.jpg?alt=media&token=e0645919-5d01-4ccf-9af2-a09fb5a7cc60",
    "desc": "Porción de togarashi",
    "id": "7JFU5xD8MS",
    "name": "Togarashi",
    "price": 4.9,
    "ratting": 0,
    "size": {
      "false": false
    },
    "status": true,
    "uid": "WExzyhDQvRZJ8oRjziMtTCxssy"
  };

  const handleAccessContent = () => {
    console.log(`Accessing content for ${jsonContent.name}`);
    setShowList(true); // Show the list when the button is clicked
  };

/*   const handleQuantityChange = (newQuantity) => {
    // Implement logic to validate and update the quantity
    setQuantity(newQuantity);
  };

  const handleDeleteMeal = () => {
    // Implement logic to delete the meal
    setShowList(false); // Hide the list after deleting the meal
    
  };
 */
  const ContentCard = ({ jsonContent }) => (
    <Card style={styles.card}>
      <Card.Cover
        source={{ uri: jsonContent.cover }}
      />
      <Card.Content>
        <Title>{jsonContent.name}</Title>
        <Paragraph>{jsonContent.desc}</Paragraph>
        <Paragraph>Price: ${jsonContent.price}</Paragraph>
        <Paragraph>Rating: {jsonContent.ratting}</Paragraph>
        <View style={styles.quantityContainer}>
          <Text>Cantidad:</Text>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={(text) => handleQuantityChange(parseInt(text) || 1)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.deleteButton}
            labelStyle={styles.buttonLabel}
            onPress={handleDeleteMeal}> 
           
            Añadir 
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const HomeCards = () => {
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
              onPress={handleAccessContent}>
              Rating
            </Button>
          </View>
        </View>
      </Card>
    ));
  };

  return (
    <View style={styles.screen}>
      <Appbar.Header>
        <Divider />
        <Appbar.Content />
      </Appbar.Header>
      {showList ? (
        <ScrollView>
          {/* Display the JSON content in a card */}
          <ContentCard jsonContent={jsonContent} />
        </ScrollView>
      ) : (
        <ScrollView>{HomeCards()}</ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
      screen: {
      flex: 1,
      backgroundColor: '#ffff',
    },
    card: {
      marginBottom: 10,
      borderRadius: 10,
      padding: 10,
      margin: 10,
      backgroundColor: '#ffff',
      maxWidth: windowWidth - 60,
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

  
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginLeft: 10,
    padding: 5,
    width: 50,
  },
  buttonContainer: {
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#E0A966',
    paddingHorizontal: 150,
    paddingVertical: 12,
    borderRadius: 20,
    border:20,
    marginLeft: '70%',
    paddingHorizontal: 1.5,
    maxWidth: (windowWidth - 80) * 0.2,
  },
});
