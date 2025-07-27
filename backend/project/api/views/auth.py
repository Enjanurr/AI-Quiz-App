from django.contrib.auth.models import User  
from rest_framework import generics
from api.serializers.AuthSerializer import UserSerializer,EmailSerializer
from rest_framework.permissions import  AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
# For register
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]
    
# For login
class EmailUserView(TokenObtainPairView):
    serializer_class = EmailSerializer 

class SignOut(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            print("logging out")
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return JsonResponse({"message":"Logged out"}, status=200)
        except Exception:
            return JsonResponse({"error":"Invalid Token"}, status=400)