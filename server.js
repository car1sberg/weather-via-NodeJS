
const http = require('http');
const { config } = require('dotenv');
config();
const weather = require('./get-weather');
const PORT = process.env.PORT || 3000;


http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
}).listen(PORT, () => {
  console.log(`Listening port ${PORT}...`);
});