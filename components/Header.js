import React, { useState } from 'react';
import { Divider, useTheme } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, Modal, Text, Dimensions } from 'react-native';
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
    <Appbar.Header style={{ backgroundColor: theme.colors.primary, height: 50 }}>
      <TouchableOpacity onPress={showRadioButtonModal}>
        <Avatar.Icon
          size={Dimensions.get('window').width * 0.1} // Adjust the size as needed
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
          <Text>Selecciona una ciudad</Text>
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
          <Avatar.Image
            size={Dimensions.get('window').width * 0.08} // Adjust the size as needed
            source={require('../assets/akari_icon.png')}
          />
        </TouchableOpacity>
      </View>
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: Dimensions.get('window').width * 0.05, // Adjust the padding as needed
    paddingTop: 1,
  },
  headerText: {
    fontSize: 16, // Adjust the font size as needed
    color: 'black',
  },
  avatarContainer: {
    position: 'absolute',
    right: Dimensions.get('window').width * 0.02, // Adjust the position as needed
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
});
