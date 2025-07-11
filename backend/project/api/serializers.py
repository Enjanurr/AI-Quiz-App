from rest_framework import serializers
from .models import Question,Choice, QuizNumber, StudentAnswer, Result
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate


"""
class EmailSerialiser(TokenObtainPairSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
        
    def validate(self,attrs):
        email = attrs.get('email')
        password= attrs.get('password')
        
        try:
            user= User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({"detail": "Account with this email does not exist."})
        
        user = authenticate(username = user.username, password=password)
        if user is None:
            raise serializers.ValidationError({"detail": "Incorrect password."})
        data = super().validate({
            "username" :user.username,
            "password":password
        })
        return data
    
    def get_token(cls, user):
        return super().get_token(user)

    # ✅ This removes 'username' from the browsable API and docs
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('username', None)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {
                "required": True,
                "validators": [
                    UniqueValidator(
                        queryset=User.objects.all(),
                        message="A user with that email already exists."
                    )
                ]
            }
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)       
        """
        
"""
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
        fields = ['id','user','quiz_number','questions']"""


# After checking the answer and comparing it to the student answer 
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id','text','is_correct']
        
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id','text','choices']
        
class StudentAnswerSerializer(serializers.ModelSerializer):
    selected_choice = ChoiceSerializer()
    question = QuestionSerializer()
    is_correct = serializers.SerializerMethodField()
    
    class Meta:
        model = StudentAnswer
        fields = ['question','selected_choice','is_correct']
    
    def get_is_correct(self,obj): # obj refers to the current instance of the model being serialized 
        return obj.selected_choice.is_correct




# For displaying the All Quizzez
class AllResultSerializer(serializers.ModelSerializer):
    # result dont have this field so just get it since you reference result to other tables
    quiz_number = serializers.IntegerField(source='quiz.quiz_number')
    #user = serializers.StringRelatedField()
    perfect_score = serializers.IntegerField(source='quiz.perfect_score')
    class Meta:
        model = Result
        fields = ['id','quiz_number','score','create_at','perfect_score'] # if error happens I remove the 'user', here just put it back
    

# so basically serializers just format the data and ensure there no missing value in it
class StudentAnswerReviewSerializer(serializers.ModelSerializer):
    # In order to create an object just define it
    question = serializers.CharField(source="question.text")
    selected_choice = serializers.SerializerMethodField()
    correct_choice = serializers.SerializerMethodField()
    is_correct = serializers.SerializerMethodField()

    class Meta:
        model = StudentAnswer # table
        fields = [
            "question",
            "selected_choice",
            "correct_choice",
            "is_correct"
        ]
     # formats the selected choice
    def get_selected_choice(self, obj):
        return {
            "id": obj.selected_choice.id,
            "text": obj.selected_choice.text
        }
       # formats the correct choice
    def get_correct_choice(self, obj):
        correct = obj.question.choices.filter(is_correct=True).first()
        return {
            "id": correct.id,
            "text": correct.text
        } if correct else None
     # True or False which flag whether the student answer is right or not
    def get_is_correct(self, obj):
        return obj.selected_choice.is_correct
    
#  It structure the data like this
"""
{
  "id": 3,
  "score": 7,
  "created_at": "2025-06-26T09:45:00Z",
  "answers": [
    {
      "question": "What is the capital of France?",
      "selected_choice": {
        "id": 22,
        "text": "Berlin"
      },
      "correct_choice": {
        "id": 25,
        "text": "Paris"
      },
      "is_correct": false
    },
    ...
  ]
}
"""
