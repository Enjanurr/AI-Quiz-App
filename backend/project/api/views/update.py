from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from ..models import QuizNumber
from django.http import JsonResponse

class UpdateView(APIView):
    permission_classes = [IsAuthenticated]

    # ✅ DELETE method
    def delete(self, request, quiznumber_id):
        try:
            deleteQuiz = QuizNumber.objects.get(id=quiznumber_id, user=request.user)
            deleteQuiz.delete()
            return JsonResponse({"message": "Quiz deleted successfully"}, status=200)
        except QuizNumber.DoesNotExist:
            return JsonResponse({"error": "QuizNumber not found"}, status=404)

    # ✅ PATCH method for renaming
    def patch(self, request, quiznumber_id):
        try:
            newTitle = request.data.get("newname")  
            if not newTitle:
                return JsonResponse({"error": "Missing 'newname' field"}, status=400)

            quiz = QuizNumber.objects.get(id=quiznumber_id, user=request.user)
            quiz.title = newTitle  
            quiz.save()
            return JsonResponse({"message": "Quiz renamed successfully"}, status=200)

        except QuizNumber.DoesNotExist:
            return JsonResponse({"error": "QuizNumber not found"}, status=404)
