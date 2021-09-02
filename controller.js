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

exports.tambahMahasiswa = (req, res) => { 
    var nim = req.body.nim
    var nama = req.body.nama
    var jurusan = req.body.jurusan

    connection.query("INSERT INTO mahasiswa (nim,nama,jurusan) VALUES (?,?,?)", [nim, nama, jurusan], function(err, rows, field) {
        if(err) {
            connection.log(err)
        } else {
            response.ok('Berhasil menambah data mahasiswa', res)
        }
    })
}

exports.updateMahasiswa = (req, res) => {
    var id = req.params.id
    var nim = req.body.nim
    var nama = req.body.nama
    var jurusan = req.body.jurusan

    connection.query("UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ? WHERE id = ? ", [nim, nama, jurusan, id], (err, rows, field) => {
        if(err) {
            connection.log(err)
        } else {
            response.ok('Berhasil mengubah data mahasiswa', res)
        }
    })
}

exports.hapusMahasiswa = (req, res) => {
    var id = req.params.id

    connection.query("DELETE FROM mahasiswa WHERE id = ?", id, (err, rows, field) => {
        if(err) {
            connection.log(err)
         } else {
            response.ok('Berhasil menghapus data mahasiswa', res)
         }
    })
}