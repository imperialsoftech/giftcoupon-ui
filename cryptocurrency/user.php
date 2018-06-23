<?php include('template/_header.php');?>
<?php
$tokenSymbol = "BLV";
?>

        <div class="page-wrapper">
            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== -->
            <div class="container-fluid">
                <!-- ============================================================== -->
                <!-- Bread crumb and right sidebar toggle -->
                <!-- ============================================================== -->
                <div class="row page-titles">
                    <div class="col-md-5 align-self-center">
                        <h4 class="text-themecolor">User Dashboard</h4>
                    </div>
                    <div class="col-md-7 align-self-center text-right">
                        <div class="d-flex justify-content-end align-items-center">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>

                                <li class="breadcrumb-item active">Dashboard </li>

                            </ol>
                            <!-- <button type="button" class="btn btn-dark d-none d-lg-block m-l-15"><i class="fa fa-plus-circle"></i> Create New</button> -->
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="alert alert-info" id="divOngoingTransaction" style="display: none">Ongoing Transaction: <span id="linkOngoingTransaction">None</span> </div>
                    </div>    
                </div>
              <!--  <div class="row"> -->
                    <!-- Column -->
                  <!--   <div class="col-lg-6 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="round align-self-center round-lg round-info"><i class="fa fa-qrcode"></i></div>
                                    <div class="m-l-10 align-self-center">
                                        <h3 class="m-b-0">Your Address</h3>
                                        <h5 class="text-muted m-b-0" id="currentUserAddress">0x0000000000000000000000000000000000000000</h5></div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- Column --> 
                    <!-- Column -->
                   <!--  <div class="col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="round align-self-center round-lg round-danger"><i class="ti-wallet"></i></div>
                                    <div class="m-l-10 align-self-center">
                                        <h3 class="m-b-0" id="tokenBalance">0 OKT</h3>
                                        <h5 class="text-muted m-b-0">OK Token</h5></div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- Column -->
                    <!-- Column -->
                   <!--  <div class="col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="round align-self-center round-lg round-success"><i class="ti-wallet"></i></div>
                                    <div class="m-l-10 align-self-center">
                                        <h3 class="m-b-0" id="accountBalance">0 ETH</h3>
                                        <h5 class="text-muted m-b-0">Ether Balance</h5></div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- Column -->
                <!-- </div> -->

                <div class="row">
                    <!-- Column -->
                    <div class="col-lg-6 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="round align-self-center round-lg round-info"><i class="fa fa-qrcode"></i></div>
                                    <div class="m-l-10 align-self-center">
                                        <h3 class="m-b-0">Your Address</h3>
                                        <h5 class="text-muted m-b-0" id="currentUserAddress">0x0000000000000000000000000000000000000000</h5></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Column --> 
                    <!-- Column -->
                    <div class="col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="round align-self-center round-lg round-danger"><i class="ti-wallet"></i></div>
                                    <div class="m-l-10 align-self-center">
                                        <h3 class="m-b-0" id="tokenBalance">0 <?php echo $tokenSymbol;?></h3>
                                        <h5 class="text-muted m-b-0"><?php echo $tokenSymbol;?> Token</h5></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Column -->
                    <!-- Column -->
                    <div class="col-lg-3 col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="round align-self-center round-lg round-success"><i class="ti-wallet"></i></div>
                                    <div class="m-l-10 align-self-center">
                                        <h3 class="m-b-0" id="accountBalance">0 ETH</h3>
                                        <h5 class="text-muted m-b-0">Ether Balance</h5></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Column -->
                </div>

                <!-- ============================================================== -->
                <!-- Yearly Sales -->
                <!-- ============================================================== -->
                <div class="row">
                    <div class="col-lg-6">
                         <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="round align-self-center round-lg round-info"><i class="fa fa-qrcode"></i></div>
                                    <div class="m-l-10 align-self-center">
                                        <h3 class="m-b-0">Token Address</h3>
                                        <h5 class="text-muted m-b-0">0xd1e3f4ea5040415d1a378e3697a3254afa2cad48</h5></div>
                                </div>
                            </div>
                        </div> 


                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"> Load Tokens </h4>
                                <h5 class="text-muted m-b-0" id="couponAllowance"> <b>Token : 0 <?php echo $tokenSymbol; ?></b></h5>
                                <form class="form p-t-20">                                
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Approve Tokens</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon2">TOKEN</span>
                                            </div>
                                            <input type="number" id="approveToken" class="form-control" placeholder="Enter no. of Token" aria-label="Email" value="1">

                                        </div>
                                    </div>
                                    
                                    <button type="button" onclick="approveTokenUse()" class="btn btn-success waves-effect waves-light m-r-10" id="btnBuyToken">Buy <span id=""><?php echo $tokenSymbol; ?></span></button>

                                    <button type="button" disabled="" class="btn btn-warning" id="btnPausedPurchase" style="display: none">
                                        Purchase Not Available
                                    </button>
                                </form>
                            </div>
                        </div>


                               <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Generate Gift Coupon</h4>
                                <h6 class="card-subtitle">using your token balance</h6>
                                <form class="form p-t-20" id="generateCouponFrm" onsubmit="return false;">
                                    <div class="form-group">
                                        <label for="exampleInputuname">Coupon Title</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1"><i class="ti-ticket"></i></span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Coupon Title" aria-label="Coupon Title" aria-describedby="basic-addon1" id="coupon_title" value="">   
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputuname">Coupon Cost</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-ge"></i></span>
                                            </div>
                                            <input type="number" min="100" class="form-control" placeholder="No. of Tokens" aria-label="Coupon Cost" aria-describedby="basic-addon1" id="coupon_cost" value="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputuname">Coupon Quantity</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-shopping-basket"></i></span>
                                            </div>
                                            <input type="number" min="1" class="form-control" placeholder="Coupon Quantity" aria-label="Coupon Quantity" aria-describedby="basic-addon1" id="coupon_quantity" value="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Coupon Expiry</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon2"><i class=" fa fa-calendar"></i></span>
                                            </div>
                                            <input type="date" class="form-control" placeholder="Coupon Expiry Date" aria-describedby="basic-addon2" id="coupon_expiry">

                                        </div>
                                    </div>
                                    
                                    <button type="submit" id="btnGenerateCoupon" class="btn btn-success waves-effect waves-light m-r-10">Send</button>
                                    <button type="button" disabled="" class="btn btn-warning" id="btnTransferPurchase" style="display: none">
                                        Transfer Not Available
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>


                    <div class="col-lg-6">

                         <div class="card">
                            <div class="card-body">
                                <div class="d-flex flex-row">
                                    <div class="round align-self-center round-lg round-warning"><i class="fa fa-exchange"></i></div>
                                    <div class="m-l-10 align-self-center">
                                        <h3 class="m-b-0">Exchange Rate </h3>
                                        <h5 class="text-muted m-b-0" id="currentOKTExchangeRate"></h5>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Buy <?php echo $tokenSymbol; ?> Coins</h4>
                                <h6 class="card-subtitle">simple Step to buy <?php echo $tokenSymbol; ?></h6>
                                <form class="form p-t-20">
                                    <!-- <div class="form-group">
                                        <label for="exampleInputuname">Contract Address</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1"><i class="ti-user"></i></span>
                                            </div>
                                            <input type="text" class="form-control" disabled placeholder="Contract Address" aria-label="Username" aria-describedby="basic-addon1" value="0xdB8c2257D8c6964B1A0d33BDbb9ffe3F5c23B4A2">
                                        </div>
                                    </div> -->
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Ether (Minimum <span id="spMinContribution">0</span> ETH required)</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon2">ETH</span>
                                            </div>
                                            <input type="number" id="inpMinContribution" class="form-control" placeholder="Enter no. of ETH" aria-label="Email" aria-describedby="basic-addon2" value="0">

                                        </div>
                                    </div>
                                    
                                    <button type="button" onclick="buyTokenForEther()" class="btn btn-success waves-effect waves-light m-r-10" id="btnBuyToken">Buy <span id="spProbableToken">0 <?php echo $tokenSymbol; ?></span></button>

                                    <button type="button" disabled="" class="btn btn-warning" id="btnPausedPurchase" style="display: none">
                                        Purchase Not Available
                                    </button>
                                </form>
                            </div>
                        </div>
                        
                         <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Send <?php echo $tokenSymbol; ?> Tokens</h4>
                                <h6 class="card-subtitle">simple Step to send <?php echo $tokenSymbol; ?></h6>
                                <form class="form p-t-20" id="tokenSendFrm" onsubmit="return false;">
                                    <div class="form-group">
                                        <label for="exampleInputuname">Beneficiary  Address</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1"><i class="ti-user"></i></span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Contract Address" aria-label="Username" aria-describedby="basic-addon1" id="beneficaryAddress" value="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><?php echo $tokenSymbol; ?></label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon2"><?php echo $tokenSymbol; ?></span>
                                            </div>
                                            <input type="text" class="form-control" placeholder="Enter no. of <?php echo $tokenSymbol; ?>" aria-label="Email" aria-describedby="basic-addon2" id="sendToken">

                                        </div>
                                    </div>
                                    
                                    <button type="submit" id="butTokenBtn" class="btn btn-success waves-effect waves-light m-r-10">Send</button>
                                    <button type="button" disabled="" class="btn btn-warning" id="btnTransferPurchase" style="display: none">
                                        Transfer Not Available
                                    </button>
                                </form>
                            </div>
                        </div>

                          <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Redeem Gift Coupon</h4>

                                <form class="form p-t-20" id="tokenSendFrm" onsubmit="return false;">
                                    <div class="form-body"> 
                                        <div class="form-group row">
                                            <label class="control-label text-right col-md-3">Coupon Code</label>
                                            <div class="col-md-6">
                                                 <input type="text" class="form-control" placeholder="Coupon Code" id="coupon_code" value="">
                                            </div>
                                           
                                            <div class="col-md-3">
                                                <button type="submit" id="redeemCouponBtn" class="btn btn-success waves-effect waves-light m-r-10">Redeem</button>
                                            </div>
                                        </div>    
                                    </div>  

                                </form>
                            </div>
                        </div>

                    </div>
                </div>




                <!-- ============================================================== -->
                <!-- Redeem Coupon -->
                <!-- ============================================================== -->
               <!--  <div class="row">
                    <div class="col-lg-12">
                         <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Redeem Gift Coupon</h4>

                                <form class="form p-t-20" id="tokenSendFrm" onsubmit="return false;">
                                    <div class="form-body"> 
                                        <div class="form-group row">
                                            <label class="control-label text-right col-md-3">Coupon Code</label>
                                            <div class="col-md-6">
                                                 <input type="text" class="form-control" placeholder="Coupon Code" id="coupon_code" value="">
                                            </div>
                                           
                                            <div class="col-md-3">
                                                <button type="submit" id="redeemCouponBtn" class="btn btn-success waves-effect waves-light m-r-10">Redeem</button>
                                            </div>
                                        </div>    
                                    </div>  

                                </form>
                            </div>
                        </div>
                    </div>
                </div>  
                -->
                <!-- ============================================================== -->
                <!-- Latest Transaction Listing -->
                <!-- ============================================================== -->
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Transactions Report</h4>
                                <div class="table-responsive m-t-20">
                                    <table id="cc-table" class="table table-bordered table-striped" data-page-length='10'>
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>User Address</th>
                                                <th>Coupon Code</th>
                                                <th>Token</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr role="row">
                                                <td>1</td>
                                                <td>
                                                    <div class="text-ellipsis"><a href="JavaScript: void(0);">  0xab0874cB61D83F6B67Dc08141568868102233bef</a></div>
                                                </td>
                                                <td class="no-wrap text-right"><span class="label label-danger">GET8456348631</span></td>
                                                <td class="no-wrap text-right">500</td>
                                                <td class="no-wrap text-right"><span class="label label-danger">Expired</span></td>
                                            </tr>
                                            <tr role="row">
                                                <td>2</td>
                                                <td>
                                                    <div class="text-ellipsis"><a href="JavaScript: void(0);">  0xab0874cB61D83F6B67Dc08141568868102233bef</a></div>
                                                </td>
                                                <td class="no-wrap text-right"><span class="label label-danger">GET8456348631</span></td>
                                                <td class="no-wrap text-right">500</td>
                                                <td class="no-wrap text-right"><span class="label label-success">Used</span></td>
                                            </tr>
                                            <tr role="row">
                                                <td>3</td>
                                                <td>
                                                    <div class="text-ellipsis"><a href="JavaScript: void(0);">  0xab0874cB61D83F6B67Dc08141568868102233bef</a></div>
                                                </td>
                                                <td class="no-wrap text-right"><span class="label label-danger">GET8456348631</span></td>
                                                <td class="no-wrap text-right">500</td>
                                                <td class="no-wrap text-right"><span class="label label-warning">Not Used</span></td>
                                            </tr>
                                            <tr role="row">
                                                <td>4</td>
                                                <td>
                                                    <div class="text-ellipsis"><a href="JavaScript: void(0);">  0xab0874cB61D83F6B67Dc08141568868102233bef</a></div>
                                                </td>
                                                <td class="no-wrap text-right"><span class="label label-danger">GET8456348631</span></td>
                                                <td class="no-wrap text-right">500</td>
                                                <td class="no-wrap text-right"><span class="label label-success">Used</span></td>
                                            </tr>
                                            <tr role="row">
                                                <td>5</td>
                                                <td>
                                                    <div class="text-ellipsis"><a href="JavaScript: void(0);">  0xab0874cB61D83F6B67Dc08141568868102233bef</a></div>
                                                </td>
                                                <td class="no-wrap text-right"><span class="label label-danger">GET8456348631</span></td>
                                                <td class="no-wrap text-right">500</td>
                                                <td class="no-wrap text-right"><span class="label label-success">Used</span></td>
                                            </tr>
                                            <tr role="row">
                                                <td>6</td>
                                                <td>
                                                    <div class="text-ellipsis"><a href="JavaScript: void(0);">  0xab0874cB61D83F6B67Dc08141568868102233bef</a></div>
                                                </td>
                                                <td class="no-wrap text-right"><span class="label label-danger">GET8456348631</span></td>
                                                <td class="no-wrap text-right">500</td>
                                                <td class="no-wrap text-right"><span class="label label-warning">Not Used</span></td>
                                            </tr>
                                            <tr role="row">
                                                <td>7</td>
                                                <td>
                                                    <div class="text-ellipsis"><a href="JavaScript: void(0);">  0xab0874cB61D83F6B67Dc08141568868102233bef</a></div>
                                                </td>
                                                <td class="no-wrap text-right"><span class="label label-danger">GET8456348631</span></td>
                                                <td class="no-wrap text-right">500</td>
                                                <td class="no-wrap text-right"><span class="label label-danger">Expired</span></td>
                                            </tr>

                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- .right-sidebar -->
               
                <!-- ============================================================== -->
                <!-- End Right sidebar -->
                <!-- ============================================================== -->
            </div>
            <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== -->
        </div>

<?php include('template/_footer.php');?>   