import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { Appbar, TextInput, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import HomeCards from '../components/HomeCards';

const AdminHome = () => {
  const navigation = useNavigation();
/*   const cardData = [
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
  ]; */

  const [jsonContent, setJsonContent] = useState({
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
  });
  const handleRatingClick = () => {
    console.log('Rating button clicked. jsonContent:', jsonContent);
    // You can display the jsonContent as per your requirement
    // For example, you can use an Alert to display the content
    onPress={handleAccessContent}
    Alert.alert('JSON Content', JSON.stringify(jsonContent));
  };
  const handleAccessContent = (jsonContent,/* jsonContent, setJsonContent */) => {
    console.log('Accessing content:',  setJsonContent,/* setJsonContent,jsonContent */ );
  };

  const handleUpdateContent = () => {
    const updatedContent = { ...jsonContent, desc: jsonContent.desc };
    setJsonContent(updatedContent);
  };

  const handleDeleteContent = () => {
    Alert.alert(
      'Eliminar platillo del menú',
      '¿Estás seguro de que deseas eliminar este platillo del menú?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            setJsonContent(null);
          },
          style: 'destructive',
        },
      ],
    );
  };

  const handleCreateContent = () => {
    const newContent = {
      "cid": "/categories/NewCategoryID",
      "cover": "https://example.com/new-cover.jpg",
      "desc": "New Description",
      "id": "NewID",
      "name": "",
      "price": "",
      "ratting": 0,
      "size": {
        "false": false
      },
      "status": true,
      "uid": "NewUID"
    };
    setJsonContent(newContent);
  };

  return (
    <ScrollView style={styles.screen}>
      {/*  <Button mode="contained" onPress={handleRatingClick} style={styles.button}>
          Checar platillos
        </Button>     */}
         
      <Appbar.Header>
        <Divider />
        
        <Appbar.Content />
        
      </Appbar.Header>
 
     {/* <HomeCards jsonContent={jsonContent} handleAccessContent={handleAccessContent}>   */}
        <Card style={styles.card}>
        <Card.Cover source={{ uri: jsonContent.cover }} style={styles.cardImage} />
      <Card.Content>
        <Title>{jsonContent.name}</Title>
        <Paragraph>{jsonContent.desc}</Paragraph>
        <Paragraph>Price: ${jsonContent.price}</Paragraph>
        
        </Card.Content> 
</Card>

      <TextInput
        label="Actualizar descripción del platillo"
        value={jsonContent.desc}
        onChangeText={(text) => setJsonContent({ ...jsonContent, desc: text })}
        style={styles.textInput}
      />
      <TextInput
        label="Actualizar precio del platillo"
        value={jsonContent.price}
        onChangeText={(text) => setJsonContent({ ...jsonContent, price: text })}
        style={styles.textInput}
      />

      <Button mode="contained" onPress={handleUpdateContent} style={styles.button}>
        Actualizar descripción del platillo 
      </Button>
      <Button mode="contained" onPress={handleUpdateContent} style={styles.button}>
        Actualizar precio del platillo
      </Button>
      <Button mode="contained"  onPress={handleDeleteContent}  style={styles.button}>
        Eliminar platillo del menú
      </Button>

      <Button mode="contained" onPress={handleCreateContent} style={styles.button}>
        Modificar platillo del menú
      </Button>
{/*  </HomeCards>   */} 
 </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    marginLeft:'5%',
    marginRight:'5%'
  },
  card: {
    marginBottom: 16,
    marginHorizontal:'20%',
    marginLeft: 16,
    marginRight: 16,
    backgroundColor:'white'
  },
  cardImage: {
    height: 150,
    width: '60%', // Use relative width for responsiveness
    marginLeft:'20%',
    marginTop:16
  },
  textInput: {
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor:'white'
  },
  button: {
    marginBottom: 16,
    backgroundColor: '#B2844E',
    marginLeft: 16,
    marginRight: 16,
  },
});

export default AdminHome;