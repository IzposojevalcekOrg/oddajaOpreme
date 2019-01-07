const dummy = require('mongoose-dummy');
const leasingModel = require('./leasingModel');
const ignoredFields = ["_id"];


const generate = function (n) {
    for (var i = 0; i < n; i++) {
        console.log("generating dummy");
        var dummyTenant = new leasingModel(dummy(leasingModel, {
            ignore: ignoredFields,
            returnDate: true
        }));

        dummyTenant.save();
    }
}

module.exports = generate;