import json
import cohere
import os
import logging
from django.db import transaction
from ..models import Question, Choice, QuizNumber

# Set up logging
logger = logging.getLogger(__name__)

# Get Cohere API key
trial_key = os.environ.get('Trial_KEY')
co = cohere.ClientV2(trial_key)

def generate_quiz_from_notes(notes: str, user):
    prompt = f"""
You are a teacher. Based on the following notes, generate a 20-item quiz in JSON format. Include a "perfect_score" field and a "questions" field.

Respond in the format:
{{
  "perfect_score": 10,
  "questions": [
    {{
      "question": "What is 2 + 2?",
      "choices": [
        {{"text": "3", "is_correct": false}},
        {{"text": "4", "is_correct": true}}
      ]
    }}
  ]
}}

⚠️ Only respond with valid JSON. No explanations or comments.

Student Notes:
{notes}
"""

    try:
        response = co.chat(
            model="command-a-03-2025",
            messages=[{"role": "user", "content": prompt}]
        )

        content = response.message.content
        content_text = "".join([c.text for c in content]) if isinstance(content, list) else content
        content_text = content_text.strip()

        logger.debug("Cohere response:\n%s", content_text)

        quiz_data = json.loads(content_text)
        perfect = quiz_data.get("perfect_score", 10)
        questions = quiz_data.get("questions", [])

        last = QuizNumber.objects.filter(user=user).order_by('-quiz_number').first()

        with transaction.atomic():
            quiz_number = QuizNumber.objects.create(
                user=user,
                quiz_number=(last.quiz_number + 1) if last else 1,
                perfect_score=perfect
            )

            for item in questions:
                question_text = item.get("question")
                choices_data = item.get("choices", [])

                if not question_text or not choices_data:
                    continue

                q = Question.objects.create(quiz=quiz_number, text=question_text)

                for choice in choices_data:
                    text = choice.get("text")
                    is_correct = choice.get("is_correct")

                    if text is None or is_correct is None:
                        continue

                    Choice.objects.create(
                        question=q,
                        text=text,
                        is_correct=is_correct
                    )

        return "Quiz generated successfully ✅"

    except json.JSONDecodeError as e:
        logger.error("JSON decode error from Cohere: %s", e)
        return "Failed to parse JSON from Cohere ❌"

    except Exception as e:
        logger.error("Quiz generation failed: %s", e)
        return "Something went wrong while generating the quiz ❌"
