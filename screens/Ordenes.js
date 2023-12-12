import * as React from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { Card, Button } from 'react-native-paper';

export default function Ordenes({ navigation }) {
  // Assume you have a list of meals to offer to the customer when there's a delivery
  const [delivered, setDelivered] = React.useState(null);

  // Function to render the list of meals when there's a delivery
  const renderDeliveredMeals = () => {
    if (delivered) {
      return (
        <FlatList
          data={delivered}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card>
              <Card.Cover
                style={styles.cardImage}
                source={{
                  uri: item.imageUrl,
                }}
              />
              <Text style={styles.textCenter}>
                Meal Name: {item.name}
              </Text>
              {/* Add more details about the meal as needed */}
            </Card>
          )}
        />
      );
    } else {
      return (
        <View>
          <Card>
            <Card.Cover
              style={styles.cardImage}
              source={{
                uri:
                  'https://i.pinimg.com/originals/0c/a3/c6/0ca3c6208578b8910445c557b3bf8f87.gif',
              }}
            />
          </Card>
          <Text style={styles.textCenter}>
            Tu carrito está vacío.
          </Text>
          <Text style={styles.textCenter}>
            Por favor agrega tu comida favorita
          </Text>
          <Button
            style={styles.button}
            mode="contained"
            color="black"
            onPress={() => navigation.navigate('Home')}
          >
            Restaurantes favoritos
          </Button>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderDeliveredMeals()}
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const cardImageHeight = height * 0.4;
const buttonWidth = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  cardImage: {
    width: '100%',
    height: cardImageHeight,
    backgroundColor: 'white',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    width: buttonWidth,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'black',
  },
  textCenter: {
    margin: 8,
    textAlign: 'center',
    fontSize:14,
  },
});
