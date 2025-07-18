# utils/cohere.py
import json
import cohere
import os
from django.db import transaction
from ..models import Question, Choice

trial_key = os.environ.get('Trial_KEY')
co = cohere.ClientV2(trial_key)

def generate_quiz_from_notes(notes: str, user):
    prompt = f"""
You are a teacher. Based on the following notes, generate a 10-item multiple-choice quiz in JSON format.

Each item should follow this structure:
[
  {{
    "question": "What is 2 + 2?",
    "choices": [
      {{"text": "3", "is_correct": false}},
      {{"text": "4", "is_correct": true}},
      {{"text": "5", "is_correct": false}},
      {{"text": "22", "is_correct": false}}
    ]
  }},
  ...
]

Only respond with valid JSON.
**Do not include markdown formatting, code fences, or any explanatory text — only output raw JSON.**

Student Notes:
{notes}
"""

    response = co.chat(
        model="command-a-03-2025",
        messages=[{"role": "user", "content": prompt}]
    )

    content = response.message.content
    content_text = "".join([c.text for c in content]) if isinstance(content, list) else content
    content_text = content_text.strip()

    quiz_data = json.loads(content_text)

    with transaction.atomic():
        for item in quiz_data:
            question_text = item.get("question")
            choices_data = item.get("choices", [])

            if not question_text or not choices_data:
                continue

            q = Question.objects.create(text=question_text, user=user)

            for choice in choices_data:
                Choice.objects.create(
                    question=q,
                    text=choice["text"],
                    is_correct=choice["is_correct"]
                )

    return quiz_data
