from django import forms
from .models import Detail, Comment
from django.contrib.auth.models import User

class DetailForm(forms.ModelForm):
    class Meta:
        model = Detail
        fields = ['title', 'content', ] 

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']

class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

        

class LoginForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password']
        
    
