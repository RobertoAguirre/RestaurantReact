import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider,DefaultTheme } from 'react-native-paper';
import Header from './components/Header';

export default function App() {

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
    <Provider theme={akariTheme}>
          <SafeAreaProvider>
         <View>
        <Header title={"sup"}></Header>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
    </View>
    </SafeAreaProvider>
    </Provider>


 
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
