from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save  
# Create your models here.
'''
class Account(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  #password1 = models.CharField(max_length = 100)
  #password2 = models.CharField(max_length = 100)
  #nickname = models.CharField(max_length = 100)
  #birth = models.DateField()
  gender = models.CharField(max_length=50)
  email = models.EmailField(max_length=254)
'''
