'use strict';

var response = require('./res');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Aplikasi REST API ku berjalan!", res);
};

exports.tampilsemuamahasiswa = (req, res) => {
    connection.query("SELECT * FROM mahasiswa", (err, rows, field) => {
        if(err) {
            connection.log(err)
        } else {
            response.ok(rows, res)
        }
    })
}

exports.tampilberdasarkanid = (req, res) => {
    var id = req.params.id
    connection.query("SELECT * FROM mahasiswa WHERE id = ?", id , (err, rows, field) => {
        if(err) {
            connection.log(err)
        } else {
            response.ok(rows, res)
        }
    })
}