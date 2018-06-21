<?php include('template/_header.php');?>

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
                                        <h3 class="m-b-0" id="tokenBalance">0 OKT</h3>
                                        <h5 class="text-muted m-b-0">OK Token</h5></div>
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
                <!-- Redeem Coupon -->
                <!-- ============================================================== -->
                 <div class="row">
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