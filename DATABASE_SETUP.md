# Database Setup Guide

This project uses MySQL to store announcements and form submissions dynamically.

## Prerequisites

- MySQL server installed and running
- Node.js and npm installed

## Setup Steps

1. **Create a MySQL database** (or use an existing one):
   ```sql
   CREATE DATABASE rockhill;
   ```

2. **Configure database connection**:
   Create a `.env` file in the root directory with your database credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=rockhill
   ```

3. **Initialize the database schema**:
   Run the initialization script to create the necessary tables:
   ```bash
   npm run init-db
   ```

   This will create:
   - `announcements` table - stores the site announcement bar content
   - `form_submissions` table - stores all form submissions (learning, lifestyle, partner)

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Database Schema

### announcements
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `enabled` (BOOLEAN) - Whether the announcement is visible
- `text` (TEXT) - The announcement message
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### form_submissions
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `type` (ENUM: 'learning', 'lifestyle', 'partner') - Type of form submission
- `name` (VARCHAR(255)) - Submitter's name
- `organization` (VARCHAR(255), nullable) - Organization (for partner submissions)
- `phone` (VARCHAR(50)) - Phone number
- `email` (VARCHAR(255)) - Email address
- `message` (TEXT) - Message content
- `status` (VARCHAR(50)) - Status (default: 'new')
- `submitted_at` (TIMESTAMP) - Submission timestamp

## Admin Access

Access the admin dashboard at `/admin` to:
- Manage announcements
- View and delete form submissions
- Filter submissions by type and status

Default password: `admin123` (change this in production!)

## Environment Variables

All database configuration is done through environment variables:
- `DB_HOST` - MySQL host (default: localhost)
- `DB_USER` - MySQL username (default: root)
- `DB_PASSWORD` - MySQL password (default: empty)
- `DB_NAME` - Database name (default: rockhill)

## Notes

- The database connection uses a connection pool for better performance
- All form submissions are automatically stored in the database
- Announcements are stored in the database and displayed dynamically
- The admin dashboard allows you to manage all content without code changes
