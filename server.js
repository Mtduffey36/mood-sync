// Server things
const express = require('express');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');

//Calling the models
const model = require('./models/');

//Calling the routes
const routes = require('./controllers');

//MiddleWare session
app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } 
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Using routes
app.use(routes);

sequelize.sync({force: true}).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server Running on port ${PORT}`);
    })
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'Handlebars');
