const express = require('express');
const app = express();

var cardsrouter = require("./routes/card");
var skillsrouter = require("./routes/skill");
var abilitysrouter = require("./routes/ability");

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
	console.log(`Serveur demarré sur http://${hostname}:${port}`);
});

app.use("/card", cardsrouter);
app.use("/skill", skillsrouter);
app.use("/ability", abilitysrouter);

module.exports = app;