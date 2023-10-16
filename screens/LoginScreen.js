import React, { useState } from 'react';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import { View, StyleSheet,Alert  } from 'react-native';
import { Provider as PaperProvider, Avatar, Button, Card, Text, TextInput } from 'react-native-paper';

export default function LoginScreen({navigation}) {

    const [email, setEmail] =  useState('');
    const [password, setPassword] =  useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const authenticate = async () => {
        setLoading(true);
        setError(null);

        try{
            const response = await axios.post("http://50.21.186.23:41000/api/v1/users/authenticate",{
                email: email,
                password: password,
            });
            console.log(response.data);
            Alert.alert("Bienvenido","Login exitoso");
            navigation.navigate('HomeScreen');
            
        }catch(e){
            setError(e);
        }
    };





    return(
        <PaperProvider>
            <View style={{flexDirection:'row'}}>
                <Card style={{flex:1}}>
                
                </Card>
                <Card style={{flex:1}}>
                <Card.Title title="Acceso" subtitle="Bienvenido!" />
          
                        <Card.Content>
                {/*             <Text variant="titleLarge">Card title</Text>
                            <Text variant="bodyMedium">Card content</Text> */}
                            <TextInput
                            label="Mail"
                            value={email}
                            onChangeText={setEmail}
                            style={{marginBottom:10}}
                            mode='outlined'  
                            />
                            <TextInput
                            secureTextEntry={true}
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            style={{marginBottom:10}}
                            mode='outlined'
                            />
                        </Card.Content>
                        <Card.Actions>
                            <Button>Cancel</Button>
                            <Button onPress={authenticate} >Ok</Button>
                        </Card.Actions>


                </Card>
                <Card style={{flex:1}}>
                
                </Card>
            </View>
        </PaperProvider>


    );

}