
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
                        <h4 class="text-themecolor">Admin Dashboard</h4>
                    </div>
                    <div class="col-md-7 align-self-center text-right">
                        <div class="d-flex justify-content-end align-items-center">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="javascript:void(0)">Home</a></li>
                                <li class="breadcrumb-item active">Dashboard</li>
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
                                        <h3 class="m-b-0">Your Address <!-- <i class="icon-docs" style="color:red;" title="Copy to clipboard" onclick="copyText();"></i> --></h3>
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
                <!-- Generate Gift Coupon -->
                <!-- ============================================================== -->
                <div class="row">
                    <div class="col-lg-6">
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
                                            <input type="text" class="form-control" placeholder="Coupon Title" aria-label="Coupon Title" aria-describedby="basic-addon1" id="coupon_title" value="" required="" data-parsley-errors-container="#coupon_title_span">   
                                        </div>
                                        <span id="coupon_title_span"></span>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputuname">Coupon Cost</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-ge"></i></span>
                                            </div>
                                            <input type="number" min="100" class="form-control" placeholder="No. of Tokens" aria-label="Coupon Cost" aria-describedby="basic-addon1" id="coupon_cost" value="" required="" data-parsley-errors-container="#coupon_cost_span">
                                        </div>
                                        <span id="coupon_cost_span"></span>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputuname">Coupon Quantity</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1"><i class="fa fa-shopping-basket"></i></span>
                                            </div>
                                            <input type="number" min="1" class="form-control" placeholder="Coupon Quantity" aria-label="Coupon Quantity" aria-describedby="basic-addon1" id="coupon_quantity" value="" required="" data-parsley-errors-container="#coupon_quantity_span">
                                        </div>
                                        <span id="coupon_quantity_span"></span>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Coupon Expiry</label>
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon2"><i class=" fa fa-calendar"></i></span>
                                            </div>
                                            <input type="date" class="form-control" placeholder="Coupon Expiry Date" aria-describedby="basic-addon2" id="coupon_expiry" required="" data-parsley-errors-container="#coupon_expiry_span">

                                        </div>
                                         <span id="coupon_expiry_span"></span>
                                    </div>
                                    
                                    <button type="submit" id="butTokenBtn1" onclick="generateGiftCoupon();" class="btn btn-success waves-effect waves-light m-r-10">Send</button>
                                    <button type="button" disabled="" class="btn btn-warning" id="btnTransferPurchase" style="display: none">
                                        Transfer Not Available
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                         <div class="card" style="height: 520px;">
                            <div class="card-body">
                                <h4 class="card-title">Pie Chart</h4>
                                <div class="flot-chart">
                                    <div class="flot-chart-content" id="flot-pie-chart"></div>
                                </div>
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
        <script type="text/javascript">
            $(document).ready(function(){
                $("#generateCouponFrm").parsley();
            });
        </script>
<?php include('template/_footer.php');?>    
