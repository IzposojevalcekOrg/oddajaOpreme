
var leasing = require('../models/leasingModel.js');
const request = require("request");
const promise = require("request-promise");


let checkTenant = function (req, res, next) {
    let id = req.body.providerId;
    getServiceUrl("tenants", "dev", "v1", function (err, _url) {
        if (err) {
            return res.status(503).json(err);
        }

        let url = `http://${_url}`;

        request(url+"/" + id, function (error, response, body) {
            if (error) return res.status(500).send("Internal server error. Code: 374");
            if (response.statusCode == 200) return next();
            return res.status(400).send("Tenant doesn't exist");
        });
    });
};


let checkEquipment = function (req, res, next) {
    let id = req.body.item;
    getServiceUrl("equipment", "dev", "v1", function (err, _url) {
        if (err) {
            return res.status(503).json(err);
        }

        let url = `http://${_url}`;

        request(url+"/" + id, function (error, response, body) {
            console.log("Reponse: ", response);
            if (error) return res.status(500).send("Internal server error. Code: 375");
            if (response.statusCode == 200) return next();
            return res.status(400).send("Equipment doesn't exist: " +  id);
        });
    });
};

module.exports = {


    list: function (req, res) {
        leasing.find(function (err, leases) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting leases.',
                    error: err
                });
            }
            return res.json(leases);
        });
    },

    show: function (req, res) {
        var id = req.params.id;
        leasing.findOne({_id: id}, function (err, lease) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting lease.',
                    error: err
                });
            }
            if (!lease) {
                return res.status(404).json({
                    message: 'No such lease'
                });
            }
            return res.json(lease);
        });
    },

    create: function (req, res) {
        var lease = new leasing(req.body);

        lease.save(function (err, lease) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating lease',
                    error: err
                });
            }
            return res.status(201).json(lease);
        });
    },

    borrow: function (req, res) {
        var id = req.params.id;
        leasing.findOne({_id: id}, function (err, lease) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting lease',
                    error: err
                });
            }
            if (!lease) {
                return res.status(404).json({
                    message: 'No such lease'
                });
            }
            let date = new Date();
            date.setDate(date.getDate() + 14);

            lease.borrowerId = req.body.borrowerId ? req.body.borrowerId : lease.borrowerId;
            lease.expiry = date;

            lease.save(function (err, lease) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating lease.',
                        error: err
                    });
                }

                return res.json(lease);
            });
        });
    },

    return: function (req, res) {
        var id = req.params.id;
        leasing.findOne({_id: id}, function (err, lease) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting lease',
                    error: err
                });
            }
            if (!lease) {
                return res.status(404).json({
                    message: 'No such lease'
                });
            }

            lease.borrowerId = undefined;
            lease.expiry = undefined;

            lease.save(function (err, lease) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating lease.',
                        error: err
                    });
                }

                return res.json(lease);
            });
        });
    },

    remove: function (req, res) {
        var id = req.params.id;
        leasing.findByIdAndRemove(id, function (err, tenant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the tenant.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },
    checkEquipment: checkEquipment,
    checkTenant: checkTenant,
};

