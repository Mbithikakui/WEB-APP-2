import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import api from '../services/api';

export default function Clients() {
  const [clients, setClients] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const fetchClients = async () => {
    try {
      const res = await api.get('/clients/');
      setClients(res.data);
    } catch {
      alert('Failed to load clients');
    }
  };

  const addClient = async () => {
    try {
      const res = await api.post('/clients/', { name, phone });
      setClients([...clients, res.data]);
      setName('');
      setPhone('');
    } catch {
      alert('Add client failed');
    }
  };

  const deleteClient = async (id: number) => {
    try {
      await api.delete(`/clients/${id}/`);
      setClients(clients.filter(c => c.id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  useEffect(() => { fetchClients(); }, []);

  return (
    <View>
      <Text>Clients</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} />
      <Button title="Add Client" onPress={addClient} />

      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - {item.phone}</Text>
            <Button title="Delete" onPress={() => deleteClient(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
