require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//Rutas
app.use(require('./rutas/index'));

//Conexion a mongoose
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;

    console.log('Conectado a base de datos');
});

app.listen(process.env.PORT, () => console.log('Escuchando el puerto ', process.env.PORT));