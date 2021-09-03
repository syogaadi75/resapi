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

    var query = "SELECT email FROM ?? WHERE ??=?"
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
                response.ok('Email sudah terdaftar',res)
            }
        }
    })
}

exports.login = (req, res) => {
    var post = {
        email: req.body.email,
        password: md5(req.body.password),
    }

    var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ?"
    var table = ['user','email',post.email, 'password' , post.password]
    query = mysql.format(query, table)

    connection.query(query, (err, rows) => {
        if(err) {
            console.log(err)
        } else {
            if(rows.length == 1) {
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 1440
                })

                var id_user = rows[0].id

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = 'INSERT INTO ?? SET ?'
                var table = ['access_token']
                query = mysql.format(query, table)

                connection.query(query, data, (err, rows) => {
                    if(err) {
                        console.log(err)
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate',
                            token: token,
                            currUser: data.id_user
                        })
                    }
                })
            } else {
                res.json({
                    "Error": true,
                    "Message": "Email atau password salah"
                })
            }
        }
    })
}

exports.halamanRahasia = (req, res) => {
    response.ok('Halaman ini hanya untuk user dengan role 1',res)
}