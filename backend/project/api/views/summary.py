from pytubefix import YouTube
from pytubefix.cli import on_progress
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt #This decorator marks a view as being exempt from the protection ensured by the middleware.
#use csrf_protect for a Decorator that provides the protection of CsrfViewMiddleware to a view.
import os
from api.utils.whisper import transcribe_audio

@csrf_exempt
def Summary(request):
    if request.method == 'POST':
        url = request.POST.get('url')
        if not url:
            return JsonResponse({"error": "No URL provided"}, status=400)
    
        try:
            yt = YouTube(url, on_progress_callback=on_progress)

            # Get best quality audio stream
            audio_stream = yt.streams.filter(only_audio=True).order_by('abr').desc().first()

            # Sanitize filename
            filename = yt.title.replace(" ", "_") + ".mp4"

            # Create absolute download path
            BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))  # 3 levels up
            DOWNLOAD_DIR = os.path.join(BASE_DIR, "downloads")
            os.makedirs(DOWNLOAD_DIR, exist_ok=True)

            # Full file path
            full_path = os.path.join(DOWNLOAD_DIR, filename)
            audio_stream.download(output_path=DOWNLOAD_DIR, filename=filename)
            transcript = transcribe_audio(full_path)

            return JsonResponse({
                'success': True,
                'file': os.path.join("downloads", filename),
                'text':transcript
            })

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST method allowed'}, status=405)
