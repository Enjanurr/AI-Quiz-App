from rest_framework import serializers
from ..models import Result

# used in displayAllResult
class AllResultSerializer(serializers.ModelSerializer):
    quiz_number = serializers.IntegerField(source='quiz.quiz_number')
    perfect = serializers.IntegerField(source='quiz.perfect_score')
    title = serializers.CharField(source="quiz.title")
    perfect_score = serializers.IntegerField(source='quiz.perfect_score')
    class Meta:
        model = Result
        fields = ['id','quiz_number','score','perfect','created_at','title','perfect_score']