'use strict';

exports.ok = function (val, res) {
    var data = {
        status: 300,
        value: val
    };

    res.json(data);
    res.end();
};

exports.okNested = (values,res) => {
    const hasil = values.reduce((akumulasikan, item) => {
        if(akumulasikan[item.nama]) {
            const group = akumulasikan[item.nama]
            if(Array.isArray(group.matakuliah)) {
                group.matakuliah.push(item.matakuliah)
            } else  {
                group.matakuliah = [group.matakuliah, item.matakuliah]
            }
        } else {
            akumulasikan[item.nama] = item
        }
        return akumulasikan
    }, {})

    var data = {
        status: 300,
        value: hasil
    };

    res.json(data)
    res.end()

}