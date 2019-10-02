from django.urls import path, include
from rest_framework.routers import DefaultRouter
from post import views

# 설정 된 것이 없는 것은 default로 가고, 설정된 url로 들어오면 그쪽으로 보내주겠다.
router = DefaultRouter()
router.register('essay', views.EssayViewSet)
router.register('album', views.AlbumViewSet)
router.register('files', views.FileViewSet)

urlpatterns = [
    path('', include(router.urls))
]