from django.urls import path
from api.views import SummaryVideoView,QuizNumberView ,AllQuizNumberView,SummaryPDFView,UpdateView
from api.views import CreateUserView,EmailUserView,CheckAnswersView,AllResultView , ReviewQuizView
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
     #All quizzes done answering or not
    path('Allquiznumber/',AllQuizNumberView.as_view(),name='all_quiz'),
    path('allResult/',AllResultView.as_view(),name = 'all_result'), 
    
    path("update/<str:quiznumber_id>/",UpdateView.as_view(),name="update"), 
    
    # moslty post request
    path('submiturl/',SummaryVideoView.as_view(), name='extract_audio'), # for extraction
    path('submitpdf/',SummaryPDFView.as_view(), name='extract_audio'),
    path('quizNumber/<str:quiznumber_id>/',QuizNumberView.as_view(),name='quizzes' ), #
    path('reviewAnswers/<str:reviewnumber_id>/',ReviewQuizView.as_view(), name = "Review_answer"), 
    
    path('submitAnswers/<str:quiznumber_id>',CheckAnswersView.as_view(), name='check_Answers'), # for answer submission
    # mostly get req
    
    path('reviewQuiz/<str:result_id>/', ReviewQuizView.as_view(),name='reviewQuiz'),  
    #authentication
    path("token/", EmailUserView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("user/register/", CreateUserView.as_view(), name="register"),
   
]   