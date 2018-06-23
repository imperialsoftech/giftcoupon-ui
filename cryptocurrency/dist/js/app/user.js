var minContribution = false;
var currentExchangeRate = false;
var tokenExchangeRate = false;
var couponAllowance = false;

// var tokenDistributorInstance = contract;
// var tokenBaseInstance = token;

$("#inpMinContribution").on("keyup", function () {
    var tokenValue = currentExchangeRate * $(this).val();
    $("#spProbableToken").html(tokenValue + " BLV");
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
            $("#currentOKTExchangeRate").html("<b>1 Ether</b> = <b>"+result+" BLV</b>");
            tokenExchangeRate = result;
        }
    });


    setTimeout(function()
    {
      getCouponAllowance(token,coinbase,icoAddress.giftCouponContract, function(result){
          if(result != false)
          {
            $("#couponAllowance").html("<b> Token : "+result+" BLV</b>");
          }
      });
    },2000);
    


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

function approveTokenUse()
{
    approveTokenAllowance($("#approveToken").val());
}

function approveTokenAllowance(tokenValue){

    if(tokenPurchasePaused )
    {
        sweetAlert("Error", "Tokens cannot be Approved at the moment", "error");
        return;
    }

    tokenValue =  tokenValue || 1 ;
    tokenValue = tokenValue * tokenExchangeRate;

    approveStatus = token.methods.approve(icoAddress.giftCouponContract,tokenValue)
    .send({from:coinbase,to:icoAddress.giftCouponContract})
    .on('transactionHash',function(hash)
    {
          handleTransactionResponse(hash);
    })
    .on('receipt',function(receipt)
    {
      receiptMessage = "Token Transferred Successfully";
      handleTransactionReceipt(receipt,receiptMessage)
    })
    .on('error',function(error)
    {
      handleGenericError(error.message);
          return;   
    })      
   
}



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

function getCouponAllowance(contractRef,currentUser,spender, callback) {

    callback = callback || false;

    contractRef.methods.allowance(currentUser,spender)
    .call()
    .then((result)=>{
        couponAllowance = result.toString();
        // console.log(result);
        callback(couponAllowance);
    })
    .catch((error)=>{
        couponAllowance = false;
        // sweetAlert("Error","Error Getting Exchange Rate","error");
    });

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


/*--------------Admin Functionality-----------------------------*/


$(window).on("tokenTransferPaused",function(data)
{
    if(data.tokenPurchasePausedStatus)
    {
        $("#butTokenBtn").hide();
        $("#btnTransferPurchase").show();
    }
});


$(window).on("tokenPurchasePaused",function(data)
{
    if(data.tokenPurchasePausedStatus)
    {
        $("#btnBuyToken").hide();
        $("#btnPausedPurchase").show();
    }
});

$(window).on("tokenCreationCap",function(data){
  if(data.tokenCreationCapData){
    $("#tokenCreationCap").html(toEther(data.tokenCreationCapData.toString()));
  }
});

$(window).on("totalSupply",function(data){
  if(data.totalSupplyData){
    $("#totalSupply").html(toEther(data.totalSupplyData.toString()));
  }
});

$(window).on("fundStartDateTime",function(data){
  if(data.fundStartDateTimeData){
    $("#fundStartDateTime").html(toDate(data.fundStartDateTimeData.toString()));
  }
});

$(window).on("fundEndDateTime",function(data){
  if(data.fundEndDateTimeData){
    $("#fundEndDateTime").html(toDate(data.fundEndDateTimeData.toString()));
  }
});


function changeSwitchery(element, checked) {
  if ( ( element.is(':checked') && checked == false ) || ( !element.is(':checked') && checked == true ) ) {
    element.parent().find('.switchery').trigger('click');
  }
}

$("input.pausedToken").on("change" , function() {
    var methodName;
    var pauseType = $(this).data('type');

    if($(this).prop('checked')==true){
        methodName = 'PAUSE';
    }else{
        methodName = 'UNPAUSE';
    }   

    swal({
          title: "Are you sure?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, do it!",
          closeOnConfirm: false
        },
        function(isConfirm)
        {
          if(isConfirm==true)
          { 
            if(methodName == 'PAUSE'){
                /* If token pause method is buy then call to contract orther wise it will call to token*/
                if(pauseType == 'pausedTokenBuy'){
                    pausedContract(contract);
                }else if(pauseType == 'pausedTokenSend'){
                    pausedContract(token);
                }   
            }else if(methodName == 'UNPAUSE'){
                /* If token pause method is buy then call to contract orther wise it will call to token*/
                if(pauseType == 'pausedTokenBuy'){
                    unPausedContract(contract);
                }else if(pauseType == 'pausedTokenSend'){
                    unPausedContract(token);
                }   
            }   
            delete methodName;
          }
          else{
            window.location.reload();
          }
        });
});

/*
* Paused contract
*/
function pausedContract(contractRef){

  contractRef.methods.pause()
  .send({from:coinbase,to:contractRef.address})
  .on('transactionHash',function(hash)
  {
      handleTransactionResponse(hash);
  })
  .on('receipt',function(receipt)
  {
      receiptMessage = "Contract successfully paused";
      handleTransactionReceipt(receipt,receiptMessage)
  })
  .on('error',function(error)
  {
      handleGenericError(error.message);
      return;   
  });

}

/*
* UnPaused contract
*/
function unPausedContract(contractRef){

  contractRef.methods.unpause()
  .send({from:coinbase,to:contractRef.address})
  .on('transactionHash',function(hash)
  {
      handleTransactionResponse(hash);
  })
  .on('receipt',function(receipt)
  {
      receiptMessage = "Contract successfully un-paused";
      handleTransactionReceipt(receipt,receiptMessage)
  })
  .on('error',function(error)
  {
      handleGenericError(error.message);
      return;   
  });

}






