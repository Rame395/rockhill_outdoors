require('@next/env').loadEnvConfig(process.cwd());
const mysql = require('mysql2/promise');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'rockhill',
  multipleStatements: true
};

async function runMigration() {
  const connection = await mysql.createConnection(dbConfig);
  try {
    console.log('Adding page_content column...');
    try {
      await connection.query('ALTER TABLE learning_categories ADD COLUMN page_content TEXT NULL AFTER description');
    } catch (e) {
      if (!e.message.includes('Duplicate column name')) throw e;
    }
    
    try {
      await connection.query('ALTER TABLE lifestyle_categories ADD COLUMN page_content TEXT NULL AFTER description');
    } catch (e) {
      if (!e.message.includes('Duplicate column name')) throw e;
    }

    console.log('Clearing old learning categories...');
    await connection.query('DELETE FROM learning_categories');

    console.log('Inserting new learning categories...');
    const ylpContent = `
## Youth Leadership Program

Our Youth Leadership Program is designed to empower the next generation of leaders. Through a series of carefully structured outdoor challenges and team-building exercises, participants discover their inner strengths and learn how to communicate effectively, take initiative, and inspire others.

### Key Focus Areas
- **Self-Discovery:** Finding your unique leadership style.
- **Team Dynamics:** Understanding how to collaborate and resolve conflicts.
- **Decision Making:** Making critical choices under pressure in real-world scenarios.

Join us to step out of your comfort zone and into your potential.
`;

    const osContent = `
## Outdoor Skills

Step into the wilderness with confidence. Our Outdoor Skills curriculum is rooted in a core philosophy: **Learn to live, move & adapt in the wild.**

Whether you are a beginner looking to understand the basics of setting up camp or an experienced adventurer seeking advanced survival techniques, our expert guides will teach you everything you need to know.

### What You Will Learn
- **Wilderness Living:** Shelter building, fire crafting, and outdoor cooking.
- **Navigation & Movement:** Map reading, compass use, and safe traversal across difficult terrains.
- **Adaptability:** Weather prediction, risk management, and emergency first aid.

Nature is unpredictable, but with the right skills, you can thrive anywhere.
`;

    await connection.query(`
      INSERT INTO learning_categories (slug, name, description, page_content, icon_name, sort_order) VALUES
      ('youth-leadership-program', 'Youth Leadership Program', 'Empowering the next generation through outdoor challenges and teamwork.', ?, 'Users', 0),
      ('outdoor-skills', 'Outdoor Skills', 'Learn to live, move & adapt in the wild.', ?, 'Tent', 1)
    `, [ylpContent, osContent]);

    console.log('Clearing old lifestyle categories (except sports and travel)...');
    await connection.query("DELETE FROM lifestyle_categories WHERE slug NOT IN ('sports', 'travel-with-us', 'travel')");

    // If 'travel' doesn't exist but 'travel-with-us' does, rename it to 'travel'
    await connection.query("UPDATE lifestyle_categories SET slug = 'travel', name = 'Travel' WHERE slug = 'travel-with-us'");

    // Ensure Travel has some default page content describing the itinerary feature
    const travelContent = `
## Our Upcoming Itineraries

Welcome to our travel journal! Here you will find our latest adventure itineraries, breathtaking destinations, and complete schedules.

*(Admin: You can add images and text here to build out your rich travel itineraries!)*
`;
    await connection.query("UPDATE lifestyle_categories SET page_content = ? WHERE slug = 'travel'", [travelContent]);

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

runMigration();
