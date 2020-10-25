require('./config/config');
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// habilitar la carpeta public
app.use(express.static('public'));
app.use(require('./routes/usuario'));


async function startbd() {
    try {
        console.log('Initializing database module');
        await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
    } catch (err) {
        console.error(err);

        process.exit(1); // Non-zero failure code
    }
}
startbd();



app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});