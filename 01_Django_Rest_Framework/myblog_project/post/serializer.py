from .models import Essay, Album, File
from rest_framework import serializers

# 모델을 기반으로 작성!
class EssaySerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Essay
        fields = ('pk', 'author', 'title', 'body')
        read_only_fields = ('author',)

class AlbumSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')  
    # 이미지의 성공적인 업로드를 url로 확인하겠다.
    # url을 눌러보면 잘 전달된것을 확인할 수 있다.
    image = serializers.ImageField(use_url=True)  
    class Meta:
        model = Album
        fields = ('pk', 'author', 'image', 'desc')
        read_only_fields = ('author', )

class FileSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username') 
    myfile = serializers.FileField(use_url=True)   
    class Meta:
        model = File
        fields = ('pk', 'author', 'myfile', 'desc')
        read_only_fields = ('author', )
