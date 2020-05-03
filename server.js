const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
require('dotenv').config();

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req,res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, () => console.log(`nico's book world is listening at http://localhost:${port}`));
