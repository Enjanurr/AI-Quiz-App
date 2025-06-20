from django.db import models

# Create your models here.

    
class Question(models.Model):
    text = models.TextField()
    
class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="choices")
    text = models.CharField(max_length = 255)
    is_correct = models.BooleanField(default=False)
    