const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
// const nodemailer = require('./js/email');
const sequelize = require('./config/connection');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;
// Set up Handlebars
const hbs = exphbs.create({
    partialsDir: path.join(__dirname, 'views/partials'),
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
    store: new SequelizeStore({
        db: sequelize
      })
}));

// Routes
const routes = require('./controllers');
app.use(routes);

//Declaring the root route as a /login
app.get('/', (req, res)=>{
    res.redirect('/login');
})

const nodemailer = require ('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ejacosta86',
      pass: 'dihz wxso pbrk zxlh'
    }
  });

app.post("/send-email", async (req, res) => {

    const mailOptions = {
      from: '"Mood-Sync" <ejacosta86@gmail.com>', // sender address
      to: "manuelpena0207@gmail.com, aalborgil002@gmail.com, gabrielsalazar225@gmail.com", // list of receivers
      subject: "Mood-Sync", // Subject line
      text: "Hello from Mood-Sync", // plain text body
      html: "<b>Things to help sync your mood!</b>", // html bod 
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log("sent email", info)
        res.json({success : true})
    } catch (error) {
        console.log(error)
    }
})

app.get("/test-email", async (req, res) => {

    const mailOptions = {
      from: '"Mood-Sync" <ejacosta86@gmail.com>', // sender address
      to: "manuelpena0207@gmail.com, aalborgil002@gmail.com, gabrielsalazar225@gmail.com", // list of receivers
      subject: "Mood-Sync", // Subject line
      text: "Hello from Mood-Sync", // plain text body
      html: "<b>Things to help sync your mood!</b>", // html bod 
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log( "data", info)
        console.log(info.messageId)
        res.json({success : true})
    } catch (error) {
        console.log(error)
        res.json({ success: false, error: error.message})
    }
})

// Sync Sequelize and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
    });
});