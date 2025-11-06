# Firebase Blaze Plan Budget Setup Guide

This guide provides step-by-step instructions for setting up tight budget controls on Firebase Blaze plan to ensure costs stay under $1/month.

## Overview

While Firebase Cloud Functions require the Blaze plan, you can set up strict budget controls to ensure you don't get charged unexpectedly. This guide will help you:
1. Set up budget alerts
2. Configure spending limits
3. Monitor usage
4. Disable spending beyond $1/month

## Step 1: Upgrade to Blaze Plan

1. **Open Firebase Console**
   - Go to https://console.firebase.google.com
   - Select your project

2. **Navigate to Usage and Billing**
   - Click the gear icon (⚙️) next to Project Overview
   - Select "Usage and billing"
   - Click "Details & settings"

3. **Upgrade to Blaze Plan**
   - Click "Modify plan"
   - Select "Blaze (Pay as you go)"
   - Click "Purchase"

## Step 2: Set Up Google Cloud Budget Alerts

Firebase billing is managed through Google Cloud Platform. You need to set up budgets there.

### Access Google Cloud Console

1. **Link to Google Cloud**
   - In Firebase Console, go to Project Settings (⚙️) > Usage and billing
   - Click "Manage in Google Cloud Console" or visit https://console.cloud.google.com

2. **Select Your Project**
   - Make sure you're in the correct project (should match your Firebase project)

### Create Budget with $1 Limit

1. **Navigate to Billing**
   - In Google Cloud Console, click the hamburger menu (☰)
   - Go to "Billing" > "Budgets & alerts"
   - Or visit: https://console.cloud.google.com/billing/budgets

2. **Create Budget**
   - Click "+ CREATE BUDGET"
   - **Name:** Firebase Monthly Budget - $1 Limit
   - **Time range:** Monthly
   - **Projects:** Select your Firebase project
   - Click "NEXT"

3. **Set Budget Amount**
   - **Budget type:** Specified amount
   - **Target amount:** $1.00 USD
   - Click "NEXT"

4. **Set Alert Thresholds**
   Configure multiple alerts at different spending levels:
   
   - **Alert 1:** 50% ($0.50)
     - Check "Email alerts to billing admins and users"
     - Add additional email addresses if needed
   
   - **Alert 2:** 75% ($0.75)
     - Check "Email alerts to billing admins and users"
   
   - **Alert 3:** 90% ($0.90)
     - Check "Email alerts to billing admins and users"
   
   - **Alert 4:** 100% ($1.00)
     - Check "Email alerts to billing admins and users"
   
   - Click "FINISH"

### Set Up Programmatic Notifications (Optional)

For immediate notifications, you can connect to pub/sub or webhooks, but email alerts are sufficient for most use cases.

## Step 3: Configure Automatic Spending Caps

**Important:** Google Cloud does NOT automatically stop services when budget is exceeded. You must manually disable services or use App Engine spending limits (if applicable).

### Option 1: Manual Monitoring (Recommended)

1. **Enable All Alert Emails**
   - You'll receive emails at 50%, 75%, 90%, and 100% of budget
   - When you receive the 90% alert, manually check usage
   - At 100%, consider disabling Cloud Functions temporarily

2. **Disable Cloud Functions if Needed**
   - Go to Firebase Console > Functions
   - Click on a function > "Delete" (if over budget)
   - Or in Google Cloud Console: Cloud Functions > Disable function

### Option 2: Set Cloud Functions Quota Limits

1. **Navigate to Quotas**
   - In Google Cloud Console, go to IAM & Admin > Quotas
   - Or visit: https://console.cloud.google.com/iam-admin/quotas

2. **Filter for Cloud Functions**
   - Search for "Cloud Functions API"
   - Look for quota named "CPU time" or "Invocations"

3. **Request Quota Decrease (Manual Process)**
   - Google Cloud doesn't allow setting maximums directly
   - You can file a support ticket to request lower quotas
   - Not recommended as it may limit legitimate use

### Option 3: App Engine Spending Limit (If Using App Engine)

If you're using App Engine (not just Cloud Functions), you can set a daily spending limit:

1. **Go to App Engine Settings**
   - Visit: https://console.cloud.google.com/appengine/settings
   
2. **Set Daily Budget**
   - Under "Spending Limit", click "Edit"
   - Set daily limit: $0.033 (≈ $1/month)
   - Save

**Note:** This only applies to App Engine, not Cloud Functions.

## Step 4: Monitor Usage Regularly

### Daily Monitoring

1. **Check Firebase Console**
   - Go to Firebase Console > Usage and billing
   - Review current month's usage

2. **Check Google Cloud Billing**
   - Visit: https://console.cloud.google.com/billing
   - Review "Cost breakdown"
   - Check "Cost table" for detailed breakdown

### Set Up Weekly Reports

1. **Enable Billing Reports**
   - In Google Cloud Console > Billing > Reports
   - Click "Add filter"
   - Select your Firebase project
   - Set date range to "Last 7 days"

