import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passkey, setPasskey] = useState('');
  const { setAuthToken } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const res = await api.post('/login/', { username, password, passkey });
      setAuthToken(res.data.token);
      navigation.replace('Dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <View>
      <Text>Admin Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput placeholder="Passkey" secureTextEntry value={passkey} onChangeText={setPasskey} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

