from django.shortcuts import get_object_or_404, render, redirect
from .models import Detail, Comment
from django.utils import timezone
from django.http import HttpResponse
from .forms import DetailForm, CommentForm
from .forms import UserForm, LoginForm
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from django.template import RequestContext
from django.conf.urls.static import static
from django.conf import settings
from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth import (
    authenticate,
    login as django_login,
    logout as django_logout,
)



# '자세히' 페이지 입니다.
def detail(request, ramyun_id):
    ramyun_detail = get_object_or_404(Detail , pk = ramyun_id)
    return render(request, 'detail.html', {'ramyun' : ramyun_detail})

# 홈입니다.
def home(request):
    ramyuns = Detail.objects
    return render(request, 'home.html', {'ramyun' :ramyuns})

# 페이지를 생성하기 위한 함수입니다.
def new(request):
    return render(request,'new.html')
                  
def create(request):
    if request.method =='POST':
        form = DetailForm(request.POST)
        if form.is_valid():
            detail = form.save(commit=False)
            # detail.pub_date=timezone.now()
            detail.save()
            return redirect('home2')
    else:
        form = DetailForm()
        return render(request, 'new.html', {'form':form})
    
# 댓글 다는 함수 입니다.
def commentcreate(request, ramyun_id):
    post = get_object_or_404(Detail , pk = ramyun_id)
    if request.method =='POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.post = post
            # detail.pub_date=timezone.now()
            comment.save()
            return redirect('detail', ramyun_id = post.pk)
    else:
        form = CommentForm()
        return render(request, 'detail.html', {'form':form, 'ramyun' :post})


# 댓글 삭제
def removecomment(request, comment_id, ramyun_id):
    comment_detail = get_object_or_404(Comment, pk=comment_id)
    post = get_object_or_404(Detail , pk = ramyun_id)
    comment_detail.delete()
    return redirect('detail', ramyun_id = post.pk)

# 라이크 메소드 추가
def like(request):
    return render(request, 'like.html')
    
    
# 함수 주석 달아주세요.
def modify(request, ramyun_id):
    ramyun_detail = get_object_or_404(Detail,pk=ramyun_id)
    return render(request, 'modify.html', {'detail': ramyun_detail})    

def remove(request, ramyun_id):
    detail = get_object_or_404(Detail, pk=ramyun_id)
    detail.delete()
    return redirect('home2')

def update(request, ramyun_id):
    detail = get_object_or_404(Detail, pk=ramyun_id)
    detail.title = request.GET['title']
    detail.content = request.GET['content']
    detail.save()
    return redirect('/detail/'+str(detail.id))

def signup(request):
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            new_user = User.objects.create_user(**form.cleaned_data)
            login(request, new_user)
            return redirect('home')
        else:
            return redirect('home')

    else:
        form = UserForm()
        return render(request, 'adduser.html', {'form': form})
    
def signin(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username = username, password = password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return HttpResponse('로그인 실패. 다시 시도 해보세요.')
    else:
        form = LoginForm()
        return render(request, 'login.html', {'form': form})
    
def logoutgo(request):
    django_logout(request)
    return redirect(request, 'logoutgo')

def logout(request):
    django_logout(request)
    return render(request,'logout.html')

def home2(request):
    ramyuns = Detail.objects
    return render(request, 'home2.html',{'ramyun' :ramyuns})

