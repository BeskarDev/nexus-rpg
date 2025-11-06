# Admin User Management System

## Overview

This document describes the admin user management system for Nexus RPG, which allows administrators to invite users and manage password resets through a secure interface.

## ⚠️ Firebase Plan Requirement

**This feature requires Firebase Blaze (pay-as-you-go) plan** because it uses Cloud Functions.

- **Spark (free) tier:** Does NOT support Cloud Functions - manual user creation only
- **Blaze plan:** Supports Cloud Functions with generous free tier (2M invocations/month free)

See `SETUP_FIRST_ADMIN.md` for Spark tier alternatives and manual user management.

## Features

### 1. User Invitation Flow
Administrators can invite new users by email address. The system:
- Creates a Firebase Authentication account for the user
- Generates a secure password reset link
- Sends an email to the user with instructions
- Allows the user to set their own username and password

### 2. Admin-Triggered Password Reset
Administrators can trigger password resets for existing users. Users cannot initiate password resets themselves. This ensures:
- Controlled access management
- Security oversight by administrators
- Proper onboarding workflow

### 3. User List Management
Administrators can:
- View all registered users
- Search users by email or name
- See user status (verified/unverified, enabled/disabled)
- View last sign-in times

## Security Model

### Multi-Layer Security

#### 1. Firebase Authentication Custom Claims
- Admins have a custom claim `admin: true` set on their Firebase Auth token
- Custom claims are verified server-side in Cloud Functions
- Claims cannot be modified by client-side code

#### 2. Firestore Security Rules
```javascript
// Admin documents - only readable by admins
match /admins/{adminId} {
  allow read: if isAdmin();
  allow write: if false; // Only Cloud Functions can write
}
```

#### 3. Cloud Functions Authorization
All Cloud Functions check:
1. User is authenticated (`context.auth` exists)
2. User has admin privileges (via `checkIsAdmin()` function)
3. Input validation

#### 4. Client-Side UI Protection
The admin panel at `/admin/` is:
- Not linked in navigation (accessible only by direct URL)
- Protected by authentication checks
- Shows access denied for non-admin users
- Includes loading states to prevent race conditions

## Architecture

### Backend: Firebase Cloud Functions

Located in `/functions/src/index.ts`:

#### `inviteUser(email)`
- Creates a new Firebase Auth user or uses existing
- Generates and sends password reset email
- Creates user document in Firestore
- Returns success status and user ID

#### `triggerPasswordReset(email)`
- Verifies user exists
- Generates password reset link
- Sends email to user
- Admin-only operation

#### `listUsers(maxResults, pageToken)`
- Lists all users in Firebase Auth
- Supports pagination
- Returns user metadata
- Admin-only operation

### Frontend: React Components

#### UserManagementPanel (`/src/components/UserManagementPanel.tsx`)
Main component featuring:
- User list table with search
- Invite user dialog
- Password reset dialog
- Real-time status updates
- Error handling

#### Admin Page (`/src/pages/admin/index.tsx`)
Secure page that:
- Verifies user authentication
- Checks admin status
- Shows appropriate access denied messages
- Renders UserManagementPanel for authorized users

## Setup Instructions

### 1. Deploy Firebase Functions

```bash
cd functions
npm install
npm run build
cd ..
firebase deploy --only functions
```

### 2. Set Up First Admin

Since only admins can create other admins, you need to manually set up the first admin:

**Option A: Firebase Console**
1. Go to Firebase Console → Authentication
2. Find your user
3. Set custom claim: `{ "admin": true }`

**Option B: Firebase CLI**
```bash
firebase functions:shell
# Then in the shell:
admin.auth().setCustomUserClaims('USER_UID_HERE', { admin: true })
```

**Option C: Firestore Document**
Create a document at `/admins/{userId}`:
```json
{
  "email": "admin@example.com",
  "grantedAt": "2024-01-01T00:00:00Z"
}
```

### 3. Configure Email Templates

In Firebase Console → Authentication → Templates:
- Customize the "Password reset" email template
- Update branding and sender information

### 4. Access the Admin Panel

Navigate to: `https://your-domain.com/admin/`

⚠️ **Note**: This URL is not linked anywhere in the app and must be accessed directly.

## Usage Guide

### Inviting a New User

1. Navigate to `/admin/`
2. Click "Invite User" button
3. Enter the user's email address
4. Click "Send Invitation"
5. User receives an email with password setup link

**What happens:**
- If user doesn't exist: Creates account, sends password reset email
- If user exists: Sends password reset email to existing account

### Triggering a Password Reset

1. Navigate to `/admin/`
2. Find the user in the list (use search if needed)
3. Click the lock reset icon next to the user
4. Confirm the action
5. User receives password reset email

### Searching for Users

Use the search box to filter users by:
- Email address
- Display name

