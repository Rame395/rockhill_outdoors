require('@next/env').loadEnvConfig(process.cwd());
const pool = require('../lib/db').getPool();

async function addLinkedCategoryFields() {
  try {
    console.log('Adding linked_category_type to blogs...');
    await pool.query('ALTER TABLE blogs ADD COLUMN linked_category_type VARCHAR(50) DEFAULT NULL');
  } catch (error) {
    console.log('Might already exist:', error.message);
  }

  try {
    console.log('Adding linked_category_slug to blogs...');
    await pool.query('ALTER TABLE blogs ADD COLUMN linked_category_slug VARCHAR(255) DEFAULT NULL');
  } catch (error) {
    console.log('Might already exist:', error.message);
  }

  console.log('Done!');
  process.exit(0);
}

addLinkedCategoryFields();
