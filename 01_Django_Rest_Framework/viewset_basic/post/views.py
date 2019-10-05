from django.shortcuts import render
from .models import Post
from .serializer import PostSerializer

from rest_framework import viewsets

# @action 처리
from rest_framework import renderers
from rest_framework.decorators import action
from django.http import HttpResponse

# 리드온리모델뷰셋
# class PostViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer


# 모델뷰셋
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
    # 그냥 얍을 띄우는 custom api
    def highlight(self, request, *arg, **kwargs):
        return HttpResponse("엽엽")

    # 메소드 post로 주기
    # @action(method=['post'],detail=True, renderer_classes=[renders.StaticHTMLRenderer])
