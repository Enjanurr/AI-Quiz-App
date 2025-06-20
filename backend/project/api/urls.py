from django.urls import path
from api.views import Summary,quiz_List #generate_quiz_from_notes,test

urlpatterns = [
    #path('hello/', views.hello, name='hello'),
    path('extract/',Summary, name='extract_audio'),
    path('test/',quiz_List,name='quizes' ),
   
]   