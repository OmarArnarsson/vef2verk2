const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString,
});

async function insert(name, netfang, simi, texti, starf) {
  // Klára að gera fall sem að tekur inn allt frá apply.js og setur það í db.
  client.connect();
  try {
    const query = 'INSERT INTO applications (name, netfang, simi, texti, starf) VALUES ($1,$2,$3,$4,$5)';
    const res = await client.query(query, [name, netfang, simi, texti, starf]);
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
