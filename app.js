const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000 || process.env.PORT;


app.get('/', (req, res) => {
  res.send('hi it works');
});

app.listen(port, () => console.log(`Running on port ${port}`));