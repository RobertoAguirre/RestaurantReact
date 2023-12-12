// HomeCards.js
import React from 'react';
import { View, Image, Text, Dimensions, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const HomeCards = ({ handleAccessContent, jsonContent }) => {
  const navigation = useNavigation();

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

 const handleRatingClick = () => {
    console.log('Rating button clicked. jsonContent:', jsonContent);
    // Use navigation prop to navigate to the "AdminHome" screen
    navigation.navigate('AdminHome');
    
  }; 

  return (
    <ScrollView>
      {cardData.map((card, index) => (
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
              <Button mode="contained" onPress={() => navigation.navigate('AdminHome')} style={styles.button}>
                Checar platillos
              </Button>
            </View>
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = {

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
    paddingHorizontal: 2.5,
    maxWidth: (windowWidth - 10) * 0.2,
  },
  buttonLabel: {
    color: 'white',
    textAlign: 'center',
    borderRadius: 20,
  },
};
export default HomeCards;
