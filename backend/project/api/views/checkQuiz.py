from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny,IsAuthenticated
from ..models import Question, Choice,Result , StudentAnswer
from ..serializers import StudentAnswerSerializer

# To be tested later

class CheckAnswersView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        score = 0
        submitted_answer = request.data # the format is question_id : selected_choice 
        
        
        first_question_id = list(submitted_answer.keys())[0] # just get the keys and turn it into list
        quiz = Question.objects.get(id = first_question_id).quiz # <= this accesses the ForeignKey relation to the parent QuizNumber so we know this question belong to quiz 1 for ex
        
        result = Result.objects.create(
            quiz= quiz, # stores the Quiznumber
            user= request.user,
            score = 0,
        )

        for question_id, selected_choice_id in submitted_answer.items():
            question = Question.objects.get(id=question_id)
            selected_choice = Choice.objects.get(id=selected_choice_id)  # get the selected choice 
            if selected_choice.is_correct:   # if equals then score + 1
                score+=1
            # creates the student answer
            StudentAnswer.objects.create(
                result=result,
                question=question,
                selected_choice=selected_choice
            )
        result.score = score # update the score to the computed score, initially it is zero as defined in the result
        result.save() # then save
        
        answers = StudentAnswer.objects.filter(result=result)
        serializer = StudentAnswerSerializer(answers, many=True)
                