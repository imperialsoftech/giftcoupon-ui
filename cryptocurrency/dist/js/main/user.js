var minContribution = false;
var currentExchangeRate = false;

// var tokenDistributorInstance = contract;
// var tokenBaseInstance = token;

$("#inpMinContribution").on("keyup", function () {
    var tokenValue = currentExchangeRate * $(this).val();
    $("#spProbableToken").html(tokenValue + " OKT");
});


$(window).on("contractReady", function ()
{

    getMinContribution(contract,function(data)
    {
       $("#spMinContribution").html(toEther(data));

       $("#inpMinContribution").attr("min", toEther(data));
       $("#inpMinContribution").val(toEther(data));

       /*  Slight Timeout is required for value */
       setTimeout(() => {
          $("#inpMinContribution").trigger("keyup");
       }, 100);
       
    });

    getCurrentExchangeRate(contract, function(result){
        if(result != false){
            $("#currentOKTExchangeRate").html("<b>1 Ether</b> = <b>"+result+" OKT</b>");
        }
    });

});


$(window).on("tokenPurchasePaused",function(data)
{
    if(data.tokenPurchasePausedStatus)
    {
        $("#btnBuyToken").hide();
        $("#btnPausedPurchase").show();

    }
});

$(window).on("tokenTransferPaused",function(data)
{
    if(data.tokenPurchasePausedStatus)
    {
        $("#butTokenBtn").hide();
        $("#btnTransferPurchase").show();

    }
});



function buyTokenForEther()
{
    initTokenPurchase($("#inpMinContribution").val());
}

function initTokenPurchase(tokenValue)
{
    if(tokenPurchasePaused )
    {
        sweetAlert("Error", "Tokens cannot be Purchase at the moment", "error");
        return;
    }

    tokenValue = tokenValue || 0.1 ;

    tokenValueWei = toWei(tokenValue);

    // coinbase = coinbase.substr(0, coinbase.length - 1 )
    // 
    transObj = {};
    transObj.from = coinbase;
    transObj.to = icoAddress.mainContract;
    transObj.value = tokenValueWei;

    try
    {
        web3.eth.sendTransaction(transObj)
        .on('transactionHash',function(hash)
        {
            handleTransactionResponse(hash);
        })
        .on('receipt',function(receipt)
        {
            receiptMessage = "Token Purchase Complete";
            handleTransactionReceipt(receipt,receiptMessage)
        })
        .on('error',function(error)
        {
            handleGenericError(error.message);
            return;     
        })
    }
    catch(e)
    {
        // sweetAlert("Error", e.toString(), "error");
    }    
}


function getMinContribution(contractRef,callback)
{
    contractRef.methods.minContribution().call()
    .then((result)=>{
         minContribution = result.toString();
         callback(minContribution);
    })
    .catch((error)=>{
        minContribution = false;
        // sweetAlert("Error","Error Getting Minimum Contribution","error");
    });

/*    contractRef.methods.minContribution().call(function (error, result) {
        if(error){
            minContribution = false;
            sweetAlert("Error","Error Getting Minimum Contribution","error");
        }

        minContribution = (result.toString());

        if (callback)
        {
            callback(minContribution);
        }
        
    });*/

}

function getCurrentExchangeRate(contractRef, callback) {

    callback = callback || false;

    contractRef.methods.tokenExchangeRate().call()
    .then((result)=>{
        currentExchangeRate = result.toString();
        callback(currentExchangeRate);
    })
    .catch((error)=>{
        currentExchangeRate = false;
        // sweetAlert("Error","Error Getting Exchange Rate","error");
    });

}