### Granting Admin Privileges

Granting admin privileges must be done through Firebase Console or CLI (see SETUP_FIRST_ADMIN.md for detailed instructions):

**Via Firebase Console:**
1. Navigate to Authentication > Users
2. Find the user to promote
3. Set custom claim: `{"admin": true}`
4. Create Firestore document at `admins/{userId}` with their email

**Via Firebase CLI:**
```javascript
// Using Firebase Admin SDK
const admin = require('firebase-admin');
await admin.auth().setCustomUserClaims(userId, { admin: true });
await admin.firestore().doc(`admins/${userId}`).set({
  email: userEmail,
  grantedAt: admin.firestore.FieldValue.serverTimestamp()
});
```

## Error Handling

### Common Error Messages

**"User must be authenticated"**
- User is not logged in
- Solution: Log in first

**"User must be an admin"**
- User lacks admin privileges
- Solution: Contact existing admin to grant privileges

**"No user found with email"**
- Email address doesn't match any Firebase Auth user
- Solution: Check email spelling, or invite user first

**"Failed to invite user"**
- Network error or Firebase service issue
- Solution: Check internet connection, retry, check Firebase console for service status

## Security Best Practices

### For Administrators

1. **Keep credentials secure**: Admin accounts have elevated privileges
2. **Audit regularly**: Review user list periodically
3. **Limit admin access**: Only grant admin to trusted users
4. **Monitor logs**: Check Firebase Functions logs for suspicious activity

### For Developers

1. **Never expose admin functions**: Keep all admin operations in Cloud Functions
2. **Validate all inputs**: Check email format, user existence, etc.
3. **Use custom claims**: Don't rely solely on Firestore for authorization
4. **Log admin actions**: Track who does what and when

## Testing

### Unit Tests
Tests are located in `/tests/` directory. Run with:
```bash
npm test
```

### Manual Testing Checklist

- [ ] Admin can access `/admin/` page
- [ ] Non-admin users see access denied message
- [ ] Invite new user successfully sends email
- [ ] Invite existing user sends password reset email
- [ ] Password reset function works
- [ ] User list loads and displays correctly
- [ ] Search functionality works
- [ ] Admin cannot be accessed via navigation links
- [ ] Error messages display appropriately

## Troubleshooting

### Admin Page Shows Access Denied

**Check:**
1. User is logged in
2. Custom claim is set: Check Firebase Console → Authentication → Users → User → Custom Claims
3. Admin document exists: Check Firestore → admins collection
4. Token is refreshed: Log out and log back in

### Password Reset Email Not Received

**Check:**
1. Email is correct
2. Check spam/junk folder
3. Firebase email settings configured correctly
4. Email quota not exceeded (Firebase free tier has limits)

### Cloud Functions Not Working

**Check:**
1. Functions are deployed: `firebase deploy --only functions`
2. Functions built successfully: `cd functions && npm run build`
3. Check function logs: `firebase functions:log`
4. Firebase project has billing enabled (Cloud Functions require Blaze plan)

## API Reference

### Cloud Functions

All functions are callable via `httpsCallable`:

```javascript
import { getFunctions, httpsCallable } from 'firebase/functions'

const functions = getFunctions(app)
const myFunction = httpsCallable(functions, 'functionName')
const result = await myFunction({ param: 'value' })
```

#### inviteUser
```typescript
interface InviteUserInput {
  email: string
}

interface InviteUserOutput {
  success: boolean
  message: string
  userId: string
  existingUser: boolean
}
```

#### triggerPasswordReset
```typescript
interface TriggerPasswordResetInput {
  email: string
}

interface TriggerPasswordResetOutput {
  success: boolean
  message: string
  userId: string
}
```

#### listUsers
```typescript
interface ListUsersInput {
  maxResults?: number  // Default 100, max 1000
  pageToken?: string
}

interface ListUsersOutput {
  success: boolean
  users: Array<{
    uid: string
    email: string
    displayName?: string
    emailVerified: boolean
    disabled: boolean
    metadata: {
      creationTime: string
      lastSignInTime?: string
    }
  }>
  pageToken?: string
}
```

## Maintenance

### Regular Tasks

1. **Monthly**: Review admin user list, remove inactive admins
2. **Quarterly**: Audit Firebase Functions logs
3. **As needed**: Update email templates
4. **On user request**: Trigger password resets

### Updating the System

When updating Firebase Functions:
```bash
cd functions
npm install  # Update dependencies if needed
npm run build
cd ..
firebase deploy --only functions
```

When updating the UI:
```bash
npm run build
firebase deploy --only hosting
```

## Support

For issues or questions:
1. Check this documentation
2. Review Firebase Console logs
3. Check GitHub issues
4. Contact the development team

## License

This admin system is part of the Nexus RPG project. See main LICENSE file for details.
