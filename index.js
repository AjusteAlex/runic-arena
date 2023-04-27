const express = require('express');
const app = express();

var cardsrouter = require("./routes/card");

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
	console.log(`Serveur demarré sur http://${hostname}:${port}`);
});

app.use("/card", cardsrouter);

module.exports = app;