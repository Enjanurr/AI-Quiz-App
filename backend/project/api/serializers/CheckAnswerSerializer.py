from rest_framework import serializers
from ..models import Choice, Question, StudentAnswer

# still not in used

# After checking the answer and comparing it to the student answer 
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text', 'is_correct']


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'text', 'choices']


class StudentAnswerSerializer(serializers.ModelSerializer):
    selected_choice = ChoiceSerializer()
    question = QuestionSerializer()
    is_correct = serializers.SerializerMethodField()

    class Meta:
        model = StudentAnswer
        fields = ['question', 'selected_choice', 'is_correct']

    def get_is_correct(self, obj):
        return obj.selected_choice.is_correct
