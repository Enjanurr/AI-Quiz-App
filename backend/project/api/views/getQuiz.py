from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import Question
from ..serializers import QuizSerializers
from rest_framework.response import Response

@api_view(['GET'])
def quiz_List(request):
    quizzes = Question.objects.all()
    serializer = QuizSerializers(quizzes, many=True)
    return Response(serializer.data)
    
