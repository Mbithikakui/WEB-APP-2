import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import api from '../services/api';
import { makePayment, b2cPayment, b2bPayment, c2bRegister } from '../services/mpesa';

export default function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(true);
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const fetchBalance = async () => {
    try {
      const res = await api.get('/balance/');
      if (res.data.length > 0) setBalance(res.data[0].amount);
    } catch {
      alert('Failed to load balance');
    }
  };

  const convertUsdToKsh = async () => {
    try {
      const res = await api.post('/balance/convert/', { usd: 10 });
      setBalance(res.data.new_balance);
    } catch {
      alert('Conversion failed');
    }
  };


  const handlePayment = async () => {
    try {
      const res = await makePayment(phone, parseInt(amount));
      alert(JSON.stringify(res));
    } catch {
      alert('Payment failed');
    }
  };

  const handleB2C = async () => {
    try {
      const res = await b2cPayment(phone, parseInt(amount));
      alert(JSON.stringify(res));
    } catch {
      alert('B2C failed');
    }
  };

  const handleB2B = async () => {
    try {
      const res = await b2bPayment("600000", parseInt(amount)); // example shortcode
      alert(JSON.stringify(res));
    } catch {
      alert('B2B failed');
    }
  };

  const handleC2B = async () => {
    try {
      const res = await c2bRegister();
      alert(JSON.stringify(res));
    } catch {
      alert('C2B registration failed');
    }
  };

  useEffect(() => { fetchBalance(); }, []);

  return (
    <View>
      <Text>Dashboard</Text>
      {showBalance && <Text>Balance: {balance} Ksh</Text>}
      <Button title={showBalance ? "Hide Balance" : "Show Balance"} onPress={() => setShowBalance(!showBalance)} />
      <Button title="Convert $10 to Ksh" onPress={convertUsdToKsh} />

       <TextInput placeholder="Phone Number" value={phone} onChangeText={setPhone} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" />

      <Button title="Lipa na M-Pesa" onPress={handlePayment} />
      <Button title="B2C Payment" onPress={handleB2C} />
      <Button title="B2B Payment" onPress={handleB2B} />
      <Button title="Register C2B" onPress={handleC2B} />
      
    </View>
  );
}
