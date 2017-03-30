
var app = angular.module('app');
app.controller("app.views.test", function ($scope, $timeout, crudAJService, appSession) {
    debugger;
  
    $scope.divAddRequest = false;
    GetAllRequests();
    //To Get all emp records  
    function GetAllRequests() {
        debugger;
        var getEmpData = crudAJService.getAllRequests(appSession.tenant.id, appSession.user.id);

        getEmpData.success(function (emp) {
            $scope.requests = emp;
        }, function () {
            alert('Error in getting emp records');
        });

    }

    $scope.editRequest = function (emp) {
        debugger;

        $scope.ParticularId = emp.ParticularId;
        $scope.UnitId = emp.UnitId;
        $scope.Rate = emp.Rate;
        $scope.Vat = emp.Vat;
        $scope.VateRate = emp.VateRate;
        $scope.FinalRate = emp.FinalRate;
        $scope.Quantity = emp.Quantity;
        $scope.Cost = emp.Cost;
        $scope.Action = "Update";
        $scope.divAddRequest = true;

    }

    $scope.AddRequest = function () {

        var varlues = $scope.employee;
        var emp = {
            Rate: $scope.Rate,
            Vat: $scope.Vat,
            VateRate: $scope.VateRate,
            FinalRate: $scope.FinalRate,
            Quantity: $scope.Quantity,
            Cost: $scope.Cost,
        };
        var getEmpAction = $scope.Action;

        if (getEmpAction == "Update") {
            emp.ParticularId = $scope.ParticularId;
            var getempData = crudAJService.updateEmployee(emp);
            getempData.then(function (msg) {
                GetAllEmployees();
                alert(msg.data);
                $scope.divAddRequest = false;
            }, function () {
                alert('Error in updating emp record');
            });
        }

        else {

            var getempData = crudAJService.AddRequest(emp);
            getempData.then(function (msg) {
                GetAllEmployees();
                alert(msg.data);
                $scope.divAddRequest = false;
            }, function () {
                alert('Error in adding emp record');
            });
        }
    }

    $scope.AddRequestDiv = function () {
        ClearFields();
        $scope.Action = "Add";
        $scope.divAddRequest = true;
    }

    $scope.DeleteRequest = function (emp) {
        var getData = crudAJService.deleteEmployee(emp.EmployeeId);
        getData.then(function (msg) {
            alert(msg.data);
            GetAllEmployees();

        }, function () {
            alert('Error in deleting emp record');
        });
    }

    function ClearFields() {
        $scope.Name = ""
        $scope.EmployeeId = "";
        $scope.Designation = "";
        $scope.Dept = "";
    }
    $scope.Cancel = function () {
        $scope.divAddRequest = false;
    };
});

app.service("crudAJService", function ($http, $q) {
    var deferred = $q.defer();
    //get All Books
    this.getAllRequests = function (tenant,user) {

        var response = $http({

            method: "post",
            //url: "Employee/AddEmployee",
            url: "RequestForm/GetAllRequests",
            params: {
                tenantId: tenant,
                userId: user
            },
            dataType: "json"
        });
        return response;

        // return $http.get("Employee/GetAllEmployee");
    }

    // get Book by bookId
    this.getEmployee = function (EmployeeId) {
        var response = $http({
            method: "post",
            url: "Employee/GetEmployeeById",
            params: {
                id: JSON.stringify(EmployeeId)
            }
        });
        return response;
    }

    // Update Book 
    this.updateEmployee = function (emp) {
        var response = $http({
            method: "post",
            url: "Employee/UpdateEmployee",
            data: JSON.stringify(emp),
            dataType: "json"
        });
        return response;
    }

    // Add Book
    this.AddRequest = function (emp) {
        var response = $http({
            method: "post",
            //url: "Employee/AddEmployee",
            url: "http://localhost:64018/api/PostStationaryRequestDetails",
            data: JSON.stringify(emp),
            dataType: "json"
        });
        return response;
    }

    //Delete Book
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


