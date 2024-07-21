const express = require('express');
const sequelize = require('./config/connection');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 3001;
const model = require('./models');
const routes = require('./controllers');
const bcrypt = require('bcrypt');
//MiddleWare

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(routes);
app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } 
  }));
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}`);
    })
});
