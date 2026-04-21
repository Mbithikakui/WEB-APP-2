from django.db import models

# Create your models here.
from django.db import models

class Balance(models.Model):
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)

class Transaction(models.Model):
    TYPES = [
        ("SEND", "Send Money"),
        ("B2B", "Business to Business"),
        ("B2C", "Business to Customer"),
        ("C2B", "Customer to Business"),
        ("REVERSAL", "Reversal"),
    ]
    type = models.CharField(max_length=20, choices=TYPES)
    recipient = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

class Client(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
