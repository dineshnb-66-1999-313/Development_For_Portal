const express = require('express');
const app = express();
const routesUrls = require('./routes/routes');
const cors = require('cors');

app.use(express.json()) // body parsor
app.use(cors())
app.use('/app', routesUrls) // appending to the base path
app.listen(4000, () => console.log("server is up and running at 4000"));