from django.contrib.auth.models import User  
from rest_framework import generics
from ..serializers import UserSerializer,EmailSerialiser
from rest_framework.permissions import  AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]
    
class EmailUserView(TokenObtainPairView):
    serializer_class = EmailSerialiser