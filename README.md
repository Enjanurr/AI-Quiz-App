# 🧠 AI Quiz Generator

A full-stack web app that generates interactive quizzes from YouTube videos using AI. Built with Django REST Framework, Next.js, Whisper, and Cohere, this app allows students to paste a YouTube link, get a summary, and take a custom quiz — all in one seamless flow.

---

## 📸 Demo

![screenshot](demo)  
*(Replace with your screenshot or demo GIF)*

---

## 🚀 Features

- 🎯 Paste a YouTube video URL
- 🎧 Transcribe audio using [Whisper](https://github.com/openai/whisper)
- ✨ Summarize and generate questions with [Cohere API](https://cohere.ai/)
- 🧪 Take an AI-generated quiz
- ✅ Automatically scores and stores user attempts
- 🔐 JWT Authentication (access & refresh token flow)

---

## 🛠️ Tech Stack

### Backend:
- Django + Django REST Framework
- SimpleJWT for authentication
- Cohere for AI-based quiz generation
- Faster-Whisper for audio transcription
- SQLite (dev) / PostgreSQL (optional)

### Frontend:
- Next.js (App Router)
- Tailwind CSS
- REST API integration with fetch
- LocalStorage-based auth handling

---

## 📂 Project Structure

