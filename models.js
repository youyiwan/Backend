const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    '', '', '',
    {
        dialect: 'sqlite',
        storage: './db/Bank.db',
        logging: false
    }
);

const CUSTOMER = sequelize.define('CUSTOMER', {

    CUSTOMER_ID: {
        type: DataTypes.CHAR(64) ,
        primaryKey: true,
        allowNull: false
    },
    FIRST_NAME: {
        type: DataTypes.CHAR(64) ,
        allowNull: false
    },
    LAST_NAME: {
        type: DataTypes.CHAR(64) ,
        allowNull: false
    },
    PRIMARY_ADDRESS: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    PRIMARY_CONTACT_NO: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    PRIMARY_EMAIL: {
        type: DataTypes.CHAR(64),
        allowNull: false
    }
}, {
    freezeTableName: true
});

const ACCOUNT = sequelize.define('ACCOUNT', {

    ACCOUNT_ID: {
        type: DataTypes.CHAR(64),
        primaryKey: true,
        allowNull: false
    },
    CUSTOMER_ID: {
        type: DataTypes.CHAR(64),
        primaryKey: true,
        allowNull: false
    },
    DEBIT: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    CREDIT: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    BALANCE: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
}, {
    freezeTableName: true
});

const TRANSFER_DETAILS = sequelize.define('TRANSFER_DETAILS', {

    TRANSFER_ID: {
        type: DataTypes.CHAR(64),
        primaryKey: true,
        allowNull: false
    },
    ACCOUNT_ID_FROM: {
        type: DataTypes.CHAR(64),
        primaryKey: true,
        allowNull: false
    },
    ACCOUNT_ID_TO: {
        type: DataTypes.CHAR(64),
        primaryKey: true,
        allowNull: false
    },
    DATE: {
        type: DataTypes.DATE,
        allowNull: false
    },
    AMOUNT: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

}, {
    freezeTableName: true
});

const PAYMENT_DETAILS = sequelize.define('PAYMENT_DETAILS', {

    PAYMENT_ID: {
        type: DataTypes.CHAR(64),
        primaryKey: true,
        allowNull: false
    },
    PAYER: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    RECEIVER: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    DATE: {
        type: DataTypes.DATE,
        allowNull: false
    },
    AMOUNT: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

}, {
    freezeTableName: true
});


ACCOUNT.hasMany(TRANSFER_DETAILS);       // 1 to M relationship
ACCOUNT.hasMany(PAYMENT_DETAILS)         // 1 to M relationship
CUSTOMER.belongsTo(ACCOUNT);             // 1 to 1 relationship


sequelize.sync();

module.exports = { sequelize, CUSTOMER, ACCOUNT, TRANSFER_DETAILS, PAYMENT_DETAILS };
