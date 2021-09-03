var connection = require('../koneksi')
var response = require('../res')
var mysql = require('mysql')
var md5 = require('md5')
var jwt = require('jsonwebtoken')
var config = require('../config/secret')
var ip = require('ip')

exports.registrasi = (req, res) => {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role, 
        tgl_daftar: new Date(), 
    }

    var query = "SELECT email FROM ?? WHERE ?? "
    var table = ['user', 'email', post.email]
    query = mysql.format(query, table)
    
    connection.query(query, (err, rows, field) => {
        if(err) {
            console.log(err)
        } else {
            if(rows.length == 0) {
                var queryInsert = "INSERT INTO ?? SET ?"
                var tableInsert = ['user']
                queryInsert = mysql.format(queryInsert, tableInsert)
                connection.query(queryInsert, post, (err, rows) => {
                    if(err) {
                        console.log(err)
                    } else {
                        response.ok('Berhasil menambahkan data user', res)
                    }
                })

            } else {
                response.ok('Email sudah terdaftar')
            }
        }
    })
}
