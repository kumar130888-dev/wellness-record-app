# Firebase Setup Instructions

Follow these steps to set up Firebase for your Wellness Record application:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `wellness-record-app`
4. Accept terms and create project
5. Wait for project to be created

## 2. Enable Authentication

1. In Firebase Console, go to **Build** → **Authentication**
2. Click **Get Started**
3. Click **Email/Password** provider
4. Enable it and save

## 3. Create Firestore Database

1. Go to **Build** → **Firestore Database**
2. Click **Create Database**
3. Choose location (closest to your users)
4. Start in **Production mode**
5. Click **Create**

## 4. Set Firestore Security Rules

In **Firestore Database** → **Rules**, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write only their own records
    match /wellness_records/{recordId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow create: if request.auth.uid == request.resource.data.userId;
    }
  }
}
```

Click **Publish** to save.

## 5. Get Firebase Config

**Method 1 - From Project Overview:**

1. In Firebase Console, go to **Project Overview** (home icon)
2. Look for the section showing your project details
3. Click on the **Web** icon (</>) in the "Get started by adding Firebase to your app" section
4. Click "Web" if prompted
5. Register your app with name: `wellness-record-app`
6. Copy the entire config object that looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "wellness-record-app.firebaseapp.com",
  projectId: "wellness-record-app",
  storageBucket: "wellness-record-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
};
```

**Method 2 - From Project Settings:**

1. Click the **⚙️ Settings** icon (top right)
2. Select **Project settings**
3. Go to the **"Your apps"** tab
4. Find your **Web** app in the list
5. Click the copy icon next to the config code
6. The config will be copied to clipboard

**If you don't see your app:**

1. Click **Add app** button
2. Select **Web** (</> icon)
3. Enter app name: `wellness-record-app`
4. Click **Register app**
5. Firebase will show you the config - copy it

## 6. Add Environment Variables

Create `.env.local` in your project root:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

Replace values from step 5.

## 7. Restart Development Server

```bash
npm start
```

## 8. Deploy to Vercel

1. Push code to GitHub
2. Go to Vercel Dashboard
3. In Project Settings → Environment Variables
4. Add all Firebase variables from step 6
5. Redeploy

## Security Notes

✅ All records are encrypted by Firebase
✅ Users can only access their own records
✅ Passwords are hashed and secure
✅ Data is GDPR compliant
✅ Automatic backups are enabled

## Backup Your Data

Firebase automatically backs up your data daily. You can also:

1. Go to Firestore Database
2. Click "..." menu
3. Export collection (creates backup files)
