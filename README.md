# 📊 Mood Tracker Dashboard

A responsive and intuitive dashboard that visualizes your mood trends over time.

🌐 **Live Demo**: [Check out the Dashboard](https://moody-nigo6fo3g-sarveshcores-projects.vercel.app/dashboard)

---

## ✅ Features

- 📅 Track your mood history by day
- 🌈 Emoji-coded mood categories
- 💾 Local data persistence via browser storage
- 📱 Fully responsive dashboard UI

---

## 🧰 Tech Stack

- **Frontend**: Next.js, Tailwind
- **Backend:** Firebase, Firestore(Database)
- **Hosting**: [Vercel](https://vercel.com)

---

## 🔧 Firebase Configuration

To run this project locally, you need to set up Firebase configuration:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Add a web app to your project
3. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

You can find these values in your Firebase Console > Project Settings > General > Your apps > Web app.

---

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/moody.git
```

```bash
cd moody
```

```bash
npm install
```

```bash
npm run dev
```

---

## 💡 Purpose

Designed to help users visualize their mental wellness journey. Built with simplicity and emotional clarity in mind.

---

##
