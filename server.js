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

const sendEmail = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
        return { success: true, messageId: info.messageId};
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
};

transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ejacosta86',
      pass: 'dihz wxso pbrk zxlh'
    }
  });

app.post("/send-email", async (req, res) => {
    const { subject, text, html, recipients } = req.body;

    const mailOptions = {
      from: '"Mood-Sync" <ejacosta86@gmail.com>', // sender address
      to: recipients || "manuelpena0207@gmail.com, aalborgil002@gmail.com, gabrielsalazar225@gmail.com", // list of receivers
      subject: subject || "Mood-Sync", // Subject line
      text: text || "Hello from Mood-Sync", // plain text body
      html: html || "<b>Things to help sync your mood!</b>",// html bod 
    };

   
    const result = await sendEmail(mailOptions);
    res.json(result);
 
});



// Sync Sequelize and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
    });
});