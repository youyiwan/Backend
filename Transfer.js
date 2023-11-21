const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()


router.route('/')
    .get((req, res) => {
        console.log('GET: /TRANSFER_DETAILS');

        models.TRANSFER_DETAILS.findAll().then((transfers) => {

            res.send(transfers);
        })

    })
    .put((req, res) => {
        console.log('PUT: /TRANSFER_DETAILS');

        var TRANSFER_ID = req.body.TRANSFER_ID;
        var ACCOUNT_ID_FROM = req.body.ACCOUNT_ID_FROM;
        var ACCOUNT_ID_TO = req.body.ACCOUNT_ID_TO;
        var DATE = req.body.DATE;
        var AMOUNT = req.body.AMOUNT;

        models.TRANSFER_DETAILS.create({ TRANSFER_ID: TRANSFER_ID, ACCOUNT_ID_FROM: ACCOUNT_ID_FROM, ACCOUNT_ID_TO: ACCOUNT_ID_TO, DATE: DATE, AMOUNT: AMOUNT }).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .post((req, res) => {
        console.log('POST: /TRANSFER_DETAILS');

        var TRANSFER_ID = req.body.TRANSFER_ID;
        var ACCOUNT_ID_FROM = req.body.ACCOUNT_ID_FROM;
        var ACCOUNT_ID_TO = req.body.ACCOUNT_ID_TO;
        var DATE = req.body.DATE;
        var AMOUNT = req.body.AMOUNT;

        models.TRANSFER_DETAILS.findByPk(TRANSFER_ID).then((transfer) => {
            if (transfer === null) {
                res.sendStatus(404);
            }
            else {
                transfer.TRANSFER_ID = TRANSFER_ID;
                transfer.ACCOUNT_ID_FROM = ACCOUNT_ID_FROM;
                transfer.ACCOUNT_ID_TO = ACCOUNT_ID_TO;
                transfer.DATE = DATE;
                transfer.AMOUNT = AMOUNT;
                transfer.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => {
        console.log('DELETE: /TRANSFER_DETAILS?TRANSFER_ID=' + req.query.TRANSFER_ID);

        var TRANSFER_ID = req.query.TRANSFER_ID;

        models.TRANSFER_DETAILS.findByPk(TRANSFER_ID).then((transfer) => {
            if (transfer === null) {
                res.sendStatus(404);
            }
            else {
                transfer.destroy().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    });

module.exports = router