from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from comment import views

urlpatterns = [
    path('commentwrite/<int:post_id>', views.comment_form, name='comment_form'),
    path('commentupdate/<int:comment_id>', views.comment_update, name='comment_update'),
    path('commentdelete/<int:comment_id>', views.comment_delete, name='comment_delete'),
]