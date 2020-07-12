from django.db import models
from django.conf import settings


class Essay(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE) 
    title = models.CharField(max_length=100)
    body = models.TextField()

    def __str__(self):
        return self.title

class Album(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="images")
    desc = models.CharField(max_length=100)

class File(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    myfile = models.FileField(upload_to="files")
    desc = models.CharField(max_length=100)
