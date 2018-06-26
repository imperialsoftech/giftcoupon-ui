var minContribution = false;
var currentExchangeRate = false;
var tokenExchangeRate = false;
var couponAllowance = false;
var tokenAddress = false;

$("#inpMinContribution").on("keyup", function () {
    var tokenValue = currentExchangeRate * $(this).val();
    $("#spProbableToken").html(tokenValue + " BLV");
});

$(window).on("contractReady", function () {
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
            $("#couponAllowance").html("<b> Token : "+toEther(result)+" BLV</b>");
          }
      });
    },2000);

    setTimeout(function(){
        setTokenAddress();
       showGiftCouponDetails();
    },1000); 
   
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

function setTokenAddress()
{
    tokenAddress = icoAddress.tokenContract;
    $("#currentTokenAddress").html(tokenAddress);
}

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
    tokenValue = toWei(tokenValue);

    approveStatus = token.methods.approve(icoAddress.giftCouponContract,tokenValue)
    .send({from:coinbase,to:icoAddress.giftCouponContract})
    .on('transactionHash',function(hash)
    {
          handleTransactionResponse(hash);
    })
    .on('receipt',function(receipt)
    {
      receiptMessage = "Token Approved Successfully";
      handleTransactionReceipt(receipt,receiptMessage)
    })
    .on('error',function(error)
    {
      handleGenericError(error.message);
          return;   
    })      
}

function generateGiftCoupon()
{
   tmpDate = $("#coupon_expiry").val().trim().split("-");
   tmpDate = tmpDate[0]+"/"+tmpDate[1]+"/"+tmpDate[2];    

   cost = $("#coupon_cost").val();   
   expiry = new Date(tmpDate) / 1000;
   title = $("#coupon_title").val();
   quantity =  $("#coupon_quantity").val();
   
   createGiftCoupon(giftCoupon, cost, expiry, title, quantity);
}

function createGiftCoupon(ContractRef, cost, expiry, title, quantity ){

  ContractRef.methods.createGiftCoupon(cost, expiry, title, quantity)
  .send({from:coinbase,to:icoAddress.giftCouponContract})
  .on('transactionHash',function(hash)
  {
      handleTransactionResponse(hash);
  })
  .on('receipt',function(receipt)
  {
      receiptMessage = "Gift Coupons Created Successfully";
      handleTransactionReceipt(receipt,receiptMessage)
  })
  .on('error',function(error)
  {
      handleGenericError(error.message);
      return;   
  }) 
}

function redeemCoupon()
{
    code = $("#coupon_code").val();  
    redeemCouponCode(giftCoupon, code);
}

function redeemCouponCode(ContractRef, couponCode)
{
    ContractRef.methods.redeemCoupon(couponCode)
    .send({from:coinbase,to:icoAddress.giftCouponContract})
    .on('transactionHash',function(hash)
    {
        handleTransactionResponse(hash);
    })
    .on('receipt',function(receipt)
    {
        receiptMessage = "Coupon Code Redeemed Successfully";
        handleTransactionReceipt(receipt,receiptMessage)
    })
    .on('error',function(error)
    {
        handleGenericError(error.message);
        return;   
    }) 
}

function getGiftCouponCodesList(ContractRef, callback)
{
    ContractRef.methods.getGiftCouponCodes().call({from:coinbase})
    .then((codeList) => {      
      callback(codeList);
    })
    .catch((error) => {      
      callback(0);
    });
} 

function getGiftCouponList(ContractRef,callback){  

  getGiftCouponCodesList(giftCoupon, function(code){
    for(i = 0 ; i < code.length ; i++)
    {    
      ContractRef.methods.getGiftCouponDetails(code[i]).call({from:coinbase})
      .then((codeList) => {      
        callback(codeList);
      })
      .catch((error) => {      
        callback(0);
      });
    }
  });
}

function showGiftCouponDetails()
{

  j = 1;
  getGiftCouponList(giftCoupon, function(CouponDetail){    

    dateString = new Date(CouponDetail.validity * 1000 ).toLocaleString();
    dateString = dateString.substring(0,dateString.indexOf(':')-4);  

    if(CouponDetail.redeemedBy == "0x0000000000000000000000000000000000000000"){
      redeemedAddress = `<span class="label label-danger">Not Redeemed</span>`;
    }
    else
    {
      redeemedUrl = "https://rinkeby.etherscan.io/address/"+CouponDetail.redeemedBy;

      redeemedAddress = `<a href="`+redeemedUrl+`">`+ 
                        CouponDetail.redeemedBy +
                        `</a>`;
    }

    creatorUrl = "https://rinkeby.etherscan.io/address/"+CouponDetail.creator;

  //  titleString = (CouponDetail.title).slice(1, -1);

     var addRow = $('#myTable').DataTable();

        addRow.row.add($(
            '<tr>' +
            '<td>'+j+'</td>' +
            '<td>'+(CouponDetail.title).slice(1, -1)+'</td>' +
            '<td>'+CouponDetail.code+'</td>' +
            '<td>'+toEther(CouponDetail.cost)+'</td>' +
            '<td>'+dateString+'</td>' +
            '<td><a href='+creatorUrl+'>'+CouponDetail.creator+'</a></td>'+
            '<td class="text-center">'+redeemedAddress+'</td>' +
            '</tr>'
        )).draw(false);

        j++;
  });
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
    });
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






