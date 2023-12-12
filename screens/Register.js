/* import React, { useState } from 'react';

import axios from 'axios';
import { View, StyleSheet, Alert,Image,SafeAreaView,ScrollView, Dimensions } from 'react-native';
import { Avatar, useTheme, Button, Text, Divider, TextInput } from "react-native-paper";
import { Provider as PaperProvider, Button, Card, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LoginScreen from './LoginScreen'; 

export default function Register({ navigation }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [application, setApplication] = useState('restaurant');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
        nameError: '',
        emailError: '',
        phoneNumberError: '',
        passwordError: '',
        confirmPasswordError: ''
    });
  
const handleRegister = () => {
        const errorsCopy = { ...errors };
        errorsCopy.nameError = name ? '' : 'El campo no puede quedar vacío';
        errorsCopy.emailError = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email) ? '' : 'Ingresa un correo electrónico válido';
        errorsCopy.phoneNumberError = phoneNumber ? '' : 'El campo no puede quedar vacío';
        errorsCopy.passwordError = password.length >= 8 ? '' : 'La contraseña debe tener al menos 8 caracteres';
        errorsCopy.confirmPasswordError = password === confirmPassword ? '' : 'Las contraseñas no coinciden';
        setErrors(errorsCopy);

        const noErrors = Object.values(errorsCopy).every(error => error === '');

        if (noErrors) {
            authenticate();
        }

    };
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
    setUsername('');
    setPassword('');
    setApplication('restaurant');
    setRole('admin');
    setConfirmPassword('');
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
        username: username,
      });

      console.log(response.data);
      Alert.alert('Welcome', 'Account created successfully');
      clearFields();
      navigation.navigate('Home');
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
      <Image source={require('../assets/akari_logo_register.png')} style={{ width: 100, height: 100, alignSelf: 'center', marginTop: 20 }} />
        <Card style={styles.card}>
          <Card.Title title="Ingresa tu información" subtitle="para acceder" />
          <Card.Content> 
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black"
              labelStyle={{ color: "black" }}
              inputStyle={{ color: "black" }}
            /> 
            <TextInput
              label="Número de teléfono"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black"
              labelStyle={{ color: "black" }}
              inputStyle={{ color: "black" }}
            />
            <TextInput
              label="Nombre"
              value={name}
              onChangeText={setName}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black"
              labelStyle={{ color: "black" }}
              inputStyle={{ color: "black" }}
            />
            <TextInput
              secureTextEntry={true}
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black"
              labelStyle={{ color: "black" }}
              inputStyle={{ color: "black" }}
            />
            <TextInput
              secureTextEntry={true}
              label="Confirma contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              mode='outlined'
              placeholderTextColor="black"
              labelStyle={{ color: "black" }}
              inputStyle={{ color: "black" }}
            />
          </Card.Content>
          <Card.Actions>
            <Button disabled={loading} onPress={authenticate} style={styles.registerButton}>Regístrate</Button>  
          </Card.Actions>
        </Card>
      </View>
    </PaperProvider>
    
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 0.05 * width, // 5% of the screen width
  },
  card: {
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 0.02 * height, // 2% of the screen height
    backgroundColor: '#fff',
    color: 'black',

  },
  registerButton: {
    color: 'white',
    backgroundColor:'black'
  },
});
 */
import React, { useState } from "react";
import { View, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, useTheme, Button, Text, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
export default function Register() {
  const theme = useTheme();
  const navigation = useNavigation();

  const [role, setRole] = useState('admin');
  const [application, setApplication] = useState('restaurant');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullNameError: '',
    emailError: '',
    phoneNumberError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const handleSignUp = () => {
    const errorsCopy = { ...errors };
    errorsCopy.fullNameError = fullName ? '' : 'El campo no puede quedar vacío';
    errorsCopy.emailError = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)
      ? ''
      : 'Ingresa un correo electrónico válido';
    errorsCopy.phoneNumberError = phoneNumber ? '' : 'El campo no puede quedar vacío';
    errorsCopy.passwordError = password.length >= 8
      ? ''
      : 'La contraseña debe tener al menos 8 caracteres';
    errorsCopy.confirmPasswordError = password === confirmPassword
      ? ''
      : 'Las contraseñas no coinciden';
    setErrors(errorsCopy);

    const noErrors = Object.values(errorsCopy).every(error => error === '');

    if (noErrors) {
      authenticate();
    }
  };

  const clearFields = () => {
    setEmail('');
    setFullName('');
    setPhoneNumber('');
    setPassword('');
    setApplication('restaurant');
    setRole('admin');
    setConfirmPassword('');
  };

  const authenticate = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    console.log('Valor de nombre', fullName);

    try {
      const response = await axios.post("http://50.21.186.23:41000/api/v1/users/", {
        email: email,
        fullName: fullName,
        password: password,
        role: role,
        application: application,
        username: phoneNumber,
      });

      console.log(response.data);
      clearFields();
      navigation.navigate('HomeScreen');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/akari_logo_register.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>
        Ingresa tu información para registrarte
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Nombre Completo"
          style={styles.input}
          mode='outlined'
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
        {errors.fullNameError ? <Text style={styles.errorText}>{errors.fullNameError}</Text> : null}
        <TextInput
          label="Correo electrónico"
          style={styles.input}
          mode='outlined'
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {errors.emailError ? <Text style={styles.errorText}>{errors.emailError}</Text> : null}
        <TextInput
          label="Número de teléfono"
          style={styles.input}
          mode='outlined'
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          keyboardType="numeric"
        />
        {errors.phoneNumberError ? <Text style={styles.errorText}>{errors.phoneNumberError}</Text> : null}
        <PasswordInput
          label="Contraseña"
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {errors.passwordError ? <Text style={styles.errorText}>{errors.passwordError}</Text> : null}
        <PasswordInput
          label="Confirmar contraseña"
          style={styles.input}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />
        {errors.confirmPasswordError ? <Text style={styles.errorText}>{errors.confirmPasswordError}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <Button color="#000000" style={styles.button} mode="contained" onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </Button>
      </View>

      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Ya tienes una cuenta{' '}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginLinkText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const PasswordInput = ({ label, value, onChangeText, style }) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View style={style}>
      <TextInput
        label={label}
        style={{ flex: 1 }}
        mode='outlined'
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isHidden}
      />
      <TouchableOpacity
        style={styles.passwordToggle}
        onPress={() => setIsHidden(!isHidden)}
      >
        <Text>{isHidden ? 'Mostrar' : 'Ocultar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'white'
  },
  logo: {
    width: '20%',
    height: '30%',
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    margin: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '90%',
  },
  input: {
    marginBottom: 10,
    flex: 1,
  },
  passwordToggle: {
    position: 'absolute',
    right: 10,
    top: 35,
  },
  buttonContainer: {
    marginTop: 13,
    width: '90%',
  },
  button: {
    backgroundColor: "#000000",
  },
  buttonText: {
    color: "#FFFFFF",
  },
  errorText: {
    color: 'red',
  },
  loginLinkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  loginText: {
    textAlign: 'center',
    marginBottom:20
  },
  loginLinkText: {
    color: '#E0A966',
    textAlign: 'center',
    marginBottom:20
  },
});
