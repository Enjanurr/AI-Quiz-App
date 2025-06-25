from django.db import models
from django.contrib.auth.models import User

    
# Create your models here.
class QuizScore(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE,related_name="score")
    score = models.IntegerField()
    taken_At = models.TimeField(auto_now_add=True)
    
class Question(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="questions",null=True)
    text = models.TextField()
    
    def __str__(self):
        return self.text
    
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="choices")
    text = models.CharField(max_length = 255)
    is_correct = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.text} (Correct:{self.is_correct})"
    