from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..models import Question, Choice

class CheckAnswersView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        score = 0
        submitted_answer = request.data
        results = []

        for question_id, selected_choice in submitted_answer.items():
            try:
                question = Question.objects.get(id=question_id)
                correct_choice = question.choices.get(is_correct=True)

                is_correct = str(correct_choice.id) == str(selected_choice)
                if is_correct:
                    score += 1

                results.append({
                    "question_id": question_id,
                    "selected_choice": selected_choice,
                    "is_correct": is_correct
                })

            except Question.DoesNotExist:
                results.append({
                    "question_id": question_id,
                    "error": "Question not found"
                })
            except Choice.DoesNotExist:
                results.append({
                    "question_id": question_id,
                    "error": "Choices not found"
                })

        return Response({
            "score": score,
            "total": len(submitted_answer),
            "results": results
        })
