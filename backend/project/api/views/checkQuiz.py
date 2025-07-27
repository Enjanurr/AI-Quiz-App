from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models import Question, Choice, Result, StudentAnswer, QuizNumber
from api.serializers.CheckAnswerSerializer import StudentAnswerSerializer

class CheckAnswersView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, quiznumber_id):
        data = request.data
        submitted_answer = data.get("answers", {})

        if not submitted_answer:
            return Response({"error": "No answers submitted."}, status=400)

        try:
            quiz = QuizNumber.objects.get(id=quiznumber_id)
        except QuizNumber.DoesNotExist:
            return Response({"error": "Invalid quiz ID."}, status=404)

        question_ids = submitted_answer.keys()
        questions = Question.objects.filter(id__in=question_ids, quiz=quiz)

        if questions.count() != len(question_ids):
            return Response({"error": "One or more questions do not belong to this quiz."}, status=400)

        result = Result.objects.create(quiz=quiz, user=request.user, score=0)

        score = 0
        for question in questions:
            selected_choice_id = submitted_answer.get(str(question.id))
            try:
                selected_choice = Choice.objects.get(id=selected_choice_id, question=question)
            except Choice.DoesNotExist:
                return Response({"error": f"Invalid choice for question {question.id}"}, status=400)

            if selected_choice.is_correct:
                score += 1

            StudentAnswer.objects.create(
                result=result,
                question=question,
                selected_choice=selected_choice
            )

        result.score = score
        result.save()

        answers = StudentAnswer.objects.filter(result=result)
        serializer = StudentAnswerSerializer(answers, many=True)

        return Response({
            "score": score,
            "total": len(submitted_answer),
            "answers": serializer.data,
        })
