
app.controller('supportDashboard', function ($scope, $http, $location, $timeout, $window) {
 $scope.reloaddashboard=function(){
        
        window.location.reload();
    }
  app.filter('beginning_data', function () {
    return function (input, begin) {
      if (input) {
        begin = +begin;
        return input.slice(begin);
      }
      return [];
    }
  });

  //$scope.loader = true;
  var email = localStorage.getItem("email");
  $scope.email = email;
  var token = localStorage.getItem("token");

  $http({
      method: "GET"
      , url: "http://103.127.157.28:8443/todaysleadsforsupport?Useremail=" + email + "&token=" + token
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
    	
     // $scope.loader = false;
      if (response.data.status == true) {
        $scope.file = response.data.data;
        $scope.current_grid = 1;
        $scope.data_limit = 100;
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
      } else if (response.data.data == "something went wrong") {
        swal("Sorry!", "There is no Task available for Today", "warning", {
          buttons: false
          , timer: 2000
        , });
      } else {
        $location.path("/supportDashboard");
        swal("Something went wrong!", response.data.message, "warning", {
          buttons: false
          , timer: 2000
        , });
      }
    }, function (response) {
      alert('server error occured')
    })
  $scope.All_leads = function () {
   
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/totalleadforsupportteam?Useremail=" + email + "&token=" + token
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
        console.log(response.data);
        if (response.data.status == true) {
          $scope.file = response.data.data;
          $scope.current_grid = 1;
          $scope.data_limit = 100;
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
        } else if (response.data.data == "something went wrong") {
          $location.path("/");
        } else {
          $location.path("/supportDashboard");
          swal("Something went wrong!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
  $scope.Today_Modified = function () {
 
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/todaysmodificationleadsforsupport?Useremail=" + email + "&token=" + token
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
        if (response.data.status == true) {
          $scope.file = response.data.data;
          $scope.current_grid = 1;
          $scope.data_limit = 100;
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
        } else if (response.data.message == "you don't have any lead yet!") {
          swal("Sorry!", "There is no today Modification are available", "warning", {
            buttons: false
            , timer: 4000
          , });
        } else {
          $location.path("/supportDashboard");
          swal("Something went wrong!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
  $scope.converted_clients = function () {
  	 
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/convertedclients?Useremail=" + email + "&token=" + token
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
        if (response.data.status == true) {
          $scope.file = response.data.data;
          $scope.current_grid = 1;
          $scope.data_limit = 100;
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
        } else if (response.data.data == "something went wrong") {
          $location.path("/");
        } else {
          $location.path("/supportDashboard");
          swal("don't worry!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
   
  $scope.pending_leads = function () {
   
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/pendingleadsforsupportteam?Useremail=" + email + "&token=" + token
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
        if (response.data.status == true) {
          $scope.file = response.data.data;
          $scope.current_grid = 1;
          $scope.data_limit = 100;
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
        } else if (response.data.data == "something went wrong") {
          $location.path("/");
        } else {
          $location.path("/supportDashboard");
          swal("dont' worry!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
  $scope.todayTask_support = function () {
  
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/todaysleadsforsupport?Useremail=" + email + "&token=" + token
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
        console.log(response.data);
        if (response.data.status == true) {
          $scope.file = response.data.data;
          $scope.current_grid = 1;
          $scope.data_limit = 100;
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
        } else if (response.data.data == "something went wrong") {
          swal("Sorry!", "There is no Task available for Today", "warning", {
            buttons: false
            , timer: 4000
          , });
        } else {
          $location.path("/adminDashboard");
          swal("Something went wrong!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
  $scope.showMe = true;
  $scope.myFunc = function () {
    if ($scope.showMe = !$scope.showMe) {
      var x = document.querySelectorAll("#wrapper #content-wrapper");
      x[0].style.marginLeft = "89px";
    } else {
      var x = document.querySelectorAll("#wrapper #content-wrapper");
      x[0].style.marginLeft = "0px";
    }
  }
  $scope.Logout = function() {
    
                         swal({
                  title: "Are you sure?",
                  text: "You Want to Logout!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                })
                .then((willDelete) => {
                  if (willDelete) {
                     $http({
                method: "GET",

                url: "http://103.127.157.28:8443/logout?Email=" + email + "&Token=" + token,
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(response) {
                if (response.data.status == true) {
                    localStorage.clear();
                    $location.path("/");
                    swal("You are Logged OUT!", {
                      icon: "success",
                      timer: 2000,
                    });
                } else {
                    $location.path("/supportDashboard");
                    swal(response.data.message, "success", {
                        buttons: false,
                        timer: 2000,
                    });
                }
            }, function(response) {
                alert('server error occured')
            })

                    
                  } 
                  else {
                    swal("Your are Still Login!",{timer: 1000,});
                  }
                });
       
           
       // else {
       //      $location.path("/userDashboard");
       //      swal(response.data.message, "success", {
       //          buttons: false,
       //          timer: 2000,
       //      });


       //  }

    }
  // //Get total Count of all api
  $scope.init = function () {
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/totalleadcountforsupport?Useremail=" + email + "&token=" + token
        , transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
        , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
       
        //console.log(response.data);
        $scope.today_task = response.data.TodaysLead[0].count
        $scope.TotalLead = response.data.TotalLead[0].count
        $scope.TodaysModification = response.data.TodaysModification[0].count
        $scope.TotalConvertedClients = response.data.TotalConvertedClientsCount[0].count
        $scope.TotalPendingLeadsCount = response.data.TotalPendingLeadsCount[0].count
      }, function (response) {
        alert("some error occured")
      })
  }
  $scope.init()
  $scope.showMe = true;
  $scope.myFunc = function () {
    if ($scope.showMe = !$scope.showMe) {
      var x = document.querySelectorAll("#wrapper #content-wrapper");
      x[0].style.marginLeft = "89px";
    } else {
      var x = document.querySelectorAll("#wrapper #content-wrapper");
      x[0].style.marginLeft = "0px";
    }
  }
})
