from django.urls import path
from api.views import summary

urlpatterns = [
    #path('hello/', views.hello, name='hello'),
    path('extract/',summary.Summary, name='extract_audio')
]   