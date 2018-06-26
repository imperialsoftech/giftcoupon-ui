        <footer class="footer">
            © <?php echo date('Y');?> ICO by <a href="http://www.imperialsoftech.com/" target="_blank">imperialsoftech.com</a>
        </footer>
        <!-- ============================================================== -->
        <!-- End footer -->
        <!-- ============================================================== -->
    </div>
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <!-- ============================================================== -->
   
    <script src="../assets/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="dist/js/perfect-scrollbar.jquery.min.js"></script>
    <script src="dist/js/waves.js"></script>
    <script src="dist/js/custom.min.js"></script>
    <script type="text/javascript" src="dist/js/parsley.min.js"></script>
    <script src="dist/sweetAlert/sweetAlert.js"></script>
    <script src="../assets/node_modules/switchery/dist/switchery.min.js"></script>
    <script src="../assets/node_modules/datatables/jquery.dataTables.min.js"></script>
   
    <!-- <script src="../assets/node_modules/flot/excanvas.js"></script>
    <script src="../assets/node_modules/flot/jquery.flot.js"></script>
    <script src="../assets/node_modules/flot/jquery.flot.pie.js"></script>
     --><!-- <script src="../assets/node_modules/flot/jquery.flot.time.js"></script> -->
    <!-- <script src="../assets/node_modules/flot/jquery.flot.stack.js"></script> -->
    <!-- <script src="../assets/node_modules/flot/jquery.flot.crosshair.js"></script> -->
    <!-- <script src="../assets/node_modules/flot.tooltip/js/jquery.flot.tooltip.min.js"></script> -->
    <!-- <script src="dist/js/pages/flot-data.js"></script> -->

    <!--  contract abi  -->
    <script type="text/javascript" src="dist/js/web3.min.js"></script>
    <script type="text/javascript" src="dist/js/abi/icoContractAbi.js"></script>
    <script type="text/javascript" src="dist/js/abi/icoTokenAbi.js"></script>
    <script type="text/javascript" src="dist/js/abi/giftCouponAbi.js"></script>

    <script type="text/javascript" src="dist/js/app/app.js"></script>

    <script type="text/javascript" src="dist/js/app/user.js"></script>
    <script type="text/javascript" src="dist/js/app/admin.js"></script>

    
    <script type="text/javascript">
    $(function() {
        $('#cc-table').DataTable({
            "displayLength": 10
        });
        $("#live").perfectScrollbar();
        $("#task1").perfectScrollbar();
        $("#task2").perfectScrollbar();
        $("#task3").perfectScrollbar();
        $("#task4").perfectScrollbar();
        $("#task5").perfectScrollbar();
        $("#task6").perfectScrollbar();

       // initChart();
    });

    function initChart(){
        var data = [{
            label: "Series 0"
                , data: 10
                , color: "#4f5467"
            , }, {
                label: "Series 1"
                , data: 1
                , color: "#26c6da"
            , }, {
                label: "Series 2"
                , data: 3
                , color: "#009efb"
            , }, {
                label: "Series 3"
                , data: 1
                , color: "#7460ee"
            , }];
        var plotObj = $.plot($("#flot-pie-chart"), data, {
            series: {
                pie: {
                    innerRadius: 0.5
                    , show: true
                }
            }
            , grid: {
                hoverable: true
            }
            , color: null
            , tooltip: true
            , tooltipOpts: {
                content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                shifts: {
                    x: 20
                    , y: 0
                }
                , defaultTheme: false
            }
        });
    }
    </script>
</body>


<!-- Mirrored from eliteadmin.themedesigner.in/demos/bt4/cryptocurrency/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 03 May 2018 05:41:49 GMT -->
</html>
