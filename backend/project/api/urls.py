from django.urls import path
from api.views import Summary #generate_quiz_from_notes,test

urlpatterns = [
    #path('hello/', views.hello, name='hello'),
    path('extract/',Summary, name='extract_audio'),
       # path('test/',generate_quiz_from_notes,name='cohere' ),
   
]   