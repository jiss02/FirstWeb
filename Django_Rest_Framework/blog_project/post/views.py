# model, serializer 가져오기
from .models import Essay, Album, File
from .serializer import EssaySerializer, AlbumSerializer, FileSerializer
# 뷰셋 가져오기
from rest_framework import viewsets
# 페이지네이션
from .pagination import MyPagination
# 회원가입시 토큰 생성
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# 검색
from rest_framework.filters import SearchFilter
# 파일 업로드 오류 잡기
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

# 이미 존재하는 유저에게 토큰 부여
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

for user in User.objects.all():
    Token.objects.get_or_create(user=user)


class EssayViewSet(viewsets.ModelViewSet):
    queryset = Essay.objects.all()
    serializer_class = EssaySerializer
    pagination_class = MyPagination

    filter_backends = [SearchFilter]
    search_fields = ('title', 'body',)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff:
                qs = Essay.objects.all()
            else:
                qs = Essay.objects.filter(author=user)
        else:
            qs = Essay.objects.none()
        return qs
        
    # 객체 생성시 자동으로 저장해 주겠다.
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    pagination_class = MyPagination

    filter_backends = [SearchFilter]
    search_fields = ('title',)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff:
                qs = Album.objects.all()
            else:
                qs = Album.objects.filter(author=user)
        else:
            qs = Album.objects.none()
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer
    pagination_class = MyPagination

    filter_backends = [SearchFilter]
    search_fields = ('title',)

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff:
                qs = File.objects.all()
            else:
                qs = File.objects.filter(author=user)
        else:
            qs = Album.objects.none()
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    # 파일 업로드 문제 해결 (1. parser_class, 2. create() 오버라이딩)
    # 다양한 미디어 파일들의 리퀘스트를 수락할 수 있도록하는 여러가지 방법이다.
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        serializer = FileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # 데이터와 함께 코드 보내기
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.error, status=HTTP_400_BAD_REQUEST)
