# Firebase Setup Guide

## Quick Fix for Firebase Configuration Errors

The errors you're seeing are because Firebase is not properly configured. Here's how to fix them:

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard

### 2. Add Web App

1. In your Firebase project, click the web icon (</>) to add a web app
2. Give it a name (e.g., "moody-app")
3. Copy the configuration object

### 3. Set Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Enable Authentication

1. In Firebase Console, go to "Authentication" > "Sign-in method"
2. Enable "Email/Password" authentication
3. Save the changes

### 5. Set up Firestore Database

1. Go to "Firestore Database" in Firebase Console
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location close to your users

### 6. Update Security Rules (Optional)

For production, update Firestore security rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 7. Restart Your Development Server

```bash
npm run dev
```

## For Cloud Run Deployment

If you're deploying to Google Cloud Run, make sure to:

1. Set the environment variables in your Cloud Run service configuration
2. Use the same Firebase project for both development and production
3. Update Firestore security rules for production use

## Troubleshooting

- **"Firebase configuration is incomplete"**: Check that all environment variables are set
- **"Cannot read properties of undefined (reading 'onAuthStateChanged')"**: This should be fixed now with the updated error handling
- **Authentication errors**: Make sure Email/Password auth is enabled in Firebase Console

## Development Mode (Optional)

If you want to develop without Firebase temporarily, you can comment out the Firebase imports and use local storage instead, but this will require more code changes.
