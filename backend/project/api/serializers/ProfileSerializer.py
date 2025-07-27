from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import ProfilePicture

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', required=False)
    email = serializers.EmailField(source='user.email', required=False)

    class Meta:
        model = ProfilePicture
        fields = ['username', 'email', 'avatar']

    def update(self, instance, validated_data):
        # Update avatar (ProfilePicture field)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()

        # Update User fields
        user_data = validated_data.get('user', {})
        user = instance.user
        user.username = user_data.get('username', user.username)
        user.email = user_data.get('email', user.email)
        user.save()

        return instance

class GetProfile(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.EmailField(source="user.email", read_only=True)
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = ProfilePicture
        fields = ["username", "email", "avatar"]

    def get_avatar(self, obj):
        request = self.context.get("request")
        if obj.avatar:
            return request.build_absolute_uri(obj.avatar.url)
        return None

