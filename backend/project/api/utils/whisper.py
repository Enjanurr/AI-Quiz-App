from faster_whisper import WhisperModel
import os

# Run on GPU with FP16
#model = WhisperModel(model_size, device="cuda", compute_type="float16")

# or run on GPU with INT8
# model = WhisperModel(model_size, device="cuda", compute_type="int8_float16")
# or run on CPU with INT8


#get the audio in the downloads folder

model_size = "large-v3"
model = WhisperModel(model_size, device="cpu", compute_type="int8")

def transcribe_audio(file_path):
    segments, info = model.transcribe(file_path, beam_size=5)
    text = " ".join([seg.text for seg in segments])
    print(text)
     
    

 
     