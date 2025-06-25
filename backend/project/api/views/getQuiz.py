from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..models  import Question
from ..serializers import QuizSerializer

class QuizListView(APIView):
    permission_classes = [AllowAny]
    
    def get(self,request):
        quizzes = Question.objects.all()
        serializer = QuizSerializer(quizzes,many=True)
        return Response(serializer.data)
        