from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import QuizNumber, Result
from api.serializers.AllQuizNumberSerializer import AllQuizNumberSerializer

class AllQuizNumberView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get all the quizzes the user has answered (Result exists)
        answered_quiz_ids = Result.objects.filter(
            user=request.user
        ).values_list('quiz__id', flat=True)

        # Get all quizzes the user created, but exclude those already answered
        unattempted_quizzes = QuizNumber.objects.filter(
            user=request.user
        ).exclude(id__in=answered_quiz_ids)

        # Serialize and return them
        serializer = AllQuizNumberSerializer(unattempted_quizzes, many=True)
        return Response(serializer.data)
