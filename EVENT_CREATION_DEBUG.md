# Event Creation Debugging Guide

## Problem
Events are not being created/saved when the form is submitted.

## Diagnostic Steps

### Step 1: Open Browser Developer Tools
1. Press **F12** to open DevTools
2. Go to the **Console** tab
3. Go to **Network** tab
4. Keep both tabs visible while testing

### Step 2: Test Event Creation
1. Go to Organizer Dashboard → Events page
2. Click "+ Add Event" button
3. Fill in the form with test data:
   - **Title**: "Test Event 2024"
   - **Description**: "This is a test event for debugging"
   - **Type**: Select "Workshop"
   - **Mode**: Select "Hybrid"
   - **Start Date**: Pick a date/time in the future
   - **End Date**: Pick a date/time after start date
   - Leave other options as default
4. Click "Create Event" button

### Step 3: Check Console Logs
Look for these messages in the **Console** tab:

**✅ Success scenario:**
```
Creating event with data: {title: "Test Event 2024", ...}
Token: Present
Event created response: {success: true, message: "Event created successfully", data: {...}}
Event created: {_id: "...", title: "Test Event 2024", ...}
```

**❌ Error scenario - Missing token:**
```
Token: Missing
Create event error: Error: Not authorized, token missing
```
→ **Fix**: Re-login as organizer and make sure localStorage has the token

**❌ Error scenario - Invalid dates:**
```
Failed to create event: "End date must be after start date"
```
→ **Fix**: Make sure end date is after start date

**❌ Error scenario - Validation failed:**
```
Create event error: Error: Title and description are required
```
→ **Fix**: Fill in all required fields (marked with *)

### Step 4: Check Network Tab
1. Go to **Network** tab in DevTools
2. Perform action: Create event
3. Look for a request to: `http://localhost:5000/api/events`
4. Click on it and check:
   - **Request Headers**: Should have `Authorization: Bearer eyJ...`
   - **Request Body**: Should contain your event data
   - **Response**: Should show `status: 201` (Created) with event data

**Expected Response:**
```json
{
  "success": true,
  "message": "Event created successfully",
  "data": {
    "_id": "507f...",
    "title": "Test Event 2024",
    "description": "...",
    "organizer": "...",
    "eventState": "CREATED",
    "startDate": "2024-02-15T10:00:00.000Z",
    "endDate": "2024-02-16T17:00:00.000Z",
    ...
  }
}
```

### Step 5: Check LocalStorage
1. Go to **Application** or **Storage** tab
2. Click on **LocalStorage**
3. Select your localhost entry
4. Verify these keys exist:
   - `token` - Should have a JWT token (eyJ...)
   - `role` - Should be "organizer"
   - `userId` - Should have a MongoDB ID
   - `userName` - Should have your name

If any are missing:
→ **Fix**: Logout and re-login as organizer role

### Step 6: Check MongoDB
Open [MongoDB Atlas](https://cloud.mongodb.com):
1. Go to your cluster
2. Collections → UCEF_DB → events
3. Look for your newly created event
4. If not present, the creation failed at database level

## Common Issues & Solutions

### Issue 1: "Network Error" / Failed to Connect
**Symptoms**: 
- Network tab shows no request or failed request
- Console shows: `Error: Network Error`

**Causes**:
- Backend server not running
- Wrong API URL

**Solution**:
1. Check if backend is running: `node server.js`
2. Should see: "Server running on port 5000"
3. Verify MongoDB is connected: "MongoDB Connected"

### Issue 2: "Not authorized, token missing"
**Symptoms**:
- Console shows: `Token: Missing`
- Network response: 401 Unauthorized

**Causes**:
- Token not stored in localStorage
- Token expired
- Using wrong signup/login flow

**Solution**:
1. Clear localStorage: DevTools → Application → LocalStorage → Clear All
2. Go to `/login` page  (NOT the separate Login.jsx)
3. Click "Sign Up" tab
4. **IMPORTANT**: Select "Event Organizer" from role dropdown
5. Create account
6. Check localStorage for token

### Issue 3: "End date must be after start date"
**Symptoms**:
- Console shows validation error
- Event not created

**Causes**:
- End date is before or equal to start date
- DateTime format issue

**Solution**:
1. Pick a start date/time
2. Pick an end date/time that is AFTER the start date
3. Example: Start: Feb 15, 2024 at 10:00 AM → End: Feb 16, 2024 at 5:00 PM

### Issue 4: "Title and description are required"
**Symptoms**:
- Error shows required fields missing
- Event not created

**Causes**:
- Empty title or description field
- Form data not binding correctly

**Solution**:
1. Fill in "Event Title" (required)
2. Fill in "Event Description" (required)
3. Check form shows your text before submitting

### Issue 5: Event Created But Not Showing in List
**Symptoms**:
- Success message appears
- Console shows "Event created: {...}"
- But event not visible in Events list
- Stats remain 0

**Causes**:
- Events list not refreshing
- Response data format mismatch

**Solution**:
1. Check console for: `Events fetched: {data: [...]}`
2. Refresh page: F5 or Cmd+R
3. Go back to Dashboard and return to Events
4. Check MongoDB directly to confirm event exists

### Issue 6: Form Shows Success But Event Lost
**Symptoms**:
- Success message appears: "Event created successfully 🎉"
- Form clears
- But then shows error on next action

**Causes**:
- Event created but response format incorrect
- onEventCreated handler failed

**Solution**:
1. Check console for exact error message
2. Refresh page to reload events from server
3. The event should appear after refresh

## Step-by-Step Test Procedure

```
1. Start Backend:
   cd backend
   node server.js
   → Verify: "Server running on port 5000"
   → Verify: "MongoDB Connected"

2. Start Frontend:
   cd frontend
   npm run dev
   → Verify: Running on http://localhost:5173

3. Clear Storage:
   Open DevTools → Application → LocalStorage → Clear All

4. Sign Up as Organizer:
   → Go to /login (use the Auth page)
   → Click Sign Up
   → Fill form
   → Select "Event Organizer" from role dropdown
   → Click Create Account
   → Should redirect to /organizer

5. Verify localStorage:
   DevTools → Application → LocalStorage
   → Should have: token, role, userId, userName

6. Create Test Event:
   → Click "+ Add Event"
   → Title: "Test Event"
   → Description: "Testing event creation"
   → Type: Workshop
   → Mode: Hybrid
   → Dates: Set future dates
   → Click "Create Event"

7. Check Console:
   → Should see logs about creating event
   → Should see "Event created response: {...}"

8. Verify Event Created:
   → Check Events page (should show in list)
   → Check Network tab (POST /api/events should be 201)
   → Check MongoDB (collection should have event)
   → Check localStorage (no new data, but event in state)
```

## Debug Checklist

- [ ] Backend running on port 5000
- [ ] MongoDB connected
- [ ] Frontend running on localhost:5173
- [ ] Logged in as organizer
- [ ] localStorage has token, role, userId, userName
- [ ] Form fill - all required fields completed
- [ ] End date is after start date
- [ ] Browser console shows no JavaScript errors
- [ ] Network tab shows POST request to /api/events
- [ ] Network response status 201 (Created)
- [ ] Event appears in list after creation
- [ ] Event persists after page refresh

## Additional Resources

- MongoDB Atlas Cluster: https://cloud.mongodb.com
- Node.js Debugging: Run with `node --inspect server.js`
- Browser DevTools Shortcuts: F12 (Windows), Cmd+Option+I (Mac)

---

**Last Updated**: February 6, 2026
**Version**: 1.1
