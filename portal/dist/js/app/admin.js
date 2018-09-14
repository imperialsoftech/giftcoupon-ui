


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
