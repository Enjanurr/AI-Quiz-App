
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from ..models import Result  
from api.serializers.ReviewSerializer import ResultReviewSerializer

# The Result has the id for the question and the studentanser is reference to the choice
# just use the result to query everything.
class ReviewQuizView(APIView):
    permission_classes =[IsAuthenticated]
    
    def get(self,request,reviewnumber_id):
        try:
            result = Result.objects.get(id=reviewnumber_id, user = request.user)
        except Result.DoesNotExist:
            return Response({"error": "Result not found"}, status = 404)
       
        serializer = ResultReviewSerializer(result)
        return Response(serializer.data)
    
