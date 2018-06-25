	var coinbase, 
		icoContract, 
		icoToken, 
		contract, 
		token, 
		tokenBalance,
		tokenPurchasePaused,
		tokenTransferPaused;

	var icoAddress = {
		'tokenContract': "0x6b1d60ea08927c6d7c24c6f7d4fd8ba45fbe0c0b",
		'mainContract': "0xb58c47b9df3ba775f9c8e221f0f3d84185e05462",		
		'giftCouponContract' : '0x5b4cd3b2988ba3560b888ef72239cadd6a37a147'
	};


	$("#butTokenBtn").on('click',function(){
		var beneficiaryAddress = $("#beneficaryAddress").val();
		var sendToken = $("#sendToken").val();
		
		/*
		* Check beneficary address field error conditions
		*/
		if(beneficiaryAddress == "" || beneficiaryAddress == undefined || beneficiaryAddress == null){
			$("#beneficaryAddress").focus();
			sweetAlert('Error','Beneficary Address can not be null!','error');
		}else if(beneficiaryAddress.length != 42){
			$("#beneficaryAddress").focus();
			sweetAlert('Error','Not Valid Beneficary Address','error');
		}else if(beneficiaryAddress == coinbase){
			$("#beneficaryAddress").focus();
			sweetAlert('Error','Beneficary Address should not be equal to Own loged In Wallet Account Address!','error');
		}
		else if(sendToken == '' || sendToken == null || sendToken == undefined){
			$("#tokenBalance").focus();
			sweetAlert('Error','OKT field can not be null!','error');
		}
		else if(sendToken <= 0 || sendToken <= '0'){
			$("#tokenBalance").focus();
			sweetAlert('Error','OKT can be non zero positive number!','error');
		}
		else if(isNaN(sendToken) == true){
			$("#tokenBalance").focus();
			sweetAlert('Error','Please enter only number!','error');	
		}
		else if(sendToken > tokenBalance){
			$("#tokenBalance").focus();
			sweetAlert('Error','OKT enter value can not be more than Total Avaiable Balance!','error');
		}else{
			sendTokenToBeneficary(token,coinbase,beneficiaryAddress,sendToken);
		}


	});


	function handleGenericError(error_message)
	{
	    if(error_message.includes("MetaMask Tx Signature"))
	    {
	        sweetAlert("Error", "Transaction Refused ", "error");
	    }
	    else
	    {
	        // sweetAlert("Error", "Error Occured, Please Try Again , if problem persist get in touch with us. ", "error");
	        sweetAlert("Error", error_message, "error");
	    }
	}

	function handleTransactionReceipt(receipt,finalMessage)
	{
		$("#linkOngoingTransaction").html("");
        $("#divOngoingTransaction").fadeOut();

        // sweetAlert("Success", "Token Purchase Complete ", "success");
        sweetAlert("Success", finalMessage, "success");
	}

	function handleTransactionResponse(txHash,finalMessage)
	{
		var txLink = "https://rinkeby.etherscan.io/tx/" + txHash ;
	    var txLinkHref = "<a target='_blank' href='"+txLink+"'> Click here for Transaction Status </a>" ;

	    sweetAlert("Success", "Please Check Transaction Status here :  "+txLinkHref, "success");

	    $("#linkOngoingTransaction").html(txLinkHref);
	    $("#divOngoingTransaction").fadeIn();
	}
	/*
	* Send Token to Beneficary Account
	*/
	function sendTokenToBeneficary(tokenContractRef,coinbase,address,value)
	{
		if(tokenTransferPaused )
	    {
	        sweetAlert("Error", "Tokens cannot be Transferred at the moment", "error");
	        return;
	    }

		tokenContractRef.methods.transfer(address,toWei(value))
		.send({from:coinbase,to:tokenContractRef.address})
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
	
	window.addEventListener('load', function() {    
		/*
		* Initialize Provider
		*/
		if (typeof web3 !== 'undefined') {
		  web3 = new Web3(web3.currentProvider);
		} else {
		  // set the provider you want from Web3.providers
		  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
		}

		getCurrentAccountAddress((address)=>{
			/*  To Restrict User in Admin Section */
			var currentPath = window.location.pathname;
			var tmpStack = currentPath.split("/");
			var currentPanel = tmpStack.pop();

			if(currentPanel == "admin.php")
			{
				if(address != 0xab0874cB61D83F6B67Dc08141568868102233bef){
					window.location = "index.php";
				}
			}
		});



				
		/* Check if on Rinkeby Network  */
		

		/*
		* Check User Account Status
		*/

		initContract();

		getPauseStatus(contract,function(status)
		{
			if(status==false)
			{
				$("#pausedTokenBuy").prop('checked',false);
			}
			else
			{
				$("#pausedTokenBuy").prop('checked',true);
			}

			if($("#pausedTokenBuy").length > 0)
			{
				new Switchery($("#pausedTokenBuy")[0], $("#pausedTokenSend").data());	
			}
		});

		getPauseStatus(token,function(status)
		{
			if(status==false){
				$("#pausedTokenSend").prop('checked',false);
			}
			else
			{
				$("#pausedTokenSend").prop('checked',true);
			}

			if($("#pausedTokenSend").length > 0)
			{
				new Switchery($("#pausedTokenSend")[0], $("#pausedTokenSend").data());	
			}
		});

		setInterval(function(){
			validateNetwork();
			updateAccountLoginStatus();	

			/*
			* Check Contract Pause status
			*/
			getPauseStatus(contract,function(status)
			{
				tokenPurchasePaused = status;
				$(window).trigger({type:"tokenPurchasePaused",tokenPurchasePausedStatus:tokenPurchasePaused});
			});

			/*
			* Check Token Pause status
			*/
			getPauseStatus(token,function(status){
				tokenTransferPaused = status;
	 			$(window).trigger({type:"tokenTransferPaused",tokenPurchasePausedStatus:tokenTransferPaused});
			});

			/*
			* get Token Creation Cap
			*/
			getTokenCreationCap(contract,function(data){
				tokenCreationCap = data;
	 			$(window).trigger({type:"tokenCreationCap",tokenCreationCapData:tokenCreationCap});
			});

			/*
			* get Total Supply
			*/
			getTotalSupply(contract,function(data){
				totalSupply = data;
	 			$(window).trigger({type:"totalSupply",totalSupplyData:totalSupply});
			});

			/*
			* get Fund Start Date
			*/
			getFundStartDateTime(contract,function(data){
				fundStartDateTime = data;
	 			$(window).trigger({type:"fundStartDateTime",fundStartDateTimeData:fundStartDateTime});
			});

			/*
			* get Fund End Date
			*/
			getFundEndDateTime(contract,function(data){
				fundEndDateTime = data;
	 			$(window).trigger({type:"fundEndDateTime",fundEndDateTimeData:fundEndDateTime});
			});
		},500);			

		getAllEvents(token);
	});


	function validateNetwork()
	{
		web3.eth.net.getId(function (error, networkId) {
			if (networkId != 4) {
				sweetAlert("Error","Please Switch to Rinkeby Network","error");
			}
		});
	}

	function initContract()
	{
		/*
		 * Initialize contract with web3
		 */
		contract = new web3.eth.Contract(icoContractAbi,icoAddress.mainContract);
		token = new web3.eth.Contract(icoTokenAbi,icoAddress.tokenContract);
		giftCoupon = new web3.eth.Contract(giftCouponAbi,icoAddress.giftCouponContract);

		/*
		 * Call contract with Contract Address and Token Address
		 */
		// contract = icoContract.at(icoAddress.mainContract);
		// token = icoToken.at(icoAddress.tokenContract);

		$(window).trigger("contractReady");

		

		contract.events.allEvents((error,data) => {
			////console.log(error);
			//console.log(data);
		})
		

		
	}

	function updateAccountLoginStatus(){
		web3.eth.getAccounts(function(err, accounts)
		{
		    if (err){
				console.error("An error occurred: " + err);
			} 
		    else if (accounts.length == 0){
		     	// sweetAlert('Error', 'Please login to MetaMask..!', 'error');
		     	window.location = 'index.php';
		     	// $("#currentUserAddress").html('').html("0x0000000000000000000000000000000000000000");
			}
			else{
		    	initAccountDetails();
		    }	
		});
	}

	function initAccountDetails(){
		/*
		* Get Current wallet account address
		*/
		getCurrentAccountAddress((address)=>{
			coinbase = address;	
			$("#currentUserAddress").html(coinbase);
		});
	
		/*
		* Get Current wallet account Ether Balance
		*/

		getAccountBalance(coinbase,function(balance)
		{
			$("#accountBalance").html(toEther(balance) + ' ETH');
		});

		/*
		* Check active account - OKT token balance
		*/

		getTokenBalance(token,coinbase,function(balance){
			$("#tokenBalance").html(toEther(balance) + ' OKT');
		});

	}


	function getTokenBalance(tokenContractRef,coinbase,callback) {
		
		coinbase = coinbase || false;
		callback = callback || false;

		if(!coinbase) 
		{
			callback(0);
			return;
		}

		tokenContractRef.methods.balanceOf(coinbase).call()
		.then((balance) => {
			callback(balance);
		})
		.catch((error) => {
			// sweetAlert("Error","Unable to Get Token Balance at the moment for : " + coinbase,"error");
			callback(0);
		});
	}


	function getAccountBalance(coinbase,callback)
	{	
		coinbase = coinbase || false;
		callback = callback || false;

		if(!coinbase) 
		{
			callback(0);
			return;
		}

		web3.eth.getBalance(coinbase)
		.then((balance) => {
			callback(balance);
		})
		.catch((err) => {
			// sweetAlert("Error","Unable to Get User Balance at the moment for : " + coinbase,"error");
			if(callback)
			{
				callback(0);
			}
		});
	}

	function getPauseStatus(contractRef,callback){
		callback = callback || false;

		contractRef.methods.paused().call()
		.then((status) => {
			callback(status);
		})
		.catch((err) => {
			// sweetAlert("Error","Unable to get Contract Pause Status");
			if(callback)
			{
				callback(0);
			}
		});
	} 

	function getCurrentAccountAddress(callback){
		callback = callback || false;

		web3.eth.getCoinbase()
		.then((_coinbase) => {
			callback(_coinbase);
		})
		.catch((err)=>{
			// sweetAlert("Error","Unable to get Current Account Address");
			if(callback)
			{
				callback(0);
			}
		});
	}

	function getTokenCreationCap(contractRef,callback){
		callback = callback || false;

		contractRef.methods.tokenCreationCap().call()
		.then((result)=>{
			callback(result);
		})
		.catch((err)=>{
			// sweetAlert("Error","Unabale to get Token Creation Cap","error");

			if(callback){
				callback(0);
			}
		});
	}

	function getTotalSupply(contractRef,callback){
		callback = callback || false;

		contractRef.methods.totalSupply().call()
		.then((result)=>{
			callback(result);
		})
		.catch((err)=>{
			// sweetAlert("Error","Unabale to get Total Supply","error");

			if(callback){
				callback(0);
			}
		});
	}

	function getFundStartDateTime(contractRef,callback){
		callback = callback || false;

		contractRef.methods.fundingStartTime().call()
		.then((result)=>{
			callback(result);
		})
		.catch((err)=>{
			// sweetAlert("Error","Unabale to get Fund Start Date","error");

			if(callback){
				callback(0);
			}
		});
	}

	function getFundEndDateTime(contractRef,callback){
		callback = callback || false;

		contractRef.methods.fundingEndTime().call()
		.then((result)=>{
			callback(result);
		})
		.catch((err)=>{
			// sweetAlert("Error","Unabale to get Fund End Date","error");

			if(callback){
				callback(0);
			}
		});
	}

	function toEther(_val) {
		_val = String(_val);

		return web3.utils.fromWei(_val, "ether");
	}

	function toWei(_val) {

		_val = String(_val);
		return web3.utils.toWei(_val, "ether");
	}


	function toDate(_timestamp) {

		var currentDate = new Date(_timestamp * 1000);
		var formattedDate = currentDate.toLocaleString(undefined, {
														day: 'numeric',
														month: 'numeric',
														year: 'numeric'
													});

		return formattedDate;
	}

	function getAllEvents(tokenRef)
	{
	    tokenRef.getPastEvents('Transfer',{
	        fromBlock:0,
	        filter: {to: coinbase}        
	    }).then(function (events){
	        //console.log(events);
	        
	        $("#transactions tbody").html(buildTransactionData(events));
	        $("#transactions").DataTable();
	    });
	}

	function buildTransactionData(transactionDetails)
	{

	    var tbody = "";
	    var baseUrl = "https://rinkeby.etherscan.io/tx/";

	    $.each(transactionDetails,function(index, obj){
	        tbody += `
	                    <tr>
	                        <td>
	                            <div class="d-flex no-block">
	                                <div class="text-ellipsis">
	                                    <a href="`+baseUrl+obj.transactionHash+`" target="_blank">`+obj.transactionHash+`</a>
	                                </div>
	                            </div>
	                            <div class="d-flex no-block">
	                                <div class="d-flex no-block">
	                                    <div class="gen-content font-medium">From : </div>
	                                    <div class="text-ellipsis" >`+ obj.returnValues.from+`</div>
	                                </div>&nbsp;
	                                <div class="d-flex no-block">
	                                    <div class="gen-content font-medium">To : </div>
	                                    <div class="text-ellipsis">`+ obj.returnValues.to +` </div>
	                                </div>
	                            </div>
	                        </td>
	                        <td class=" hidden-xs">
	                            <div class="text-success">`+ web3.utils.fromWei( obj.returnValues.value , "ether") +` </div>
	                        </td>
	                        <td class="hidden-xs">
	                            <div>`+ obj.blockNumber +` </div>
	                        </td>                        
	                    </tr>
	        `
	    });

	    return tbody;
	}
