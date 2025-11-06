# Setting Up Your First Admin User

This guide walks you through setting up the first admin user for the Nexus RPG admin panel.

## ⚠️ Important: Firebase Plan Requirements

**Cloud Functions Requirement:**
- The user invitation and password reset features require **Firebase Cloud Functions**
- Cloud Functions are **only available on the Blaze (pay-as-you-go) plan**
- The Spark (free) tier does NOT support Cloud Functions

**Good news:** The Blaze plan has generous free tier limits that cover typical usage:
- 2 million function invocations/month free
- 400,000 GB-seconds compute time free
- 200,000 CPU-seconds free
- You only pay for usage beyond these limits

**Alternative for Spark tier users:**
If you want to stay on the Spark tier, you'll need to manually create users in the Firebase Console without the invitation features.

## Prerequisites

- Firebase project set up and deployed
- **Firebase project on Blaze (pay-as-you-go) plan** (required for Cloud Functions)
- Firebase CLI installed (`npm install -g firebase-tools`)
- Firebase Functions deployed (`firebase deploy --only functions`)
- A user account created in Firebase Authentication

## Method 1: Using Firebase Console (Recommended for First Admin)

This is the easiest method and doesn't require any code.

### Steps:

1. **Open Firebase Console**
   - Go to https://console.firebase.google.com
   - Select your project (`nexus-rpg-d04d1`)

2. **Navigate to Authentication**
   - Click "Authentication" in the left sidebar
   - Click on the "Users" tab

3. **Find Your User**
   - Locate the user you want to make an admin
   - Note their UID (you'll need this for Firestore)

4. **Add Admin Document in Firestore**
   - Click "Firestore Database" in the left sidebar
   - Click "Start collection"
   - Collection ID: `admins`
   - Document ID: `[paste the user's UID here]`
   - Add field:
     - Field: `email`
     - Type: `string`
     - Value: `[user's email address]`
   - Add another field:
     - Field: `grantedAt`
     - Type: `timestamp`
     - Value: Click "Set to current timestamp"
   - Click "Save"

5. **Set Custom Claim (Optional - Requires Blaze Plan)**
   - **Note:** Cloud Shell is only available on the Blaze plan
   - If on Spark tier, skip this step - the Firestore document is sufficient
   - If on Blaze tier:
     - Open Cloud Shell in Firebase Console (icon at top right)
     - Or use Method 2 below for local script setup
   - Custom claims provide faster auth checks but are not required

6. **Verify Admin Access**
   - Log out and log back in (to refresh the token)
   - Navigate to `https://your-site.com/admin/`
   - You should see the admin panel

## Method 2: Using Firebase CLI

If you have the Firebase CLI set up locally:

### Steps:

1. **Initialize Firebase Admin in a Node.js script**

Create a file `setup-admin.js`:

```javascript
const admin = require('firebase-admin');

// Initialize with your service account
// Download service account key from Firebase Console > Project Settings > Service Accounts
const serviceAccount = require('./path-to-your-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setupAdmin(email) {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    console.log('Found user:', user.uid);

    // Set custom claim
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log('Custom claim set');

    // Create Firestore document
    await admin.firestore().doc(`admins/${user.uid}`).set({
      email: email,
      grantedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('Firestore document created');

    console.log('✅ Admin setup complete for:', email);
  } catch (error) {
    console.error('Error setting up admin:', error);
  }
}

// Replace with actual admin email
setupAdmin('admin@example.com');
```

2. **Run the script**
```bash
node setup-admin.js
```

## Alternative: Spark Tier (Free Plan) Without Cloud Functions

If you want to stay on the Spark tier and not use Cloud Functions, you can still use the character sheet features but will need to manually manage users:

### Manual User Setup (Spark Tier)

1. **Create users manually in Firebase Console:**
   - Go to Authentication > Users
   - Click "Add user"
   - Enter email and password
   - Note the user's UID

2. **Create user document in Firestore:**
   - Go to Firestore Database
   - Create document at `{userId}/player-info`:
     - `email`: user's email
     - `name`: user's display name
     - `allowedCollections`: [] (empty array)

3. **Grant admin access (if needed):**
   - Create document at `admins/{userId}`:
     - `email`: user's email
     - `grantedAt`: current timestamp

**Limitations of Spark Tier:**
- ❌ No automated user invitation emails
- ❌ No admin-triggered password resets
- ❌ No user list management UI
- ✅ Character sheet features still work
- ✅ Manual user creation via Console works
- ✅ Admin access control via Firestore works

## Verification

After setting up an admin, verify it works:

1. **Check Firestore**
   - Confirm document exists at `admins/{userId}`

2. **Check Custom Claims**
   - In Firebase Console > Authentication > Users
   - Click on the user
   - Check "Custom claims" section
   - Should show: `{"admin": true}`

3. **Test Admin Access**
   - Log out completely
   - Log back in as the admin user
   - Navigate to `/admin/`
   - You should see the admin panel, not an error message

## Troubleshooting

### "Access Denied" Error

**Problem**: User sees "Access Denied" message on admin page

**Solutions**:
1. Verify Firestore document exists at `admins/{userId}`
2. Check custom claims are set correctly
3. Log out and log back in to refresh the authentication token
4. Clear browser cache and cookies

### Custom Claims Not Working

**Problem**: Custom claims don't seem to be applied

**Solutions**:
1. Wait a few seconds after setting claims
2. Force token refresh by logging out and back in
3. Verify claims were set using Firebase Console
4. Check that Cloud Functions are deployed correctly

### Firestore Permission Denied

**Problem**: Cannot create admin document in Firestore

**Solutions**:
1. Check Firestore security rules allow admin document creation
2. Temporarily set less restrictive rules for initial setup
3. Use Firebase CLI or Console to create the document manually

### Functions Not Deployed

**Problem**: Cloud Functions not available

**Solutions**:
```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

## Security Notes

⚠️ **Important Security Considerations**:

1. **Protect Service Account Keys**: Never commit service account keys to version control
2. **Limit Admin Access**: Only give admin privileges to trusted users
3. **Regular Audits**: Periodically review the list of admin users
4. **Logging**: Monitor Cloud Functions logs for suspicious activity
5. **Secure Backup**: Keep a secure record of admin email addresses

## Next Steps

After setting up your first admin:

1. **Invite Users**: Use the admin panel to invite new users
2. **Grant Additional Admins**: Use `setAdminRole` function to promote other users
3. **Test Password Reset**: Try triggering a password reset for a test user
4. **Review Documentation**: Read the full [ADMIN_GUIDE.md](./ADMIN_GUIDE.md)

## Support

If you encounter issues:
1. Check the [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) troubleshooting section
2. Review Firebase Console logs
3. Check Cloud Functions logs: `firebase functions:log`
4. Review Firestore security rules
