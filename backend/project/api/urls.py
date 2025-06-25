from django.urls import path
from api.views import SummaryView,QuizListView #generate_quiz_from_notes,test
from api.views import CreateUserView,EmailUserView,CheckAnswersView
from rest_framework_simplejwt.views import TokenObtainPairView,  TokenRefreshView


urlpatterns = [
    #path('hello/', views.hello, name='hello'),
    path('extract/',SummaryView.as_view(), name='extract_audio'),
    path('test/',QuizListView.as_view(),name='quizes' ),
    path('submitAnswers/',CheckAnswersView.as_view(), name='check_Answers'),
    #authentication
    path("token/", EmailUserView.as_view(), name="get_token"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh_token"),
    path("user/register/", CreateUserView.as_view(), name="register"),
   
]   