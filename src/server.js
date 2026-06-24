require('dotenv').config();
const express = require('express');
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const userRouters = require('./routers/userAPI');
const classRouters = require('./routers/classAPI');
const scoreRouters = require('./routers/scoreAPI')
const connection = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// configure the view engine
configViewEngine(app);

// khai báo các route
app.use('/user', userRouters);

app.use('/class', classRouters);

app.use('/score', scoreRouters)

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`);
});