// Puerto
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Caducidad del token
// 60s, 60m, 24h, 30d
process.env.CADUCIDAD_TOKEN = '48h';

// SEED
process.env.SEED = process.env.SEED || 'es-el-seed-de-desarrollo';

// Base de datos
let urlDB;

// Google Client ID
process.env.CLIENT_ID = process.env.CLIENT_ID || '407673827439-eqqvvsrl3kf6g83c2sgp5hspblummsbt.apps.googleusercontent.com';

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;