const models = require('./models');

async function loadData() {
    models.CUSTOMER.findByPk('C001').then((customer) => {
        if (customer === null) {
            Promise.all([
                models.CUSTOMER.create({CUSTOMER_ID: 'C001', FIRST_NAME: 'DAVID', LAST_NAME: 'BECKHAM', PRIMARY_ADDRESS: '1 OLD TRAFFORD', PRIMARY_CONTACT_NO: 90123111, PRIMARY_EMAIL: 'becks@gmail.com'}),
                models.CUSTOMER.create({CUSTOMER_ID: 'C002', FIRST_NAME: 'JURGEN', LAST_NAME: 'KLOPP', PRIMARY_ADDRESS: '3 ANFIELD STREET', PRIMARY_CONTACT_NO: 90123444, PRIMARY_EMAIL: 'jklopp@gmail.com'}),
                models.CUSTOMER.create({CUSTOMER_ID: 'C003', FIRST_NAME: 'DARWIN', LAST_NAME: 'NUNEZ', PRIMARY_ADDRESS: '2 ANFIELD ROAD', PRIMARY_CONTACT_NO: 90123333, PRIMARY_EMAIL: 'dnunez@gmail.com'}),
                models.CUSTOMER.create({CUSTOMER_ID: 'C004', FIRST_NAME: 'MO', LAST_NAME: 'SALAH', PRIMARY_ADDRESS: '1 ANFIELD ROAD', PRIMARY_CONTACT_NO: 94628070, PRIMARY_EMAIL: 'msalah@gmail.com'}),
                models.CUSTOMER.create({CUSTOMER_ID: 'C005', FIRST_NAME: 'BOBBY', LAST_NAME: 'FIRMINO', PRIMARY_ADDRESS: '2 ANFIELD STREET', PRIMARY_CONTACT_NO: 97773777, PRIMARY_EMAIL: 'bobbyfirmino@gmail.com'}),
            ]).then((customerArray) => {
                Promise.all([
                    models.ACCOUNT.create({ ACCOUNT_ID: 'A001', CUSTOMER_ID: customerArray[0].CUSTOMER_ID, BALANCE: 500.00}),
                    models.ACCOUNT.create({ ACCOUNT_ID: 'A002', CUSTOMER_ID: customerArray[0].CUSTOMER_ID, BALANCE: 1300.00}),
                    models.ACCOUNT.create({ ACCOUNT_ID: 'A003', CUSTOMER_ID: customerArray[1].CUSTOMER_ID, BALANCE: 100.00}),
                    models.ACCOUNT.create({ ACCOUNT_ID: 'A004', CUSTOMER_ID: customerArray[2].CUSTOMER_ID, BALANCE: 300.00}),
                    models.ACCOUNT.create({ ACCOUNT_ID: 'A005', CUSTOMER_ID: customerArray[3].CUSTOMER_ID, BALANCE: 300.00}),
                    models.ACCOUNT.create({ ACCOUNT_ID: 'A006', CUSTOMER_ID: customerArray[4].CUSTOMER_ID, BALANCE: 0}),
                ]).then((accountArray) => {
                    Promise.all([
                        models.TRANSFER_DETAILS.create({ TRANSFER_ID: 'T001', ACCOUNT_ID_FROM: accountArray[0].ACCOUNT_ID, ACCOUNT_ID_TO: accountArray[1].ACCOUNT_ID, DATE: new Date(), AMOUNT: 200.00}),
                        models.TRANSFER_DETAILS.create({ TRANSFER_ID: 'T002', ACCOUNT_ID_FROM: accountArray[1].ACCOUNT_ID, ACCOUNT_ID_TO: accountArray[2].ACCOUNT_ID, DATE: new Date(), AMOUNT: 400.00 }),
                        models.TRANSFER_DETAILS.create({ TRANSFER_ID: 'T003', ACCOUNT_ID_FROM: accountArray[2].ACCOUNT_ID, ACCOUNT_ID_TO: accountArray[3].ACCOUNT_ID, DATE: new Date(), AMOUNT: 500.00 }),
                        models.TRANSFER_DETAILS.create({ TRANSFER_ID: 'T004', ACCOUNT_ID_FROM: accountArray[3].ACCOUNT_ID, ACCOUNT_ID_TO: accountArray[1].ACCOUNT_ID, DATE: new Date(), AMOUNT: 100.00 }),
                        models.TRANSFER_DETAILS.create({ TRANSFER_ID: 'T005', ACCOUNT_ID_FROM: accountArray[4].ACCOUNT_ID, ACCOUNT_ID_TO: accountArray[0].ACCOUNT_ID, DATE: new Date(), AMOUNT: 300.00 }),
                    ]).then(() => {
                        Promise.all([
                            models.PAYMENT_DETAILS.create({ PAYMENT_ID: 'P001', PAYER: 'A001', RECEIVER: 'A006', DATE: new Date(), AMOUNT: 500.00 }),
                            models.PAYMENT_DETAILS.create({ PAYMENT_ID: 'P002', PAYER: 'A002', RECEIVER: 'A006', DATE: new Date(), AMOUNT: 250.00 }),
                        ])
                    }); 
                });
            });
        }
    });
}

models.sequelize.sync().then(() => {
    console.log('models loaded');

    loadData().then(() => {
        console.log('test data loaded...');
    });
});