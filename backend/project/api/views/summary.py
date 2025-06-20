from pytubefix import YouTube
from pytubefix.cli import on_progress
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
import re

from faster_whisper import WhisperModel
#from .cohere import generate_quiz_from_notes  # We'll fix this later
#from ..utils.cohere import generate_quiz_from_notes 
from api.utils import generate_quiz_from_notes

# Initialize Whisper model (do this once)
model_size = "large-v3"
whisper_model = WhisperModel(model_size, device="cpu", compute_type="int8")

def transcribe_audio(file_path):
    segments, _ = whisper_model.transcribe(file_path, beam_size=5)
    text = " ".join([seg.text for seg in segments])
    #print("[Transcription Result]\n", text) #test 
    return text  # returns a dict



@csrf_exempt
def Summary(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method allowed'}, status=405)

    url = request.POST.get('url')
    if not url:
        return JsonResponse({"error": "No URL provided"}, status=400)

    try:
        yt = YouTube(url, on_progress_callback=on_progress)
        audio_stream = yt.streams.filter(only_audio=True).order_by('abr').desc().first()

        # Sanitize title for filename
        safe_title = re.sub(r'[\\/*?:"<>|]', "_", yt.title)
        filename = f"{safe_title}.mp4"

        # Prepare download path
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        DOWNLOAD_DIR = os.path.join(BASE_DIR, "downloads")
        os.makedirs(DOWNLOAD_DIR, exist_ok=True)

        full_path = os.path.join(DOWNLOAD_DIR, filename)
        audio_stream.download(output_path=DOWNLOAD_DIR, filename=filename)

        transcript_result = transcribe_audio(full_path)
        #cohere
        quiz_data = generate_quiz_from_notes(transcript_result)

        return JsonResponse({
           'quiz': quiz_data
        })

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    



