const express = require('express');
const app = express();
const loginRoute = require('./controller/loginRoute');
const port = 3000;

// middleware
app.use('/', loginRoute);

app.listen(port, () => {
    console.log('server is running..');
})