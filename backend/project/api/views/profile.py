from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import ProfilePicture,User
from api.serializers.ProfileSerializer import ProfileSerializer,GetProfile
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import os
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser,)
    
    def patch(self, request):
        profile, _ = ProfilePicture.objects.get_or_create(user=request.user)
        
        if 'avatar' in request.FILES:
            old_avatar = profile.avatar.path
            if profile.avatar.name != 'avatars/default.png' and os.path.isfile(old_avatar):
                os.remove(old_avatar)
        # Combine form-data and files (for avatar)
        data = request.data.copy()
        data.update(request.FILES)  

        serializer = ProfileSerializer(profile, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"success": "Profile Updated!"})
        return Response({"error": serializer.errors}, status=400)
    
    def get(self, request):
        profile, _ = ProfilePicture.objects.get_or_create(user=request.user)

    # Return None if the avatar is the default placeholder string
        avatar_url = (
        request.build_absolute_uri(profile.avatar.url)
        if profile.avatar.name and profile.avatar.name != "avatars/default.png"
        else None
    )

        data = {
        "username": request.user.username,
        "email": request.user.email,
        "avatar": avatar_url,
    }

        return Response(data)

    