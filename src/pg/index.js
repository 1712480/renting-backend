const { Pool, Client } = require('pg');

const connectionString = 'postgresql://postgres:postgres@localhost:5432/renting';

module.exports = new Pool({
    connectionString: connectionString,
});