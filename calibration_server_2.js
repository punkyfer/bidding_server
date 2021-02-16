// Constants
const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/bid', (req, res) => {
	if (req.query.position<=10000 && req.query.publisherid<=10000) {
		res.status(200).json({"price":0});
	} else {
		res.status(204).send();
	}
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
