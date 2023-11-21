var editMode = 'create';

var TRANSFER_DETAILS;

// May retrieve transfer history

function renderTransferTable()
{
    const req = new XMLHttpRequest();
    req.addEventListener('load', (event) => {
        
        TRANSFER_DETAILS = JSON.parse(event.target.responseText);
        
        var table = document.getElementById('TransferTable');
        table.tBodies[0].remove();
        tBody = table.createTBody();
    
        for(var transfer of TRANSFER_DETAILS)
        {
            var row = tBody.insertRow(-1);

            row.insertCell(0).innerHTML = transfer.TRANSFER_ID;
            row.insertCell(1).innerHTML = transfer.DATE;
            row.insertCell(2).innerHTML = transfer.AMOUNT;
            row.insertCell(3).innerHTML = transfer.ACCOUNT_ID_FROM;
            row.insertCell(4).innerHTML = transfer.ACCOUNT_ID_TO;
        }

    });

    req.open('GET', 'http://localhost:3001/Transfer');
    req.send();    
}


// Can create new Transfer

function createTransfer()
{
    console.log('createTransfer: ');

    var TRANSFER_ID = document.getElementById('Bid').value;
    var ACCOUNT_ID_FROM = document.getElementById('Bcountry').value;
    var ACCOUNT_ID_TO = document.getElementById('Bprice').value;
    var DATE = document.getElementById('Bname').value;
    var AMOUNT = document.getElementById('Bpd').value;

    var Transfer = {'TRANSFER_ID':TRANSFER_ID, 'ACCOUNT_ID_FROM':ACCOUNT_ID_FROM, 'ACCOUNT_ID_TO':ACCOUNT_ID_TO, 'DATE':DATE, 'AMOUNT':AMOUNT};

    const req = new XMLHttpRequest();
    req.addEventListener('load', renderTransferTable);

    if(editMode == 'create')
    {                    
        req.open("PUT", 'http://localhost:3001/Transfer');        
    }
    else if(editMode == 'update')
    {
        req.open("POST", 'http://localhost:3001/Transfer');        
    }
    
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(Transfer));

    editMode = 'create';
    
    return false;
}



//// Transfer do not need the rest //////////////





