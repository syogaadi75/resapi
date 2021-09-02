'use strict';

exports.ok = function (val, res) {
    var data = {
        status: 300,
        value: val
    };

    res.json(data);
    res.end();
};