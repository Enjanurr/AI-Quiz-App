from rest_framework import serializers
from .models import Question,Choice


class ChoiceSerializers(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields=['id','text','is_correct']
        

class QuizSerializers(serializers.ModelSerializer):
    choices = ChoiceSerializers(many=True, read_only=True)
    class Meta:
        model = Question
        fields=['id','text','choices']
        