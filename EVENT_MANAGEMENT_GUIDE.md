# Event Management System - Organizer Guide

## Overview
Organizers can now create, manage, and track events through the UCEF platform. The system supports multiple event types including hackathons, workshops, seminars, and more.

## Features

### 1. **Create Events**
Organizers can add new events with the following details:
- **Event Title** - Name of the event
- **Event Description** - Detailed information about the event
- **Event Type** - Workshop, Hackathon, Seminar, Cultural, Club, Competition
- **Mode** - Online, Offline, or Hybrid
- **Start & End Date** - Schedule with date and time
- **Team Event** - Enable/disable team participation
- **Max Team Size** - Maximum members per team (if team event enabled)
- **Attendance Method** - QR Code, Manual, OTP, Auto, or None

### 2. **Event Dashboard**
The Events page displays:
- **Statistics Cards** showing Total Events, Active Events, and Total Participants
- **Create Event Button** to add new events
- **Event Filters** to view events by status - Created, Live, Completed, Archived

### 3. **Event Status Management**
Events progress through states:
- **CREATED** → Event is drafting (can be published)
- **LIVE** → Event is active and receiving registrations (can be completed)
- **COMPLETED** → Event has ended (can be archived)
- **ARCHIVED** → Event is in history (final state)

### 4. **Event Card Actions**
Each event card shows:
- Event title, description, and status badge
- Event type, mode, and date/time
- Team size info (if applicable)
- Action buttons:
  - **Publish** - Move from CREATED to LIVE
  - **Complete** - Move from LIVE to COMPLETED
  - **Archive** - Move from COMPLETED to ARCHIVED
  - **Edit** - Modify event details (coming soon)

## How to Use

### Creating an Event
1. Navigate to **Organizer Dashboard > Events**
2. Click **+ Add Event** button
3. Fill in the event form:
   - Enter event title and description
   - Select event type and mode
   - Set start and end dates
   - Configure team settings if needed
   - Choose attendance tracking method
4. Click **Create Event**
5. Event is created in CREATED state (not visible to students yet)

### Publishing an Event
1. Find the event in CREATED state
2. Click **Publish** button
3. Event moves to LIVE state and becomes visible to students
4. Students can now register for the event

### Completing an Event
1. Once the event ends, find it in LIVE state
2. Click **Complete** button
3. Event moves to COMPLETED state
4. Event no longer accepts new registrations

### Archiving an Event
1. Find the event in COMPLETED state
2. Click **Archive** button
3. Event is moved to archive for historical records

## API Endpoints

### Create Event
```
POST /api/events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Codigo Hackathon 2024",
  "description": "24-hour hackathon for innovative ideas",
  "eventType": "hackathon",
  "mode": "HYBRID",
  "startDate": "2024-02-15T09:00:00",
  "endDate": "2024-02-16T17:00:00",
  "isTeamEvent": true,
  "maxTeamSize": 4,
  "attendanceMethod": "QR"
}
```

### Get All Organizer's Events
```
GET /api/events
Authorization: Bearer {token}
```

### Get Single Event
```
GET /api/events/{eventId}
Authorization: Bearer {token}
```

### Publish Event
```
POST /api/events/{eventId}/publish
Authorization: Bearer {token}
```

### Complete Event
```
POST /api/events/{eventId}/complete
Authorization: Bearer {token}
```

### Archive Event
```
POST /api/events/{eventId}/archive
Authorization: Bearer {token}
```

## Requirements
- **User Role**: Must be "organizer" or "admin"
- **Authentication**: Valid JWT token required
- **MongoDB**: Event data is stored in MongoDB

## States Flow Diagram
```
CREATED → PUBLISH → LIVE → COMPLETE → COMPLETED → ARCHIVE → ARCHIVED
```

## Notes
- Only organizers and admins can create and manage events
- Events must have a valid end date after start date
- Team events require a max team size >= 2
- Only CREATED events can be published
- Only LIVE events can be completed
- Only COMPLETED events can be archived
- Edit functionality can be enabled in future versions

## Support
For issues or questions, contact the development team.
