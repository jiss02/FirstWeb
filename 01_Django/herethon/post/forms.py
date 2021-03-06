from django import forms
from .models import Post

class PostForm(forms.ModelForm):
  class Meta:
    model = Post
    fields = ["liketime","location",'title', 'body']

    widgets = {
      'liketime': forms.Select(
        attrs={
          'class': 'form-control'
        }
      ),
      'location': forms.TextInput(
        attrs={
          'class': 'form-control'
        }
      ),
      'title': forms.TextInput(
        attrs={
          'class': 'form-control'
        }
      ),
      'body': forms.Textarea(
        attrs={
          'class': 'form-control',
          'id':"exampleFormControlTextarea1",
        }
      )

    }

    labels = {
      "liketime" : '',
      "location": "",
      'title': "", 
      'body': "",
    }