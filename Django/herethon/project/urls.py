from django.contrib import admin
from django.urls import path, include
import post.views

urlpatterns = [
    path('', post.views.home, name = "home"),
    path('admin/', admin.site.urls),
	path('account/', include('account.urls')),
    path('post/', include('post.urls')),
    path('comment/', include('comment.urls')),
]