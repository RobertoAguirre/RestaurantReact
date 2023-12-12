import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, DefaultTheme } from 'react-native-paper';

import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';

export default function App() {

  const [users, setUsers] = useState([]); // [1]

  async function getUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    console.log(users);
    setUsers(users);
  }


  const akariTheme = {

    //#E0A966  -- gold
    //#B2844E  -- brown
    //black: #000000
    //white: #FFFFFF

    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#FFFFFF', // example color
      accent: '#E0A966', // example color
      blackbackground: '#000000',
    },
    roundness: 2,
  };


  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>




    // <Provider theme={akariTheme}>
    //       <SafeAreaProvider>
    //      <View>
    //       <Header title={"sup"}></Header>
    //       <Text>Open up App.js to start working on your app!</Text>
    //       <StatusBar style="auto" />
    //       <button onClick={getUsers}>Get Users</button>
    //       <ul>
    //         {users.map(user=>
    //             <li>{user.name}</li>
    //         )}
    //       </ul>
    //       <p></p>
    //       <Login></Login>

    // </View>
    // </SafeAreaProvider>
    // </Provider>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
