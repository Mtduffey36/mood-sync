const express = require('express');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
const model = require('./models');
// app.listen(PORT, () => {
//   console.log('server started!');
// });

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}`);
    })
});
