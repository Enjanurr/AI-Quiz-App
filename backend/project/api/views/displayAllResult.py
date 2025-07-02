from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from ..models import Result
from ..serializers import AllResultSerializer

class AllResultView(APIView):
    permission_classes = [AllowAny]
    
    def get(self,request):
        result_id = Result.objects.filter(user = request.user).order_by("-created_at")
        serializer = AllResultSerializer(result_id,many=True)
        return Response(serializer.data)