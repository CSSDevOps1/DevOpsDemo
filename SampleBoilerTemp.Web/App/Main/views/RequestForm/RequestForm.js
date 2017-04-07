
var app = angular.module('app');
app.controller("app.views.RequestForm", function ($scope, $timeout, requestAJService, $window, appSession, $location) {
    $scope.requests = [];
    $scope.emp = null;
     
    $scope.From = appSession.user.name;
    var today = new Date();
    var date = today.getDate() + "-" + today.toLocaleString("en-us", { month: "long" }) + "-" + today.getFullYear();
    var qs = $location.search();
    $scope.Date = today;
    $scope.Month = today.toLocaleString("en-us", { month: "long" });;
    $scope.Wing = appSession.tenant.name;
    GetAllDetails();
   // Bind();

/* ************************  On Load data details Start **********************    */
    function BindData() {
            $scope.requests.push($scope.emp);
       }
    function  Bind()

    {
        //for (var i = 0; i <8; i++) {
        //    $scope.showEdit = false;
        //    var index = 0;
        //    if ($scope.requests.length != 0)
        //        index = $scope.requests.length;

        //    var emp = {
        //        Index: index,

        //        UserId: appSession.user.id,
        //        TenantId: appSession.tenant.id
        //    };


        //    $scope.emp = emp;

        //    BindData();
        //}
    }
    function GetAllDetails()
    {
        GetParticulars();
        GetUnits();
      
        if (qs.id != null) {
            var getParticularData = requestAJService.getDetails(qs.id);
            getParticularData.success(function (particular) {
            
                for (var i = 0; i < particular.length; i++) {
                    var particularitems = {};
                    particularitems.Id = particular[i].Id;
                    particularitems.Item_id = particular[i].Item_id;
                    particularitems.Unit_Id = particular[i].Unit_Id;
                    particularitems.Quantity=particular[i].Quantity;
                    particularitems.Rate=particular[i].Rate;
                    particularitems.Vat=particular[i].Vat;
                    particularitems.VateRate=particular[i].VateRate;
                    particularitems.FinalRate=particular[i].FinalRate;
                    particularitems.Cost = particular[i].Cost;
                    //particularitems.RequestId = particular[i].RequestId;
                    particularitems.TenantId = particular[i].TenantId;
                    particularitems.UserId = particular[i].UserId;
                    $scope.requests.push(particularitems);
                }

            }, function () {
                    alert('Error in getting particular records');
            });
        }
    }
    function GetParticulars() {
     
        var getParticularData = requestAJService.getAllParticulars();

        getParticularData.success(function (particular) {
          
            $scope.particulars = particular;
        }, function () {
           
            alert('Error in getting particular records');
        });
    }
    function GetUnits() {
        var getUnits = requestAJService.getUnits();

        getUnits.success(function (unit) {
            $scope.units = unit;
        }, function () {
            alert('Error in getting unit records');
        });
    }

    /* ************************  On Load data details End **********************    */


    /* ************************  Event handler Start **********************    */
    $scope.SubmitRequestDiv = function () {

        $scope.showEdit = true;

        var req = requestAJService.addRequest($scope.requests, appSession.tenant.id, appSession.user.id,qs);
        req.then(function (msg) {
            $window.location.href = '#/test';

        }, function () {
            alert('Error in updating emp record');
        });


    }

   
    $scope.AddRequest = function () {
        $scope.showEdit =  false;
        var index = 0;
        if ($scope.requests.length != 0) {
            index = "A" + $scope.requests.length;
        }
        else
        {
            index = "A" + 0;
}
           
        var emp = {
            Id: index,
           
            UserId: appSession.user.id,
            TenantId: appSession.tenant.id
    };
       
        var getEmpAction = $scope.Action;
        $scope.emp = emp;
        if ($scope.Action == "Update")
            $scope.emp.Index = $scope.updateIndex;
      
            BindData();

    }

    $scope.GetRatedetails = function (request) {

        if (request.Item_id != null && request.Unit_Id != null) {
            var req = requestAJService.getRateDetails(request.Item_id, request.Unit_Id);
            req.then(function (msg) {
                if (msg.data.length != 0) {
                    request.Rate = msg.data[0].Rate;
                    request.Vat = msg.data[0].VAT;
                    request.VateRate = request.Vat * request.Rate / 100;
                    request.FinalRate = request.Rate + request.VateRate;
                    request.Cost = request.FinalRate * request.Quantity;
                }
                else
                {

                    request.Rate ="";
                    request.Vat = "";
                    request.VateRate = "";
                    request.FinalRate = "";
                    request.Cost = "";

                }
            }, function () {
                alert('Error in updating emp record');
            });
        }
    }

    $scope.AddRequestDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divAddRequest = true;
        GetParticulars();
        GetUnits();
    }

    $scope.DeleteRequest=function() {
    
        $scope.requests = [];
      
    }
    
    $scope.FinalCost = function (request)
    {
        request.Cost = request.FinalRate * request.Quantity;

    }

    $scope.Cancel = function () {
      
        
    };

    $scope.RemoveDetails = function (request) {

        for (var i = 0; i < $scope.requests.length; i++) {
                    

            if ($scope.requests[i].Id == request.Id) {
                var isLocal = request.Id.toLocaleString();
                if (isLocal.indexOf('A')) {
                    
                    var req = requestAJService.deleteDetailById(isLocal, qs.id);
                    req.then(function (msg) {
                        GetAllDetails();

                    }, function () {
                        alert('Error in deleting emp record');
                    });
                }
                else {
                    $scope.requests.splice(i, 1);
                }
             
            }

        }
    }

    $scope.toggleEdit = function (request) {
        request.showEdit = request.showEdit ? false : true;
    }

    /* ************************  Event handler End **********************    */



    function ClearFields() {
        $scope.ParticularId = "";
        $scope.UnitId = "";
        $scope.Rate = "";
        $scope.Vat = "";
        $scope.VateRate = "";
        $scope.FinalRate = "";
        $scope.Quantity = "";
        $scope.Cost = "";
        GetParticulars();
        GetUnits();
    }
});
/* ************************  Service API Start **********************    */
app.service("requestAJService", function ($http, $q) {
    
    this.getAllParticulars = function () {
        var response = $http({
            method: "get",
            url: "RequestForm/GetAllParticulars",
            dataType: "json"
        });
        return response;
    }

    this.getDetails = function (id) {
        var response = $http({
            method: "post",
            url: "RequestForm/EditRequest",
            params: {
                requestId: id
            }
            
        });
        return response;
    }

    this.getUnits = function () {
        var response = $http({
            method: "get",
            url: "RequestForm/GetUnits",
            dataType: "json"
        });
        return response;
    }

    this.getRateDetails = function (particulardesc,untidesc) {
        var response = $http({
            method: "post",
            url: "RequestForm/GetRateDetails",
            params: {
                particular: particulardesc,
                unit: untidesc

            }
        });
        return response;
    }
    this.deleteDetailById = function (id, qs) {
        var response = $http({
            method: "get",
            url: "RequestForm/DeleteDetailById",
            params: {
                id: id,
                requestId: qs
              
            }
        });
        return response;
    }


    this.addRequest = function (emp, tenant, user,qs) {
        emp.tenant = tenant;
        var response = $http({
            method: "put",
            //url: "Employee/AddEmployee",
            url: "RequestForm/PostStationaryRequestDetails",
            data: JSON.stringify(emp),
            params: {
               
                requestId: qs.id

    }
           
            
        }); 
        return response;
    }

   


});

/* ************************  Service API  End**********************    */
app.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);


