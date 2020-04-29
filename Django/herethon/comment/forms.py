from django import forms
from .models import Comment
from post.models import Post

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']

        widgets = {
            'content': forms.TextInput(
                attrs={
                    'class':'form-control input-sm',
                }
            )
        }

        labels = {
            'content': ""
        }