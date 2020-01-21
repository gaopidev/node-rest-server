// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    //urlDB = 'mongodb://gaopidev:aKfLhbLFSYqGavIf@cafe-vfd7c.mongodb.net/test';
    urlDB = 'mongodb+srv://gaopidev:aKfLhbLFSYqGavIf@cafe-vfd7c.mongodb.net/test?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;