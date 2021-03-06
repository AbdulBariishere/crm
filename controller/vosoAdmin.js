 

app.controller('vosoAdmin', function ($scope, $http, $location, $timeout, $window) {
 $scope.reloaddashboard=function(){
        
        window.location.reload();
    }
    $scope.init = function () {
    var Department='voso Sales';
     var email = localStorage.getItem("email");
  $scope.email = email;
  var token = localStorage.getItem("token");
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/totalleadcountforadmin?Useremail=" + email + "&token=" + token+"&Department="+Department
        , transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
        , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        console.log(response.data);
        $scope.today_task = response.data.TodaysLead[0].count
        $scope.TotalLead = response.data.TotalLead[0].count
        $scope.TodaysModification = response.data.TodaysModification[0].count
        $scope.TotalOpenStatusLeads = response.data.TotalOpenStatusLeads[0].count
        $scope.TotalClosewithSuccessCount = response.data.TotalClosewithSuccessCount[0].count
        $scope.TotalClosewitoutSuccessCount = response.data.TotalClosewitoutSuccessCount[0].count
        $scope.TotalPendingLeadsCount = response.data.TotalPendingLeadsCount[0].count
      }, function (response) {
        alert("some error occured")
      })
  }
  $scope.init()
  app.filter('beginning_data', function () {
    return function (input, begin) {
      if (input) {
        begin = +begin;
        return input.slice(begin);
      }
      return [];
    }
  });

  // $scope.loader = true;
  var email = localStorage.getItem("email");
  $scope.email = email;
  var token = localStorage.getItem("token");

  $http({
      method: "GET"
      , url: "http://103.127.157.28:8443/todaystaskforadmin?Email=" + email + "&Token=" + token
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
         var todaTaskdata = [];
          angular.forEach( response.data.data, function (value, key) { 
              if (value.userDepartment == 'voso sales') {
                todaTaskdata.push(value); 
               // console.log(value)
              }
            });   

        $scope.file = todaTaskdata;
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
        $location.path("/vosoAdmin");
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
        , url: "http://103.127.157.28:8443/getallleads?Email=" + email + "&Token=" + token
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
        // console.log(response.data);
        if (response.data.status == true) {
          var totalLeads = [];
          angular.forEach( response.data.data, function (value, key) { 
              if (value.userDepartment == 'voso sales') {
                totalLeads.push(value); 
               // console.log(value)
              }
            });
          $scope.file=totalLeads;
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
          $location.path("/vosoAdmin");
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
        , url: "http://103.127.157.28:8443/todaymodificationforall?email=" + email + "&token=" + token
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
           var todayModifed = [];
          angular.forEach( response.data.data, function (value, key) { 
              if (value.userDepartment == 'voso sales') {
                todayModifed.push(value); 
               // console.log(value)
              }
            });
          $scope.file = todayModifed;
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
          $location.path("/vosoAdmin");
          swal("Something went wrong!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
  $scope.open_leads = function () {
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/openleadforall?Useremail=" + email + "&token=" + token
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
          var openLeadsData = [];
          angular.forEach( response.data.data, function (value, key) { 
              if (value.userDepartment == 'voso sales') {
                openLeadsData.push(value); 
               // console.log(value)
              }
            });   

          //console.log(openLeadsData);
          $scope.file = openLeadsData;
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
          $location.path("/vosoAdmin");
          swal("Something went wrong!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
  $scope.closewithsuccess = function () {
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/closeleadwithsuccessforall?Useremail=" + email + "&token=" + token
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
          var closewithSuccessData=[];
          angular.forEach( response.data.data, function (value, key) { 
              if (value.userDepartment == 'voso sales') {
                closewithSuccessData.push(value); 
               // console.log(value)
              }
            });   

          $scope.file = closewithSuccessData;
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
          $location.path("/vosoAdmin");
          swal("Something went wrong!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
  $scope.closewithoutsuccess = function () {
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/closeleadwithoutsuccessforall?Useremail=" + email + "&token=" + token
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
           var closewithoutsucessData=[];
          angular.forEach( response.data.data, function (value, key) { 
              if (value.userDepartment == 'voso sales') {
                closewithoutsucessData.push(value); 
               // console.log(value)
              }
            });   
          $scope.file = closewithoutsucessData;
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
          $location.path("/vosoAdmin");
          swal("Something went wrong!", response.data.message, "warning", {
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
        , url: "http://103.127.157.28:8443/pendingleadforall?Useremail=" + email + "&token=" + token
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
          var pendinleadData=[];
           angular.forEach( response.data.data, function (value, key) { 
              if (value.userDepartment == 'voso sales') {
                pendinleadData.push(value); 
               // console.log(value)
              }
            }); 
          $scope.file = pendinleadData;
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
          $location.path("/vosoAdmin");
          swal("Something went wrong!", response.data.message, "warning", {
            buttons: false
            , timer: 2000
          , });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
  $scope.todayTask_admin = function () {
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/todaystaskforadmin?Email=" + email + "&Token=" + token
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
        // console.log(response.data);

        if (response.data.status == true) {
           var todaTaskdata = [];
          angular.forEach( response.data.data, function (value, key) { 
              if (value.userDepartment == 'voso sales') {
                todaTaskdata.push(value); 
               // console.log(value)
              }
            });   

          $scope.file = todaTaskdata;
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
          $location.path("/vosoAdmin");
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
                    $location.path("/");
                    swal(response.data.message, "warning", {
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
       
           
     

    }
  //Get total Count of all api
  
})
