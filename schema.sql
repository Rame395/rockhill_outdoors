-- Rockhill Outdoors Database Schema
-- MySQL Database Setup Script

-- Create database (uncomment if needed)
-- CREATE DATABASE IF NOT EXISTS rockhill;
-- USE rockhill;

-- ============================================
-- Announcements Table
-- ============================================
-- Stores the site announcement bar content
CREATE TABLE IF NOT EXISTS announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  enabled BOOLEAN DEFAULT true,
  text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Form Submissions Table
-- ============================================
-- Stores all form submissions (learning, lifestyle, partner)
CREATE TABLE IF NOT EXISTS form_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('learning', 'lifestyle', 'partner') NOT NULL,
  name VARCHAR(255) NOT NULL,
  organization VARCHAR(255) DEFAULT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_submitted_at (submitted_at),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Initial Data
-- ============================================
-- Insert default announcement if table is empty
INSERT INTO announcements (enabled, text) 
SELECT true, 'Explore our upcoming outdoor programs and leadership camps with Rockhill Outdoors.'
WHERE NOT EXISTS (SELECT 1 FROM announcements);

-- ============================================
-- Notes
-- ============================================
-- 1. The announcements table stores the site-wide announcement bar content
-- 2. The form_submissions table stores all form submissions with:
--    - type: 'learning', 'lifestyle', or 'partner'
--    - organization: Only populated for 'partner' type submissions
--    - status: Can be 'new', 'reviewed', 'contacted', etc.
-- 3. Indexes are created for common query patterns (type, status, submitted_at, email)
-- 4. All timestamps are automatically managed by MySQL
