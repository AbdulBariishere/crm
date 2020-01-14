 app.controller('AllUsers', function ($scope, $http, $location, $timeout, $window, $routeParams) {
  app.filter('beginning_data', function () {
    return function (input, begin) {
      if (input) {
        begin = +begin;
        return input.slice(begin);
      }
      return [];
    }
  });

  var email = localStorage.getItem("email");
  $scope.email = email;
  var token = localStorage.getItem("token");

  $http({
      method: "GET"
      , url: "http://103.127.157.28:8443/getallusers?Email=" + email + "&Token=" + token
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
        $scope.data_limit = 20;
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
        $location.path("/AllUsers");
        swal("Something went wrong!", response.data.message, "warning", {
          buttons: false
          , timer: 2000
        , });
      }
    }, function (response) {
      alert('server error occured')
    })
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
  $scope.Logout = function () {
    var r = confirm("Are you sure you want to logout!");
    if (r == true) {
      $scope.loader = true;
      $http({
          method: "GET"
          , url: "http://103.127.157.28:8443/logout?Email=" + email + "&Token=" + token
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
          $scope.loader = false;
          if (response.data.status == true) {
            localStorage.clear();
            $location.path("/");
          } else {
            $location.path("/AllUsers");
            swal(response.data.message, "success", {
              buttons: false
              , timer: 2000
            , });
          }
        }, function (response) {
          alert('server error occured')
        })
    } else {
      $location.path("/AllUsers");
      swal(response.data.message, "success", {
        buttons: false
        , timer: 2000
      , });
    }
  }
  // $http({
  //       method: "GET"
  //       , url: "http://103.127.157.28:8443/deletuser?Email=" + $routeParams.email + "&Useremail=" + email + "&Token=" + token
  //       , transformRequest: function (obj) {
  //         var str = [];
  //         for (var p in obj)
  //           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  //         return str.join("&");
  //       }
  //       , headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  //     .then(function (response) {
  //       if (response.data.status == true) {
  //         $location.path("/AllUsers");
  //       } else {
  //         $location.path("/AllUsers");
  //       }
  //     }, function (response) {
  //       alert('server error occured')
  //     })
  
})
