
var app = angular.module('app');
app.controller("app.views.RequestForm", function ($scope, $timeout, requestAJService, $window, appSession, $location) {
    $scope.requests = [];
    $scope.emp = null;
   
    $scope.From = appSession.user.name;
    var today = new Date();
    var date = today.getDate() + "-" + today.toLocaleString("en-us", { month: "long" }) + "-" + today.getFullYear();
    //var month = today.toLocaleString("en-us", { month: "long" });
    $scope.Date = today;
    $scope.Month = today.toLocaleString("en-us", { month: "long" });;

    GetAllDetails();
    Bind();
    function BindData() {
       
        $scope.requests.push($scope.emp);
       

    }
    function  Bind()

    {
        for (var i = 0; i <8; i++) {
            $scope.showEdit = false;
            var index = 0;
            if ($scope.requests.length != 0)
                index = $scope.requests.length;

            var emp = {
                Index: index,

                UserId: appSession.user.id,
                TenantId: appSession.tenant.id
            };


            $scope.emp = emp;

            BindData();
        }
    }

    function GetAllDetails()
    {
        GetParticulars();
        GetUnits();
        var qs = $location.search();
        if (qs.id != null) {
            var getParticularData = requestAJService.getDetails(qs.id);

            getParticularData.success(function (particular) {
                debugger;


                $scope.requests = particular;
            }, function () {
                debugger;
                alert('Error in getting particular records');
            });
        }
    }
   
  
  function GetParticulars() {
        debugger;
        var getParticularData = requestAJService.getAllParticulars();

        getParticularData.success(function (particular) {
            debugger;
            $scope.particulars = particular;
        }, function () {
            debugger;
            alert('Error in getting particular records');
        });
    }
  $scope.SubmitRequestDiv = function ()
    {
            
      $scope.showEdit = true;
        var req = requestAJService.addRequest($scope.requests,appSession.tenant.id, appSession.user.id);
        req.then(function (msg) {
            $window.location.href = '#/test';
            //request.showEdit = request.showEdit ? false : true;
            //$scope.Result = "Request successfully submitted";
        
        }, function () {
            alert('Error in updating emp record');
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

    

    

    $scope.EditDetails = function () {
        $scope.showEdit = false;
        $scope.ParticularId = request.ParticularId;
        $scope.UnitId = request.UnitId;
        $scope.Rate = request.Rate;
        $scope.Vat = request.Vat;
        $scope.VateRate = request.VateRate;
        $scope.FinalRate = request.FinalRate;
        $scope.Quantity = request.Quantity;
        $scope.Cost = request.Cost;
        $scope.Action = "Update";
        $scope.updateIndex = request.Id;
        $scope.divAddRequest = true;
    }

    $scope.AddRequest = function () {
        $scope.showEdit =  false;
        var index = 0;
        if ($scope.requests.length != 0)
             index = $scope.requests.length;
           
        var emp = {
            Index: index,
           
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

        if (request.ParticularDesc != null && request.UnitDesc != null) {
            var req = requestAJService.getRateDetails(request.ParticularDesc, request.UnitDesc);
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

    function ClearFields() {
        $scope.ParticularId = "";
        $scope.UnitId ="";
        $scope.Rate = "";
        $scope.Vat = "";
        $scope.VateRate = "";
        $scope.FinalRate = "";
        $scope.Quantity = "";
        $scope.Cost = "";
        GetParticulars();
        GetUnits();
    }
    $scope.Cancel = function () {
      
        
    };
    $scope.RemoveDetails = function (request) {

        for (var i = 0; i < $scope.requests.length; i++) {
            if ($scope.requests[i].Index == request.Index) {
              
                    $scope.requests.splice(i, 1);
             
            }

        }
    }

    $scope.toggleEdit = function (request) {
        request.showEdit = request.showEdit ? false : true;
    }
});

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
                particular: JSON.stringify(particulardesc),
                unit: JSON.stringify(untidesc)

            }
        });
        return response;
    }

    this.updateEmployee = function (emp) {
        var response = $http({
            method: "post",
            url: "Employee/UpdateEmployee",
            data: JSON.stringify(emp),
            dataType: "json"
        });
        return response;
    }

    this.addRequest = function (emp, tenant, user) {
        emp.tenant = tenant;
        var response = $http({
            method: "post",
            //url: "Employee/AddEmployee",
            url: "RequestForm/PostStationaryRequestDetails",
            data: JSON.stringify(emp),
          
            dataType: "json"
        });
        return response;
    }

    this.deleteEmployee = function (employeeId) {
        var response = $http({
            method: "post",
            url: "Employee/DeleteEmployee",
            params: {
                empId: JSON.stringify(employeeId)
            }
        });
        return response;
    }


});

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


