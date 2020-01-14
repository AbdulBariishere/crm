app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                onSelect: function (date) {
                    scope.date = date;
                     
                    scope.$apply();
                }
            });
        }
    };
});
app.directive('jqdatepicker2', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'm/dd/yy',
                onSelect: function (date2) {
                   
                    scope.date2 = date2;
                    scope.$apply();
                }
            });
        }
    };
});
app.controller('vosoreports', function ($scope, $http, $location, $timeout, $window) {
  app.filter('beginning_data', function () {
    return function (input, begin) {
      if (input) {
        begin = +begin;
        return input.slice(begin);
      }
      return [];
    }
  });
  $scope.getreports = function () {
    var email = localStorage.getItem("email");
    var token = localStorage.getItem("token");

    var fromdate = $scope.date;
    localStorage.setItem("fromdate", fromdate);
    //console.log(fromdate);
    var todate = $scope.date2;
    localStorage.setItem("todate", todate);
    //console.log(todate);

    var user = $scope.user;
    var owners=user.email;
    //console.log(user.email);
      localStorage.setItem("owner", owners);
    var url;
    if (user == undefined) {
      url = "http://103.127.157.28:8443/reporttotalleads?Useremail=" + email + "&token=" + token + "&fromdate=" + fromdate + "&todate=" + todate;
    } else {
      url = "http://103.127.157.28:8443/reporttotalleadsforuser?Useremail=" + email + "&token=" + token + "&fromdate=" + fromdate + "&todate=" + todate + "&Owner=" + user.email;
    }
    $http({
        method: "GET"
        , url: url
        , transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
        , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        if (response.data.status == true) {
         // console.log(response.data.data);
          $scope.file = response.data.data;
          $scope.current_grid = 1;
          $scope.data_limit = 5000;
          $scope.filter_data = $scope.file.length;
          $scope.entire_user = $scope.file.length;
          $scope.page_position = function (page_number) {
            $scope.current_grid = page_number;
          };
          $scope.filter = function () {
            $timeout(function () {
              $scope.filter_data = $scope.searched.length;
            }, 20);
          };
          $scope.sort_with = function (base) {
            $scope.base = base;
            $scope.reverse = !$scope.reverse;
          };
          user = '';
        } else {
          $location.path("/vosoreports");
          swal("Something went wrong!", response.data.message, "warning", { buttons: false, timer: 2000, });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
  $scope.gettotalleads=function(){
     var email = localStorage.getItem("email");
    var token = localStorage.getItem("token");
    var fromdate = localStorage.getItem("fromdate");
    var todate = localStorage.getItem("todate");
    var myuser = localStorage.getItem("owner");
     $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/ReportTotalLeadCountForUser?Useremail=" + email + "&token=" + token + "&fromdate=" + fromdate + "&todate=" + todate+"&Owner="+myuser,
         transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
        , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
       // console.log(response.data.TotalModifiedDateLeadForUser[0].count);
       
          console.log(response.TotalCreatedDateLeadForUser);
         $scope.totalmodified=response.data.TotalModifiedDateLeadForUser[0].count
         console.log($scope.totalmodified);
         $scope.totalcreated=response.data.TotalCreatedDateLeadForUser[0].count
          console.log($scope.totalcreated);
          //user = '';
       
      }, function (response) {
        alert('server error occured')
      })
  }

  
   
  $scope.showMe = true;
  $scope.myFunc = function () {
    if ($scope.showMe = !$scope.showMe) {
      var x = document.querySelectorAll("#wrapper #contents-wrapper");
      x[0].style.marginLeft = "89px";
    } else {
      var x = document.querySelectorAll("#wrapper #contents-wrapper");
      x[0].style.marginLeft = "0px";
    }
  }
  $scope.showleads = false;
  $scope.showcreatedlead = function () {
    if ($scope.showleads = !$scope.showleads) {
      var x = document.querySelectorAll("#showcreatemodifiedlead");
      x[0].style.visibility = "visible";
    } else {
      var x = document.querySelectorAll("#showcreatemodifiedlead");
      x[0].style.marginLeft = "hidden";
    }
  }
  $scope.Export = function () {
    $("#tblCustomers")
      .table2excel({
        filename: "Table.xls"
      });
  }
  $scope.init = function () {
    var email = localStorage.getItem("email");
    var token = localStorage.getItem("token");
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/getuserforadmin?Useremail=" + email + "&Token=" + token
        , transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
        , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        $scope.allusers = response.data.data;
      }, function (response) {
        alert("some error occured")
      })
  }
   $scope.init()
  // $scope.fromdate = new Date("8/01/2019");
  // $scope.todate = new Date();
  $scope.getmodified=function(){
    var email = localStorage.getItem("email");
    var token = localStorage.getItem("token");
    var fromdate = localStorage.getItem("fromdate");
    var todate = localStorage.getItem("todate");
    var myuser = localStorage.getItem("owner");
    $http({
        method: "GET"
        , url:"http://103.127.157.28:8443/ReportTotalModifiedDateLead?Useremail=" + email + "&token=" + token + "&fromdate=" + fromdate + "&todate=" + todate+"&Owner="+myuser
        , transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
        , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        if (response.data.status == true) {
         // console.log(response.data.data);
          $scope.file = response.data.data;
          $scope.current_grid = 1;
          $scope.data_limit = 5000;
          $scope.filter_data = $scope.file.length;
          $scope.entire_user = $scope.file.length;
          $scope.page_position = function (page_number) {
            $scope.current_grid = page_number;
          };
          $scope.filter = function () {
            $timeout(function () {
              $scope.filter_data = $scope.searched.length;
            }, 20);
          };
          $scope.sort_with = function (base) {
            $scope.base = base;
            $scope.reverse = !$scope.reverse;
          };
          user = '';
        } else {
          $location.path("/vosoreports");
          swal("Something went wrong!", response.data.message, "warning", { buttons: false, timer: 2000, });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
   $scope.getcreated=function(){
   var email = localStorage.getItem("email");
    var token = localStorage.getItem("token");
    var fromdate = localStorage.getItem("fromdate");
    var todate = localStorage.getItem("todate");
    var myuser = localStorage.getItem("owner");
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/ReportTotalCreatedDateLead?Useremail=" + email + "&token=" + token + "&fromdate=" + fromdate + "&todate=" + todate+"&Owner="+myuser
        , transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
        , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        if (response.data.status == true) {
         // console.log(response.data.data);
          $scope.file = response.data.data;
          $scope.current_grid = 1;
          $scope.data_limit = 5000;
          $scope.filter_data = $scope.file.length;
          $scope.entire_user = $scope.file.length;
          $scope.page_position = function (page_number) {
            $scope.current_grid = page_number;
          };
          $scope.filter = function () {
            $timeout(function () {
              $scope.filter_data = $scope.searched.length;
            }, 20);
          };
          $scope.sort_with = function (base) {
            $scope.base = base;
            $scope.reverse = !$scope.reverse;
          };
          user = '';
        } else {
          $location.path("/vosoreports");
          swal("Something went wrong!", response.data.message, "warning", { buttons: false, timer: 2000, });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
})
