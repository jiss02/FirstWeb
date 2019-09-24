from django.shortcuts import render, get_object_or_404,redirect
from .forms import CommentForm
from .models import Comment
from post.models import Post
from django.utils import timezone

# Create your views here.
def comment_form(request, post_id):
  post = get_object_or_404(Post, pk = post_id)
  if request.method == 'POST':
    comment_form = CommentForm(request.POST)
    if comment_form.is_valid():
        comment = comment_form.save(commit=False)
        comment.post = post
        comment.username = request.user.username
        comment.created = timezone.now()
        comment.save()
        return redirect('postdetail', post_id = post_id)               
  else:
    comment_form = CommentForm()
    return render(request, "post/detail.html", {'comment_form' : comment_form, "post":post})
    
def comment_update(request, comment_id):
  comment = get_object_or_404(Comment, pk = comment_id)
  if request.method == 'POST':
    comment_form = CommentForm(request.POST, instance=comment)
    if comment_form.is_valid():
      comment = comment_form.save(commit=False)
      comment.save()
      return redirect('postdetail', post_id = comment.post.pk)
    else:
      return redirect('postall')
  else:
    comment_form = CommentForm(instance=comment)
    return render(request, 'post/detail.html', {'comment_form2' : comment_form, "post":comment.post})   

def comment_delete(request, comment_id):
  comment = get_object_or_404(Comment, pk=comment_id)
  comment.delete()
  return redirect("postdetail", post_id = comment.post.pk)
