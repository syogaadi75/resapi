'use strict';

module.exports = function (app) {
    var jsonku = require('./controller')

    app.route('/').get(jsonku.index)
    app.route('/mahasiswa').get(jsonku.tampilsemuamahasiswa)
    app.route('/mahasiswa/:id').get(jsonku.tampilberdasarkanid)
    app.route('/mahasiswa').post(jsonku.tambahMahasiswa)
    app.route('/mahasiswa/:id').put(jsonku.updateMahasiswa)
    app.route('/mahasiswa/:id').delete(jsonku.hapusMahasiswa)
    app.route('/mahasiswaMatakuliah').get(jsonku.mahasiswaMatakuliah)
    
}