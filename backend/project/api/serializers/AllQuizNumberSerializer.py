from rest_framework import serializers
from ..models import QuizNumber

# used in displayAllQuizNumber file
class AllQuizNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizNumber
        fields= ['id','title','quiz_number','perfect_score']