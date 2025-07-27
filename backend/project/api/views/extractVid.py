from pytubefix import YouTube
from pytubefix.cli import on_progress
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.utils.cohere import generate_quiz_from_notes
from faster_whisper import WhisperModel
import os
import re

model_size = "large-v3"
whisper_model = WhisperModel(model_size, device="cpu", compute_type="int8")

def transcribe_audio(file_path):
    segments, _ = whisper_model.transcribe(file_path, beam_size=5)
    return " ".join([seg.text for seg in segments])

class SummaryVideoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        url = request.data.get('url')
        if not url:
            return Response({"error": "No URL provided"}, status=400)

        try:
            yt = YouTube(url, on_progress_callback=on_progress)

            if yt.length > 20 * 60:
                print("too long")
                return Response({"error": "Video too long. Max length allowed is 20 minutes."}, status=400)

            audio_stream = yt.streams.filter(only_audio=True).order_by('abr').desc().first()

            safe_title = re.sub(r'[\\/*?:"<>|]', "_", yt.title)
            filename = f"{safe_title}.mp4"

            BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
            DOWNLOAD_DIR = os.path.join(BASE_DIR, "downloads")
            os.makedirs(DOWNLOAD_DIR, exist_ok=True)

            full_path = os.path.join(DOWNLOAD_DIR, filename)
            audio_stream.download(output_path=DOWNLOAD_DIR, filename=filename)

            transcript = transcribe_audio(full_path)

            # ✅ Generate quiz
            quiz_data = generate_quiz_from_notes(transcript, request.user)

            # ✅ Delete the audio file after processing
            if os.path.exists(full_path):
                os.remove(full_path)

            return Response({
                'success': True,
                'message': "Quiz generated successfully",
                'data': quiz_data  # include this if you want to return quiz data too
            })

        except Exception as e:
            # Clean up if download happened but something else failed
            if 'full_path' in locals() and os.path.exists(full_path):
                os.remove(full_path)
            return Response({'success': False, 'error': str(e)}, status=500)
