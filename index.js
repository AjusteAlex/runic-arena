const express = require('express');
const app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
	console.log(`Serveur demarré sur http://${hostname}:${port}`);
});
app.get('/', (req, res) => {
	res.send('Hello World!');
  });