from rest_framework import serializers
from ..models import Choice,Question,QuizNumber

#already used
# For making the QuizNumber , Question and the choices 
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields=['id','text','is_correct']
        
class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    quiz_id = serializers.IntegerField(source='quiz.id', read_only=True) 
    class Meta:
        model = Question
        fields=['id','text','quiz_id','choices']
        
class QuizNumberSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True,read_only=True)
    class Meta:
        model = QuizNumber
        fields = ['id','title','quiz_number','questions']