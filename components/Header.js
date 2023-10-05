import { useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { Appbar, Avatar, Text } from 'react-native-paper';

export default function Header({title}){
    const theme= useTheme();

    return(
       <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
        {/* If you want a back button or menu button, uncomment this:
        <Appbar.BackAction onPress={() => {}} /> */}
        <Appbar.Action color={theme.colors.accent}  icon="magnify" onPress={() => { console.log('Search pressed!'); }} />

             <View style={styles.titleContainer}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        {/* For more actions on the header, you can use:*/}
        {/* <Appbar.Action icon="magnify" onPress={() => {}} />  */}
       
        {/* This ensures the Avatar is on the right */}
        <Appbar.Content title="" /> 
        <Appbar.Action style={{ backgroundColor: theme.colors.blackbackground }} icon={() => <Avatar.Icon color={theme.colors.accent} size={24} icon="camera" />} />
      </Appbar.Header>
    )

};

const styles = StyleSheet.create({
    titleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    avatar: {
        marginRight: 10,
    },
  });
  
  