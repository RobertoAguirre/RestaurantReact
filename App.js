import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Header from './components/Header';
import Home from './components/Home';
import CustomCard from './components/Cards';

const akariTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFFFFF', // example color
    accent: '#E0A966', // example color
    blackbackground: '#000000',
  },
  roundness: 2,
};

export default function App() {
  return (
    <PaperProvider theme={akariTheme}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header title="Chihuahua" />
          <Home />
          <StatusBar style="end" />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
