from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Result
from api.serializers.AllResultsSerializer import AllResultSerializer

class AllResultView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        print("Request user:", request.user)
        result_id = Result.objects.filter(user = request.user).order_by("-created_at")
        serializer = AllResultSerializer(result_id,many=True)
        return Response(serializer.data)