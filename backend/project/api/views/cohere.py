import json
import cohere
import os

trial_key = os.environ.get('Trial_KEY')
co = cohere.ClientV2(trial_key)

def generate_quiz_from_notes(notes: str):
    prompt = f"""
You are a teacher. Based on the following notes, generate a 10-item multiple-choice quiz in JSON format.

Each item should follow this structure:
- question: the question text
- choices: a list of 4 choices (A-D)
- answer: the letter of the correct choice (A/B/C/D)

Only respond with valid JSON.
**Do not include markdown formatting, code fences, or any explanatory text — only output raw JSON.**

Student Notes:
{notes}
"""
    response = co.chat(
        model="command-a-03-2025",
        messages=[{"role": "user", "content": prompt}]
    )

    # Handles both str and list responses
    content = response.message.content
    if isinstance(content, list):
        content_text = "".join([c.text for c in content])
    else:
        content_text = content

    content_text = content_text.strip()

    try:
        quiz_data = json.loads(content_text)
        return quiz_data
    except json.JSONDecodeError as e:
        raise ValueError(f"[Invalid JSON] {e}\nRaw Content:\n{content_text}")
