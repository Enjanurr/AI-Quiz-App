from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from ..models  import QuizNumber
from ..serializers import QuizNumberSerializer
# Already working
class QuizNumberView(APIView):
    permission_classes = [AllowAny]
    
    def get(self,request,quiz_id):
        try:
            quiz_number = QuizNumber.objects.get(id=quiz_id,user=request.user)
        except QuizNumber.DoesNotExist:
            return Response({"error": "Quiznumber not found"}, status=404)
        
        serializer = QuizNumberSerializer(quiz_number,many=True)
        return Response(serializer.data)
        