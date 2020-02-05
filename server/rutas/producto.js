const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

const _ = require('underscore');

let app = express();

let Producto = require('../modelos/producto');

// OBTENER TODOS LOS PRODUCTOS
app.get('/productos', verificaToken, (req, res) => {
    // traer todos los productos
    // populate con usuario y categoria
    // paginado
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let paginacion = 5;

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(paginacion)
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productosDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                productosDB
            });

        });
});

// OBTENER PRODUCTO POR ID
app.get('/productos/:id', verificaToken, (req, res) => {
    // populate con usuario y categoria
    let id = req.params.id;

    Producto.findById(id)
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, productoDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Id no encontrado"
                    }
                });
            }

            return res.json({
                ok: true,
                producto: productoDB
            });
        });
});

// Buscar productos
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');


    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            });
        });

});

// CREAR NUEVO PRODUCTO
app.post('/productos', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar categoria del listado
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });

});

// ACTUALIZAR UN PRODUCTO
app.put('/productos/:id', verificaToken, (req, res) => {
    // grabar el usuario
    // grabar categoria del listado

    let id = req.params.id;
    //let body = _.pick(req.body, [nombre, precioUni, descripcion, disponible]);
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.nombre = body.nombre
        productoDB.precioUni = body.precioUni
        productoDB.descripcion = body.descripcion
        productoDB.disponible = body.disponible
        productoDB.categoria = body.categoria

        productoDB.save((err, productoGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoGuardado
            });
        });

    });
});

// BORRAR UN PRODUCTO
app.delete('/productos/:id', verificaToken, (req, res) => {
    // disponible = false
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto borrado'
            });
        });


    });
});

module.exports = app;