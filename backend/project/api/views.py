'''
from django.shortcuts import render
from django.http import JsonResponse
# Create your views here.
def hello(request):
    return JsonResponse({"message":"Hello Frontend"})
        '''    
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello from DRF"})
