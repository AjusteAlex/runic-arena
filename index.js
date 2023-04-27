const express = require('express');
const app = express();

var cardsrouter = require("./routes/card");
var skillsrouter = require("./routes/skill");
var abilitysrouter = require("./routes/ability");
var colorsrouter = require("./routes/color");

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
	console.log(`Serveur demarré sur http://${hostname}:${port}`);
});

app.use("/card", cardsrouter);
app.use("/skill", skillsrouter);
app.use("/ability", abilitysrouter);
app.use("/color", colorsrouter);

module.exports = app;