import { pool } from './database.js'

async function reset() {
  try {
    // 🧹 1️⃣ Delete all existing data first (if table exists)
    await pool.query(`DROP TABLE IF EXISTS cars;`)

    // 🧱 2️⃣ Recreate the table structure
    await pool.query(`
      CREATE TABLE cars (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        exterior TEXT NOT NULL,
        wheels TEXT NOT NULL,
        interior TEXT NOT NULL,
        price NUMERIC(10,2) NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `)

    // 🚗 3️⃣ Insert some seed data
    await pool.query(`
      INSERT INTO cars (name, exterior, wheels, interior, price)
      VALUES
        ('Demo Bolt', 'red', 'standard', 'fabric', 25000.00),
        ('Luxury Bolt', 'blue', 'sport', 'leather', 33000.00);
    `)

    console.log('✅ Database reset complete.')
  } catch (err) {
    console.error('❌ Reset error:', err)
  } finally {
    await pool.end()
  }
}

reset()
