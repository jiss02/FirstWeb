from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class Detail(models.Model):
    title = models.CharField(max_length = 100)
    pub_date = models.DateTimeField(auto_now_add = True)
    content = models.TextField()
    #img = models.ImageField(upload_to='images/') #

    def __str__(self):
        return self.title
    
    def like_count(self):
        return self.like_user_set.count()
    
class Comment(models.Model):
    post = models.ForeignKey(Detail, related_name = 'comments', on_delete = models.CASCADE)
    content = models.CharField(max_length = 200)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    
    def __str__(self):
        return self.content
    


