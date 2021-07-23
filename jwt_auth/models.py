from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_image = models.CharField(max_length=500, blank=True)
    balance = models.FloatField(blank=True, default=0.0)
    transactions = models.CharField(max_length=10, blank=True)
    families = models.CharField(max_length=10, blank=True)
    credits = models.CharField(max_length=500, blank=True)
