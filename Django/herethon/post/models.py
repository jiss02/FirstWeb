from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Post(models.Model):
  username = models.CharField(max_length=50)
  title = models.CharField(max_length=50)
  body = models.TextField()
  location = models.CharField(max_length=10) # 수원시 서울시 등..
  TIME_CHOICE = tuple([ (i,str(i)+"시") for i in range(1,25) ])
  liketime = models.IntegerField(choices=TIME_CHOICE)
  created_at = models.DateTimeField(auto_now=True)
  update_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.title

  def summary(self):
    return self.body[:20]
