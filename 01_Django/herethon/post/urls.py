from django.contrib import admin
from django.urls import path
from . import views 

urlpatterns = [
    path('postcreate/', views.create, name='postcreate'),
    path('postupdate/<int:post_id>', views.update, name = "postupdate"),
    path('postdelete/<int:post_id>', views.delete, name ='postdelete'),
    path('postdetail/<int:post_id>', views.detail, name = 'postdetail'),
    path('',views.all, name = 'postall'),
]
