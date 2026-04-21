import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import api from '../services/api';

export default function Settings() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      const res = await api.post('/settings/change-password/', {
        old_password: oldPassword,
        new_password: newPassword,
        passkey: "1234"
      });
      alert(res.data.message);
      setOldPassword('');
      setNewPassword('');
    } catch {
      alert('Password change failed');
    }
  };

  return (
    <View>
      <Text>Settings</Text>
      <TextInput placeholder="Old Password" secureTextEntry value={oldPassword} onChangeText={setOldPassword} />
      <TextInput placeholder="New Password" secureTextEntry value={newPassword} onChangeText={setNewPassword} />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
  );
}
