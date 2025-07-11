from rest_framework import serializers
from ..models import StudentAnswer,Choice,Result

class ChoiceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Choice
    fields = ['id','text','is_correct']
    

    
# so basically serializers just format the data and ensure there no missing value in it
class StudentAnswerReviewSerializer(serializers.ModelSerializer):
  question = serializers.CharField(source = "question.text")
  selected_choice_id = serializers.IntegerField(source="selected_choice.id")
  choices = serializers.SerializerMethodField()
  
  
  class Meta:
    model = StudentAnswer
    fields = ["question","choices","selected_choice_id"]
  
  def get_choices(self,obj):
    return ChoiceSerializer(obj.question.choices.all(),many=True).data
  
class ResultReviewSerializer(serializers.ModelSerializer):
  answers = StudentAnswerReviewSerializer(many=True, read_only=True)
  class Meta:
    model = Result
    fields = ["id","score","created_at","answers"]