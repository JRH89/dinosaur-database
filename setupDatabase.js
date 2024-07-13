const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');

const db = new sqlite3.Database('./dinosaurs.db');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS dinosaur_facts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      diet TEXT,
      type TEXT,
      length_m REAL,
      min_ma REAL,
      max_ma REAL,
      region TEXT,
      lat REAL,
      lng REAL,
      class TEXT,
      family TEXT
    )
  `);

    const stmt = db.prepare(`
    INSERT INTO dinosaur_facts (name, diet, type, length_m, min_ma, max_ma, region, lat, lng, class, family)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

    fs.createReadStream('dinosaurs.csv')
        .pipe(csv())
        .on('data', (row) => {
            stmt.run([
                row.name,
                row.diet,
                row.type,
                row.length_m,
                row.min_ma,
                row.max_ma,
                row.region,
                row.lat,
                row.lng,
                row.class,
                row.family,
            ]);
        })
        .on('end', () => {
            stmt.finalize();
            db.close();
            console.log('CSV file successfully processed and database setup complete.');
        });
});
