### viewset 전방식 ###
# from django.urls import path
# from rest_framework.urlpatterns import format_suffix_patterns
# from post import views

# urlpatterns = [
#     path('post/', views.PostList.as_view()),
#     path('post/<int:pk>/', views.PostDetail.as_view()),
# ]

# urlpatterns = format_suffix_patterns(urlpatterns)

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from post import views

# 라우터가 없다면?
# 이덕분에 url을 지정하지 않았는데도 api 루트 페이지가 뜬다.
router = DefaultRouter()
router.register('post', views.PostViewSet)

urlpatterns = [
    path('', include(router.urls))
]
