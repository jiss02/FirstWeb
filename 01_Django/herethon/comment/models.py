from django.db import models
from post.models import Post

# Create your models here.
class Comment(models.Model):
    # author = models.ForeignKey()
    username = models.CharField(max_length=50)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=50)
    created = models.DateTimeField(auto_now=True)