"""newbie URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import path
import detail.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('<int:ramyun_id>/update', detail.views.update, name='update'),
    path('<int:ramyun_id>/modify', detail.views.modify, name='modify'),
    path('detail/<int:ramyun_id>', detail.views.detail, name='detail'),
    path('new/', detail.views.new, name='new'),
    path('create/', detail.views.create, name='create'),
    path('join/', detail.views.signup, name='join'),
    path('', detail.views.home, name='home'),
    path('<int:ramyun_id>/remove', detail.views.remove, name = 'remove'),
    path('signupgo',detail.views.signup, name='signupgo'),
    path('login/', detail.views.signin, name='login'),
    path('logoutgo/', detail.views.logoutgo, name='logoutgo'),
    path('home2/', detail.views.home2, name='home2'),
    # 댓글 경로
    path('commentcreate/<int:ramyun_id>', detail.views.commentcreate, name = "commentcreate"),
 
    path('detail/<int:comment_id>/<int:ramyun_id>', detail.views.removecomment ,name = "removecomment"),
    path('logout',detail.views.logout, name='logout'),
    
    # 좋아요
    path('like/', detail.views.like, name='post_like'),

 
]

# + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)