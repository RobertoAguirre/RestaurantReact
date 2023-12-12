import * as React from 'react';
import { TextInput } from 'react-native-paper';

const ManagerHome = () => {
  const [text, setText] = React.useState('');

  return (
    <TextInput
      label="Password"
      secureTextEntry
      right={<TextInput.Icon icon="eye" />}
    />
  );
};

export default ManagerHome;