2. **Export to Email (Optional)**
   - Click "Save as report"
   - Schedule weekly email delivery

## Expected Costs for This Implementation

Based on the admin invitation feature:

### Free Tier Allowances (Monthly)
- **Cloud Functions Invocations:** 2,000,000 free
- **Cloud Functions Compute Time:** 400,000 GB-seconds free
- **Cloud Functions CPU Time:** 200,000 GHz-seconds free
- **Networking (Outbound):** 5 GB free

### Estimated Usage for Typical Admin Operations

Assuming moderate usage:
- **User invitations:** ~10-20 per month
- **Password resets:** ~5-10 per month
- **User list loads:** ~50 per month
- **Total invocations:** ~100 per month

**Expected cost:** $0.00 (well within free tier)

### What Could Cause Charges

1. **Excessive invocations** (>2 million/month)
   - Unlikely unless there's a loop or attack
   
2. **Long-running functions** (>400k GB-seconds)
   - Our functions are simple and fast
   
3. **Large data transfers** (>5 GB outbound)
   - Email sending counts but is minimal

**Worst-case scenario:** Even with 10x usage, costs would be < $0.10/month

## Emergency: What to Do If Budget Exceeded

If you receive a 100% budget alert:

### Immediate Actions

1. **Check Usage**
   ```
   Go to: https://console.cloud.google.com/billing
   Review: Cost table and Cost breakdown
   Identify: Which service is causing charges
   ```

2. **Disable Cloud Functions (If Needed)**
   ```
   Firebase Console > Functions
   Select each function > Click "..." > Delete
   ```
   
   Or in Google Cloud Console:
   ```
   Cloud Functions > Select function > DELETE
   ```

3. **Review Firestore Usage**
   - Check if there's unexpected database activity
   - Review security rules for potential abuse

4. **Check for Attacks**
   - Review Cloud Functions logs for suspicious activity
   - Look for repeated failed attempts or unusual patterns

### Restore Services

Once you've identified and resolved the issue:

1. **Redeploy Functions**
   ```bash
   cd functions
   npm run build
   cd ..
   firebase deploy --only functions
   ```

2. **Monitor Closely**
   - Check usage hourly for the next day
   - Ensure the issue is resolved

## Additional Security Measures

### Rate Limiting

Add rate limiting to your Cloud Functions to prevent abuse:

```typescript
// Example: Limit invitations to 10 per hour per admin
const RATE_LIMIT = 10;
const RATE_WINDOW = 3600000; // 1 hour in ms

// Track invitations in memory or Firestore
const invitationCounts = new Map();

export const inviteUser = functions.https.onCall(async (data, context) => {
  const adminId = context.auth.uid;
  const now = Date.now();
  
  // Check rate limit
  const userInvites = invitationCounts.get(adminId) || [];
  const recentInvites = userInvites.filter(time => now - time < RATE_WINDOW);
  
  if (recentInvites.length >= RATE_LIMIT) {
    throw new functions.https.HttpsError(
      'resource-exhausted',
      'Too many invitations. Please try again later.'
    );
  }
  
  // Record this invitation
  recentInvites.push(now);
  invitationCounts.set(adminId, recentInvites);
  
  // ... rest of function
});
```

### Firebase App Check

Enable App Check to prevent unauthorized access:

1. **Enable App Check**
   - Firebase Console > App Check
   - Register your app
   - Enforce App Check for Cloud Functions

2. **This Prevents:**
   - Unauthorized API calls
   - Bots and automated attacks
   - Reduces risk of unexpected charges

## Summary Checklist

- [ ] Upgraded to Blaze plan
- [ ] Created $1 monthly budget in Google Cloud Console
- [ ] Set up alerts at 50%, 75%, 90%, 100%
- [ ] Added email addresses for alerts
- [ ] Reviewed expected costs (should be $0)
- [ ] Bookmarked billing console URL
- [ ] Tested alert emails (by triggering a test alert)
- [ ] Documented emergency disable procedure
- [ ] Considered adding rate limiting to functions
- [ ] Enabled App Check (optional but recommended)

## Support and Resources

**If you exceed budget and need help:**
1. Disable Cloud Functions immediately
2. Review Google Cloud Console billing logs
3. Check Cloud Functions execution logs
4. File a support ticket if needed: https://firebase.google.com/support

**Cost Calculator:**
- https://firebase.google.com/pricing
- https://cloud.google.com/products/calculator

**Budget Management:**
- https://cloud.google.com/billing/docs/how-to/budgets

## Final Notes

With the configuration described above:
- ✅ You'll receive email alerts at $0.50, $0.75, $0.90, and $1.00
- ✅ Typical usage will be $0 (within free tier)
- ✅ Even heavy usage likely < $0.50/month
- ⚠️ You must manually disable services if budget exceeded (Google doesn't auto-stop)
- ✅ Budget alerts give you warning before charges occur

**Recommendation:** Set up the budget alerts immediately after upgrading, then monitor for the first month to see actual usage patterns.
