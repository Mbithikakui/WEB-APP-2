from rest_framework import serializers
from .models import Balance, Transaction, Client

class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = "__all__"

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = "__all__"
