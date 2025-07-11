from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
import fitz #pip install pymupdf
from api.utils.cohere import generate_quiz_from_notes

class SummaryPDFView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self,request):
        uploaded_file = request.FILES.get("pdf")    
        
        if not uploaded_file:
            return JsonResponse({"error":"No pdf "}, status=400)
        
        
        pdf_content = ""
        with fitz.open(stream=uploaded_file.read(),filetype="pdf") as doc:
            for page in doc:
                pdf_content += page.get_text()
        try:
            structured_data = generate_quiz_from_notes(pdf_content, request.user)
            return JsonResponse({'success': True, 'message': "Quiz generated successfully"})
        except  Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=500)
            