import React, { useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, Alert } from 'react-native';
import { Provider as PaperProvider, Button, Card, TextInput } from 'react-native-paper';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [application, setApplication] = useState('restaurant');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!email || !name || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    // Add more validation logic here, e.g., email format, password requirements

    return true;
  };

  const clearFields = () => {
    setEmail('');
    setName('');
    setPassword('');
    setApplication('restaurant');
    setRole('admin');
    setConfirmPassword('');
    setUsername('');
  };

  const authenticate = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://50.21.186.23:41000/api/v1/users/", {
        email: email,
        name: name,
        password: password,
        role: role,
        application: application,
        username: username
      });

      console.log(response.data);
      Alert.alert('Welcome', 'Account created successfully');
      clearFields(); // Clear input fields
      navigation.navigate('Home'); // Navigate to the Home screen
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'An error occurred while registering. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Title title="Access" subtitle="Welcome!" />
          <Card.Content>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black" // Set the text color
              labelStyle={{ color: "black" }} // Set the label color
            />
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black" // Set the text color
              labelStyle={{ color: "black" }} // Set the label color
            />
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black" // Set the text color
              labelStyle={{ color: "black" }} // Set the label color
            />
             <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black" // Set the text color
              labelStyle={{ color: "black" }} // Set the label color
            />
            <TextInput
              secureTextEntry={true}
              label="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black" // Set the text color
              labelStyle={{ color: "black" }} // Set the label color
            />
            <TextInput
              secureTextEntry={true}
              label="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black" // Set the text color
              labelStyle={{ color: "black" }} // Set the label color
            />
          </Card.Content>
          <Card.Actions>
            <Button disabled={loading} onPress={authenticate}>Ok</Button>
          </Card.Actions>
        </Card>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 10,
    color: 'black',
    backgroundColor: '#fff',
  },
});
