const express = require('express')
const sqlite3 = require('sqlite3')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');

const models = require('./models');

const router = express.Router()


router.route('/')
    .get((req, res) => {
        console.log('GET: /PAYMENT_DETAILS');

        models.PAYMENT_DETAILS.findAll().then((transfers) => {

            res.send(transfers);
        })

    })
    .put((req, res) => {
        console.log('PUT: /PAYMENT_DETAILS');

        var PAYMENT_ID = req.body.PAYMENT_ID; // this
        var PAYER = req.body.PAYER; //this
        var RECEIVER = req.body.RECEIVER; //this
        var DATE = req.body.DATE;
        var AMOUNT = req.body.AMOUNT;

        //this
        models.PAYMENT_DETAILS.create({ PAYMENT_ID: PAYMENT_ID, PAYER: PAYER, RECEIVER: RECEIVER, DATE: DATE, AMOUNT: AMOUNT }).then(() => {
            res.sendStatus(200);
        }).catch(() => {
            res.sendStatus(400);
        })
    })
    .post((req, res) => {
        console.log('POST: /PAYMENT_DETAILS');

        var PAYMENT_ID = req.body.PAYMENT_ID; //this
        var PAYER = req.body.PAYER; //this
        var RECEIVER = req.body.RECEIVER; //this
        var DATE = req.body.DATE;
        var AMOUNT = req.body.AMOUNT;

        models.PAYMENT_DETAILS.findByPk(PAYMENT_ID).then((transfer) => {
            if (transfer === null) {
                res.sendStatus(404);
            }
            else {
                transfer.PAYMENT_ID = PAYMENT_ID;
                transfer.PAYER = PAYER;
                transfer.RECEIVER = RECEIVER;
                transfer.DATE = DATE;
                transfer.AMOUNT = AMOUNT;
                transfer.save().then(() => {
                    res.sendStatus(200);
                })
            }
        })
    })
    .delete((req, res) => {
        console.log('DELETE: /PAYMENT_DETAILS?PAYMENT_ID=' + req.query.PAYMENT_ID);

        var PAYMENT_ID = req.query.PAYMENT_ID;

        models.PAYMENT_DETAILS.findByPk(PAYMENT_ID).then((transfer) => {
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