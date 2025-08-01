from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

# used in authentication
class EmailSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
        
    def validate(self,attrs):
        email = attrs.get('email')
        password= attrs.get('password')
        
        try:
            user= User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"detail": "Account with this email does not exist."})
        
        user = authenticate(username = user.username, password=password)
        if user is None:
            raise serializers.ValidationError({"detail": "Incorrect password."})
        data = super().validate({
            "username" :user.username,
            "password":password
        })
        return data
    
    @classmethod
    def get_token(cls, user):
        return super().get_token(user)

    # ✅ This removes 'username' from the browsable API and docs
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('username', None)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {
                "required": True,
                "validators": [
                    UniqueValidator(
                        queryset=User.objects.all(),
                        message="A user with that email already exists."
                    )
                ]
            }
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)       
        