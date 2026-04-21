from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from .models import Balance, Transaction, Client
from .auth import ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_PASSKEY
from .serializers import BalanceSerializer, TransactionSerializer, ClientSerializer
from .mpesa import lipa_na_mpesa
from .mpesa import b2c_payment, b2b_payment, c2b_register_url
from .auth import ADMIN_PASSKEY


USD_TO_KSH = 150

@api_view(['POST'])
def make_payment(request):
    phone = request.data.get("phone")
    amount = request.data.get("amount")
    passkey = request.data.get("passkey")

    if passkey != ADMIN_PASSKEY:
        return Response({"error": "Invalid passkey"}, status=403)

    result = lipa_na_mpesa(phone, amount)
    return Response(result)

@api_view(['POST'])
def b2c_view(request):
    phone = request.data.get("phone")
    amount = request.data.get("amount")
    passkey = request.data.get("passkey")
    if passkey != ADMIN_PASSKEY:
        return Response({"error": "Invalid passkey"}, status=403)
    return Response(b2c_payment(phone, amount))

@api_view(['POST'])
def b2b_view(request):
    receiver_shortcode = request.data.get("receiver_shortcode")
    amount = request.data.get("amount")
    passkey = request.data.get("passkey")
    if passkey != ADMIN_PASSKEY:
        return Response({"error": "Invalid passkey"}, status=403)
    return Response(b2b_payment(receiver_shortcode, amount))

@api_view(['POST'])
def c2b_view(request):
    passkey = request.data.get("passkey")
    if passkey != ADMIN_PASSKEY:
        return Response({"error": "Invalid passkey"}, status=403)
    return Response(c2b_register_url())


class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        passkey = request.data.get("passkey")

        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD and passkey == ADMIN_PASSKEY:
            return Response({"token": "fake-jwt-token"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_403_FORBIDDEN)

class BalanceViewSet(viewsets.ModelViewSet):
    queryset = Balance.objects.all()
    serializer_class = BalanceSerializer

    @action(detail=False, methods=["post"])
    def convert(self, request):
        usd = float(request.data.get("usd", 0))
        ksh = usd * USD_TO_KSH
        balance = Balance.objects.first()
        balance.amount += ksh
        balance.save()
        return Response({"new_balance": balance.amount})

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
