const mysql = require('mysql2/promise');

// Database configuration
// In production, use environment variables for these values
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rockhill',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
let pool = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// Initialize database and create tables if they don't exist
async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    multipleStatements: true
  });

  try {
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    await connection.query(`USE ${dbConfig.database}`);

    // Create announcements table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS announcements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        enabled BOOLEAN DEFAULT true,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create form_submissions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS form_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type ENUM('learning', 'lifestyle', 'partner') NOT NULL,
        name VARCHAR(255) NOT NULL,
        organization VARCHAR(255),
        phone VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_type (type),
        INDEX idx_status (status),
        INDEX idx_submitted_at (submitted_at)
      )
    `);

    // Create maps table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS maps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        latitude DECIMAL(10, 8) NOT NULL,
        longitude DECIMAL(11, 8) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_created_at (created_at)
      )
    `);

    // Create events table (for blog-like event posts)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        excerpt TEXT,
        content LONGTEXT,
        category VARCHAR(255),
        tags VARCHAR(255),
        featured_image VARCHAR(512),
        author_name VARCHAR(255),
        event_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_event_date (event_date),
        INDEX idx_created_at_events (created_at)
      )
    `);

    // Create event_enquiries table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS event_enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        event_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_event_id (event_id),
        INDEX idx_event_enquiries_created_at (created_at),
        CONSTRAINT fk_event_enquiries_event
          FOREIGN KEY (event_id) REFERENCES events(id)
          ON DELETE CASCADE
      )
    `);

    // Create blogs table (same structure as events)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        excerpt TEXT,
        content LONGTEXT,
        category VARCHAR(255),
        tags VARCHAR(255),
        featured_image VARCHAR(512),
        author_name VARCHAR(255),
        published_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_published_date (published_date),
        INDEX idx_blogs_created_at (created_at)
      )
    `);

    // Create users table (for reviews authentication)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      )
    `);

    // Create reviews table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NULL,
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        title VARCHAR(255),
        content TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_rating (rating),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at)
      )
    `);

    // Create contact_submissions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'new',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_submitted_at (submitted_at)
      )
    `);

    // Create gallery_images table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS gallery_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_filename VARCHAR(255) NOT NULL,
        file_path VARCHAR(512) NOT NULL,
        file_size INT,
        mime_type VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_created_at (created_at)
      )
    `);

    // Create hero_slides table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS hero_slides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        media_type ENUM('image', 'video') NOT NULL DEFAULT 'image',
        media_url VARCHAR(512) NOT NULL,
        title VARCHAR(255),
        subtitle TEXT,
        cta_text VARCHAR(100),
        cta_link VARCHAR(255),
        sort_order INT DEFAULT 0,
        enabled BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Insert default announcement if table is empty
    const [announcements] = await connection.query('SELECT COUNT(*) as count FROM announcements');
    if (announcements[0].count === 0) {
      await connection.query(`
        INSERT INTO announcements (enabled, text) 
        VALUES (true, 'Explore our upcoming outdoor programs and leadership camps with Rockhill Outdoors.')
      `);
    }

    // Create site_settings table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(100) NOT NULL UNIQUE,
        setting_value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Seed default site settings if missing
    await connection.query(`
      INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES
        ('contact_email', 'offic.roll@gmail.com'),
        ('contact_phone', '+977 970-4800736'),
        ('contact_address', 'Kathmandu, Nepal'),
        ('contact_hours', '5 AM to 8 PM throughout the week. Open to chat.')
    `);

    // Create office_locations table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS office_locations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        phone VARCHAR(100),
        sort_order INT DEFAULT 0,
        enabled BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Seed default location if table is empty
    const [locations] = await connection.query('SELECT COUNT(*) as count FROM office_locations');
    if (locations[0].count === 0) {
      await connection.query(`
        INSERT INTO office_locations (name, description, phone, sort_order, enabled)
        VALUES ('Dharan, Sunsari', 'Our main headquarters located in the heart of Dharan, with easy access to adventures.', '+977 9704800736', 0, true)
      `);
    }

    // Create learning_categories table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS learning_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        icon_name VARCHAR(100) NOT NULL,
        sort_order INT DEFAULT 0,
        enabled BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const [learningCats] = await connection.query('SELECT COUNT(*) as count FROM learning_categories');
    if (learningCats[0].count === 0) {
      await connection.query(`
        INSERT INTO learning_categories (slug, name, description, icon_name, sort_order) VALUES
        ('self-management', 'Self-management', 'Build resilience, emotional balance, and self-discipline for outdoor and everyday challenges.', 'Brain', 0),
        ('communication', 'Communication', 'Strengthen how you listen, speak, and collaborate in groups and in the outdoors.', 'MessageSquare', 1),
        ('leadership', 'Leadership', 'Develop the confidence to lead teams in nature and in life with clarity and empathy.', 'Compass', 2),
        ('management', 'Management', 'Learn to plan, organize, and manage people, time, and resources in real-world situations.', 'BarChart', 3),
        ('other-critical-skills', 'Other Critical Skills', 'Problem-solving, decision-making, and life skills that help you thrive in any environment.', 'Sparkles', 4)
      `);
    }

    // Create lifestyle_categories table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS lifestyle_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        icon_name VARCHAR(100) NOT NULL,
        sort_order INT DEFAULT 0,
        enabled BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const [lifestyleCats] = await connection.query('SELECT COUNT(*) as count FROM lifestyle_categories');
    if (lifestyleCats[0].count === 0) {
      await connection.query(`
        INSERT INTO lifestyle_categories (slug, name, description, icon_name, sort_order) VALUES
        ('hobbies', 'Hobbies', 'Discover fulfilling outdoor and creative hobbies that fit your lifestyle.', 'Palette', 0),
        ('sports', 'Sports', 'Stay active through team and individual sports rooted in the outdoors.', 'Dribbble', 1),
        ('xtreme-sports', 'Xtreme Sports', 'High-adrenaline activities for those who love to push their limits safely.', 'Mountain', 2),
        ('travel-with-us', 'Travel With Us', 'Join curated journeys and immersive travel experiences around the world.', 'Plane', 3),
        ('challenges', 'Challenges', 'Structured challenges that stretch your comfort zone and grow your character.', 'Trophy', 4)
      `);
    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

// Note: In production, run initializeDatabase() separately or use migrations
// For development, you can call initializeDatabase() manually or set up a script

module.exports = {
  getPool,
  initializeDatabase
};
