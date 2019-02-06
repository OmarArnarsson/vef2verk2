const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString,
});

async function insert(name) {
  // Klára að gera fall sem að tekur inn allt frá apply.js og setur það í db.
  client.connect();
  try {
    const query = 'INSERT INTO students (name) VALUES ($1)';
    const res = await client.query(query, [name]);
    console.info(res.rows);
  } catch (err) {
    console.error(err);
    // hér vantaði að kasta villu áfram sem var valdur að villu í lok sýnidæmis
    throw err;
  }
}

module.exports = {
  insert,
};
