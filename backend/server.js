require('dotenv/config');
const http = require('http');
const app = require('./app');
const db = require('./src/config/firebase');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to start server on port ${PORT}: ${err.message}`);
    process.exit(1);
  }

  console.log(`Server running on port ${PORT}`);

  http.get(`http://localhost:${PORT}/api/health`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(`Health check: ${data}`));
  }).on('error', () => console.log('Health check: failed'));

  if (db) {
    db.listCollections()
      .then(() => console.log('Firestore connection: ok'))
      .catch((err) => console.log(`Firestore connection: failed - ${err.message}`));
  } else {
    console.log('Firestore connection: skipped (no credentials)');
  }
});

server.on('error', (err) => {
  console.error(`Server error: ${err.message}`);
  process.exit(1);
});
