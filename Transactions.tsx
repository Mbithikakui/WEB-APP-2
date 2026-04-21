import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import api from '../services/api';

export default function Transactions() {
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions/');
      setTransactions(res.data);
    } catch {
      alert('Failed to load transactions');
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await api.delete(`/transactions/${id}/`);
      setTransactions(transactions.filter(t => t.id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  return (
    <View>
      <Text>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.type} - {item.amount} Ksh → {item.recipient}</Text>
            <Button title="Delete" onPress={() => deleteTransaction(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
