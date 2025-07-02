from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from ..models import Result  
from ..serializers import StudentAnswerReviewSerializer

# The Result has the id for the question and the studentanser is reference to the choice
# just use the result to query everything.
class ReviewQuizView(APIView):
    permission_classes =[AllowAny]
    
    def get(self,request,result_id):
        try:
            result = Result.objects.get(id=result_id, user = request.user)
        except Result.DoesNotExist:
            return Response({"error": "Result not found"}, status = 404)
        
        serializer = StudentAnswerReviewSerializer(result)
        return Response(serializer.data)
    
