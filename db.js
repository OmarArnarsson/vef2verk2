const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;


async function insert(name, netfang, simi, texti, starf) {
  // Klára að gera fall sem að tekur inn allt frá apply.js og setur það í db.
  const client = new Client({
    connectionString,
  });
  await client.connect();
  try {
    const query = 'INSERT INTO applications (name, netfang, simi, texti, starf) VALUES ($1,$2,$3,$4,$5)';
    const res = await client.query(query, [name, netfang, simi, texti, starf]);
    console.info(res.rows);
  } catch (err) {
    console.error(err);
    // hér vantaði að kasta villu áfram sem var valdur að villu í lok sýnidæmis
    throw err;
  } finally {
    await client.end();
  }
}

async function select() {
  // Klára að gera fall sem að tekur inn allt frá apply.js og setur það í db.
  const client = new Client({
    connectionString,
  });
  await client.connect();
  try {
    const res = await client.query('SELECT * FROM applications ORDER BY id');
    return res;
  } catch (err) {
    console.error(err);
    // hér vantaði að kasta villu áfram sem var valdur að villu í lok sýnidæmis
    throw err;
  } finally {
    await client.end();
  }
}

async function eyda(id) {
  // Klára að gera fall sem að tekur inn allt frá apply.js og setur það í db.
  const client = new Client({
    connectionString,
  });
  await client.connect();
  try {
    const query = 'DELETE FROM applications WHERE id = $1';
    const res = await client.query(query, [id]);
    console.info(res.rows);
  } catch (err) {
    console.error(err);
    // hér vantaði að kasta villu áfram sem var valdur að villu í lok sýnidæmis
    throw err;
  } finally {
    await client.end();
  }
}

async function parse(id) {
  // Klára að gera fall sem að tekur inn allt frá apply.js og setur það í db.
  const client = new Client({
    connectionString,
  });
  await client.connect();
  try {
    const query = 'UPDATE applications SET processed = \'t\', updated = current_timestamp WHERE id = $1';
    const res = await client.query(query, [id]);
    console.info(res.rows);
  } catch (err) {
    console.error(err);
    // hér vantaði að kasta villu áfram sem var valdur að villu í lok sýnidæmis
    throw err;
  } finally {
    await client.end();
  }
}

module.exports = {
  insert,
  eyda,
  select,
  parse,
};
