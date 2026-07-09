require('dotenv/config');
const http = require('http');
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  http.get(`http://localhost:${PORT}/health`, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(`Health check: ${data}`));
  }).on('error', () => console.log('Health check: failed'));
});
