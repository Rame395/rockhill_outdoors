// Database initialization script
// Run this once to set up the database: node scripts/init-db.js

require('@next/env').loadEnvConfig(process.cwd());

const { initializeDatabase } = require('../lib/db');

async function main() {
  try {
    console.log('Initializing database...');
    await initializeDatabase();
    console.log('Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

main();
