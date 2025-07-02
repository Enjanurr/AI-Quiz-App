from django.db import models
from django.contrib.auth.models import User

# The commented code does nothing Just let the 
class QuizNumber(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_quizzes')
    quiz_number = models.IntegerField()
    perfect_score = models.IntegerField(null=True)
 
        
class Question(models.Model):
    quiz = models.ForeignKey(QuizNumber, on_delete=models.CASCADE, related_name="questions",null=True)
    text = models.TextField()
    
   
    
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="choices")
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    

    
# result
class Result(models.Model): 
    quiz = models.ForeignKey(QuizNumber, on_delete=models.CASCADE, related_name='quiz_results')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_results')
    score = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    


class StudentAnswer(models.Model):
    result = models.ForeignKey(Result, on_delete=models.CASCADE, related_name='answers') 
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='student_answers')
    # What the student choose
    selected_choice = models.ForeignKey(Choice, on_delete=models.CASCADE, related_name='selected_answers')
    

