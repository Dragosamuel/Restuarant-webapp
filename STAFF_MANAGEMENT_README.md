# Staff & Shift Management System

This document explains how to use the Staff & Shift Management system that has been added to the admin dashboard.

## Features

1. **Staff Management**
   - Add, edit, and delete staff members
   - Track staff details (name, email, phone, position, department)
   - Manage staff status (active, on-leave, terminated)

2. **Shift Scheduling**
   - Create and assign shifts to staff members
   - Track shift details (date, start time, end time, shift type)
   - Manage shift status (scheduled, in-progress, completed, cancelled)

3. **Performance Tracking**
   - Monitor attendance rates
   - Track punctuality metrics
   - Overall performance ratings

## Accessing the System

1. Log in to the admin dashboard at `/admin`
2. Click on the "Staff Management" card
3. Use the tabs to navigate between different functions:
   - **Staff List**: View all staff members
   - **Add Staff**: Add new staff members
   - **Shifts**: Manage shifts
   - **Performance**: Track performance metrics

## API Endpoints

All endpoints require admin authentication with a valid JWT token.

### Staff Endpoints
- `GET /api/staff` - Get all staff members
- `GET /api/staff/:id` - Get a specific staff member
- `POST /api/staff` - Create a new staff member
- `PUT /api/staff/:id` - Update a staff member
- `DELETE /api/staff/:id` - Delete a staff member

### Shift Endpoints
- `POST /api/staff/:id/shifts` - Add a shift to a staff member
- `PUT /api/staff/:id/shifts/:shiftId` - Update a shift status

### Performance Endpoints
- `PUT /api/staff/:id/performance` - Update performance metrics

## Seeding Sample Data

To seed the database with sample staff data, run:

```bash
npm run seed-staff
```

## Testing

To test the staff API endpoints, run:

```bash
npm run test-api
```