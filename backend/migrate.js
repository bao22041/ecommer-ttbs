const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Cấu hình kết nối MySQL
const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: '22042004', 
  multipleStatements: true
};

async function runMigration() {
  try {
    const conn = await mysql.createConnection(connectionConfig);

    // Đọc file init.sql
    const initSql = fs.readFileSync(path.join(__dirname, '../sql/init.sql'), 'utf8');
    await conn.query(initSql);
    console.log('✅ init.sql executed successfully');

    // Đọc file seed.sql
    const seedSql = fs.readFileSync(path.join(__dirname, '../sql/seed.sql'), 'utf8');
    await conn.query(seedSql);
    console.log('✅ seed.sql executed successfully');

    await conn.end();
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
  }
}

runMigration();
