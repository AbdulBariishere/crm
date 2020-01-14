app.controller('leadsummary', function($scope, $http, $location, $timeout, $window) {
    $scope.init = function() {
        var email = localStorage.getItem("email");
        var token = localStorage.getItem("token");

        $http({
                method: "GET",
                url: "http://103.127.157.28:8443/getuserforadmin?Useremail=" + email + "&Token=" + token,
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(function(response) {
                console.log(response);
                $scope.allusers = response.data.data;
            }, function(response) {
                alert("some error occured")
            })
    }

    $scope.init();

    $scope.getusersummary   =   function() {
        var adminemail      =   localStorage.getItem("email");
        var token           =   localStorage.getItem("token");
        var month           =   $scope.month;
        var year            =   $scope.year;
        var user            =   $scope.user.email;
        localStorage.setItem('userforsummary', user);

        $http({
                method: "GET",
                url: "http://103.127.157.28:8443/usersummarycountforcreatedlead?Useremail=" + adminemail + "&token=" + token + 
                "&email=" + user + "&month=" + month + "&year=" + year,
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
           .then(function (response) {
        // if (response.data.status == true) {
        console.log(response.data);
          $scope.file = new Array(response.data);
          //$scope.file = response.data;
          console.log($scope.file);
          $scope.current_grid = 1;
          $scope.data_limit = 500;
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
          
        
      }, function (response) {
        alert('server error occured')
      })

    }

    
    $scope.showMe = true;
    $scope.myFunc = function() {

        if ($scope.showMe = !$scope.showMe) {
            var x = document.querySelectorAll("#wrapper #content-wrapper");
            x[0].style.marginLeft = "89px";
        } else {
            var x = document.querySelectorAll("#wrapper #content-wrapper");
            x[0].style.marginLeft = "0px";
        }

    }


    $scope.getcreatedDate=function(created){
        var createddate     =   created;
        var adminemail      =   localStorage.getItem("email");
        var token           =   localStorage.getItem("token");
        var email           =   localStorage.getItem("userforsummary");
           $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/usersummaryforcreatedlead?Useremail=" + adminemail + "&token=" + token+ "&email="+email+"&createddate="+createddate
        , transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
        , headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
      	//console.log(response.data.data);
         
        if (response.data.Status == true) {
          $scope.file1 =  response.data.data;
           
         
          $scope.current_grid = 1;
          $scope.data_limit = 100;
          $scope.filter_data = $scope.file1.length;
          $scope.entire_user = $scope.file1.length;
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
        } else if (response.data.data == "something went wrong") {
          $location.path("/");
        } else {
          $location.path("/leadsummary");
          swal("Something went wrong!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })    }

          $scope.getmodifiedDate=function(modified){
         
      	var modifieddate   	=   modified;
        var adminemail      =   localStorage.getItem("email");
        var token           =   localStorage.getItem("token");
        var email           =   localStorage.getItem("userforsummary");
           $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/usersummaryformodifiedlead?Useremail=" + adminemail + "&token=" + token+ "&email="+email+"&modifieddate="+modifieddate
        , transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
        , headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function (response) {
      	//console.log(response.data.data);
         
        if (response.data.Status == true) {
          $scope.file1 =  response.data.data;
           
         
          $scope.current_grid = 1;
          $scope.data_limit = 100;
          $scope.filter_data = $scope.file1.length;
          $scope.entire_user = $scope.file1.length;
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
        } else if (response.data.data == "something went wrong") {
          $location.path("/");
        } else {
          $location.path("/leadsummary");
          swal("Something went wrong!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })    }


});