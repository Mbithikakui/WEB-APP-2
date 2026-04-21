import requests
import base64
import datetime
from django.conf import settings

# Sandbox credentials (replace with production later)
CONSUMER_KEY = "YOUR_CONSUMER_KEY"
CONSUMER_SECRET = "YOUR_CONSUMER_SECRET"
SHORTCODE = "YOUR_SHORTCODE"
SECURITY_CREDENTIAL = "YOUR_SECURITY_CREDENTIAL"  #Yyour encoded credential
PASSKEY = "YOUR_PASSKEY"

def get_access_token():
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=(CONSUMER_KEY, CONSUMER_SECRET))
    return response.json().get("access_token")

def lipa_na_mpesa(phone_number, amount):
    token = get_access_token()
    url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers = {"Authorization": f"Bearer {token}"}

    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    password = base64.b64encode((SHORTCODE + PASSKEY + timestamp).encode()).decode()

    payload = {
        "BusinessShortCode": SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,
        "PartyB": SHORTCODE,
        "PhoneNumber": phone_number,
        "CallBackURL": "https://yourdomain.com/callback",
        "AccountReference": "Test123",
        "TransactionDesc": "Payment"
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.json()

def b2c_payment(phone_number, amount):
    token = get_access_token()
    url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest"
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "InitiatorName": "testapi",
        "SecurityCredential": SECURITY_CREDENTIAL,
        "CommandID": "BusinessPayment",
        "Amount": amount,
        "PartyA": SHORTCODE,
        "PartyB": phone_number,
        "Remarks": "Payment",
        "QueueTimeOutURL": "https://yourdomain.com/timeout",
        "ResultURL": "https://yourdomain.com/result",
        "Occasion": "Test"
    }
    return requests.post(url, json=payload, headers=headers).json()

def b2b_payment(receiver_shortcode, amount):
    token = get_access_token()
    url = "https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest"
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "Initiator": "testapi",
        "SecurityCredential": SECURITY_CREDENTIAL,
        "CommandID": "BusinessPayBill",
        "SenderIdentifierType": "4",
        "RecieverIdentifierType": "4",
        "Amount": amount,
        "PartyA": SHORTCODE,
        "PartyB": receiver_shortcode,
        "AccountReference": "TestB2B",
        "Remarks": "Payment",
        "QueueTimeOutURL": "https://yourdomain.com/timeout",
        "ResultURL": "https://yourdomain.com/result"
    }
    return requests.post(url, json=payload, headers=headers).json()

def c2b_register_url():
    token = get_access_token()
    url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl"
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "ShortCode": SHORTCODE,
        "ResponseType": "Completed",
        "ConfirmationURL": "https://yourdomain.com/confirmation",
        "ValidationURL": "https://yourdomain.com/validation"
    }
    return requests.post(url, json=payload, headers=headers).json()