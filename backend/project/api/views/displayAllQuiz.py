from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.persmissions import IsAuthenticed,AllowAny
from ..models import QuizNumber
from ..serializers import QuizNumberSerializer

class AllQuizNumber(APIView):
    permission_classes = [AllowAny] # allow any for testing later
    
    def get(self,request):
        quiz_number_id = QuizNumber.objects.filter(user = request.user).order_by('-created_at')
        serializer  = QuizNumber(quiz_number_id,many=True)
        return Response(serializer.data)