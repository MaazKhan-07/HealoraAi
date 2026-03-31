# 🧠 Healora AI — Intelligent Post-Discharge Care Companion

Bridging the gap between hospital and home

Healora AI is an AI-powered mobile and web platform designed to support patients during their critical post-discharge recovery phase. By combining intelligent monitoring, personalized care plans, and real-time alerts, Healora AI creates a connected ecosystem for patients, caregivers, and healthcare professionals.

Live Project Link:- https://healora-ai-companion--maaz170807.replit.app

🚀 Project Overview

The 30-day period after hospital discharge is one of the most vulnerable stages in patient recovery — yet often lacks structured support.

🔴 Problem:

~20% of patients are readmitted within 30 days
Lack of continuous monitoring and engagement
Poor adherence to recovery plans

🟢 Solution — Healora AI:
An end-to-end intelligent care loop that enables:

👤 Patients → Daily symptom tracking (app + voice)
👨‍👩‍👧 Caregivers → Real-time alerts & monitoring dashboard
👨‍⚕️ Doctors → AI-generated recovery insights using NLP

✨ Key Features

🧑‍⚕️ Patient Portal
Daily recovery checklist (medication, diet, exercises)
AI-powered symptom check-in (conversational UI)
📊 Real-time AI Risk Score (Low / Medium / High)
🎤 Voice assistant for elderly-friendly interaction
🏅 Gamified medication adherence (streaks & rewards)
📄 Auto-generated recovery plans

👨‍👩‍👧 Caregiver Portal
Patient monitoring dashboard with risk indicators
📈 Symptom timeline visualization (charts)
🚨 Real-time alerts:
  -Missed medication
  -High-risk symptoms
  -Missed check-ins
  -Patient detail view with adherence tracking

👨‍⚕️ Doctor Portal
Patient overview with filtering & sorting
🧠 NLP-based discharge note parser (mock AI)
📑 Auto-generated recovery summaries
📊 Analytics dashboard:
   -Total patients
   -High-risk cases
   -Adherence metrics
   
💡 Key Innovations

🤖 NLP-based discharge note parsing (BERT-powered)
⚠️ AI Risk Scoring Engine for early intervention
🎙️ Voice-enabled assistant (Whisper API integration)
🎮 Gamification layer to improve adherence
🔁 Real-time communication loop across stakeholders
🏗️ Application Architecture

The app is structured into 3 role-based portals:

/                → Landing Page
/patient         → Patient Dashboard
/caregiver       → Caregiver Dashboard
/doctor          → Doctor Dashboard


🔐 Role-Based Access Flow
Landing page with login selection:
  -Patient
  -Caregiver
  -Doctor
  
🛠️ Tech Stack
Frontend
 -React.js
 -React Native
 -React Router
 -Recharts / Chart.js
Backend
 -Node.js
 -FastAPI
 -WebSockets
AI / ML
 -Random Forest (Risk Scoring)
 -Whisper API (Voice Processing)
Database
 -PostgreSQL
Infrastructure
 -Firebase

 🎨 UI Highlights
 -Circular recovery progress indicator
 -Conversational symptom check-in flow
 -Animated “AI analyzing…” loader
 -Voice waveform UI simulation
 -Gamified streak tracking system
 -Clean dashboard layouts for all roles
 
📊 Future Enhancements
 🔗 Real EHR integration (FHIR APIs)
 📱 Wearable device integration (heart rate, oxygen levels)
 🤖 Advanced predictive models (deep learning)
 🔔 Push notifications & SMS alerts
 🌐 Multi-language voice assistant

 ⭐ Support

If you found this project helpful, please ⭐ the repository and share it!
