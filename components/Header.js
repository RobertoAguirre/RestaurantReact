import React, { useState } from 'react';
import { Divider, useTheme } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, Modal, Text } from 'react-native';
import { Appbar, Avatar, RadioButton } from 'react-native-paper';

export default function Header({ title }) {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const showRadioButtonModal = () => {
    setModalVisible(true);
  };

  const hideRadioButtonModal = () => {
    setModalVisible(false);
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.primary }}>
      <TouchableOpacity onPress={showRadioButtonModal}>
        <Avatar.Icon
          size={60}
          color="#E0A966"
          backgroundColor="white"
          icon="map-marker-radius"
        />
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={hideRadioButtonModal}
      >
        <View style={styles.modalContent}>
          <Text >Selecciona una ciudad </Text>
          <RadioButton.Group onValueChange={handleOptionChange} value={selectedOption}>
            <View>
              <RadioButton.Item label="Chihuahua" value="chihuahua" />
              <RadioButton.Item label="San Diego" value="sandiego" />
              <RadioButton.Item label="Tijuana" value="tijuana" />
            </View>
          </RadioButton.Group>
          <TouchableOpacity onPress={hideRadioButtonModal}>
            <Text>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <View style={styles.headerContent}>
        <Text style={styles.headerText}>{title}</Text>
        <TouchableOpacity
          style={styles.avatarContainer}
          onPress={() => console.log('Avatar pressed!')}
        >
          <Avatar.Image size={40} source={require('../assets/akari_icon.png')} />
        </TouchableOpacity>
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center', // Change to 'center' to vertically center the avatar
    justifyContent: 'flex-end', // Add space between title and avatar
    paddingHorizontal: 600,
    paddingTop: 1, // Add horizontal padding for spacing
  },
  headerText: {
    fontSize: 20,
    color: 'black',
  },
  avatarContainer: {
    position: 'absolute',
    right: 16, // Adjust the right value as needed
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },


});
