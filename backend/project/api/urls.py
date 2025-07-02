from django.urls import path
from api.views import SummaryView,QuizNumberView ,AllQuizNumber
from api.views import CreateUserView,EmailUserView,CheckAnswersView,ReviewQuizView,AllResultView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
     #All quizzes done answering or not
    path('Allquiznumber/',AllQuizNumber.as_view(),name='all_quiz'),
    path('allResult/',AllResultView.as_view(),name = 'all_result'), 
    
    # moslty post request
    path('extract/',SummaryView.as_view(), name='extract_audio'), # for extraction
   
    path('quizNumber/<str:quiznumber_id>/',QuizNumberView.as_view(),name='quizes' ), # 
    path('submitAnswers/',CheckAnswersView.as_view(), name='check_Answers'), # for answer submission
    # mostly get req
    
    path('reviewQuiz/<str:result_id>/', ReviewQuizView.as_view(),name='reviewQuiz'),  
    #authentication
    path("token/", EmailUserView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("user/register/", CreateUserView.as_view(), name="register"),
   
]   