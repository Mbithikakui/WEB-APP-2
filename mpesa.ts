import api from './api';

export const makePayment = async (phone: string, amount: number) => {
  try {
    const res = await api.post('/payment/', { phone, amount, passkey: "1234" });
    return res.data;
  } catch (err) {
    throw new Error("Payment failed");
  }
};


export const b2cPayment = async (phone: string, amount: number) =>
  (await api.post('/b2c/', { phone, amount, passkey: "1234" })).data;

export const b2bPayment = async (receiver_shortcode: string, amount: number) =>
  (await api.post('/b2b/', { receiver_shortcode, amount, passkey: "1234" })).data;

export const c2bRegister = async () =>
  (await api.post('/c2b/', { passkey: "1234" })).data;