from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..models  import QuizNumber
from api.serializers.QuizNumberSerializer import QuizNumberSerializer
# Already working
class QuizNumberView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request,quiznumber_id):
        try:
            quiz_number = QuizNumber.objects.get(id=quiznumber_id,user=request.user)
        except QuizNumber.DoesNotExist:
            return Response({"error": "Quiznumber not found"}, status=404)
        
        serializer = QuizNumberSerializer(quiz_number)
        return Response(serializer.data)
        