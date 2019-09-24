from django.shortcuts import render, redirect, get_object_or_404

from .forms import PostForm
from .models import Post

from django.core.paginator import Paginator

# Create your views here.
def home(req):
  return render(req, "post/home.html")

def all(req):
  posts = Post.objects.order_by('-id')
  
  post_list = Post.objects.order_by('-id')
  paginator = Paginator(post_list, 6)
  page = req.GET.get('page')
  posts_p = paginator.get_page(page)

  t = tuple([ (i,str(i)+"시") for i in range(1,25) ])

  return render(req, "post/allpost.html", {'posts': posts, 'posts_p': posts_p,'t':t})

def create(req):
  if req.method == "POST":
    form = PostForm(req.POST)
    if form.is_valid():
      post = form.save(commit = False) 
      post.username = req.user.username
      post.save()
      return redirect('postall')
    else:
      return redirect('postall')
  else:
    form = PostForm()
    return render(req, 'post/new.html', {'form':form})


def update(req, post_id):
  post = get_object_or_404(Post, pk = post_id)
  if req.method == "POST":
    form = PostForm(req.POST, instance = post)
    if form.is_valid():
      post = form.save(commit=False)
      post.save()
      return redirect('postall')
  else:
    form = PostForm(instance = post)
    return render(req, "post/edit.html", {'form':form})

def delete(req, post_id):
  post = get_object_or_404(Post, pk = post_id)
  post.delete()
  return redirect('postall')

def detail(req, post_id):
  post = get_object_or_404(Post, pk = post_id)
  return render(req, 'post/detail.html', {"post":post})

