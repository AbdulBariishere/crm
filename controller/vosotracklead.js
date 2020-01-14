app.filter('beginning_data', function () {
  return function (input, begin) {
    if (input) {
      begin = +begin;
      return input.slice(begin);
    }
    return [];
  }
});

app.controller('vosotracklead', function ($scope, $http, $location, $timeout, $routeParams) {
  var useremail = localStorage.getItem("email");
  var token = localStorage.getItem("token");
   
  $http({
      method: "GET"
      , url: "http://103.127.157.28:8443/getleadlogforadmin?Email=" + useremail + "&Token=" + token + "&leadnumber=" + $routeParams.number
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
        $scope.file = response.data.data;
        $scope.current_grid = 1;
        $scope.data_limit = 50;
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
      } else {
        $location.path("/vosotracklead");
        swal(response.data.message, "error", { buttons: false, timer: 3000, })
      }
    }, function (response) {
      alert('server error occured')
    })

  $scope.search_leads = function () {
    var lead = $scope.mylead;
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/getleadlogforadmin?Email=" + useremail + "&Token=" + token + "&leadnumber=" + lead
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
          $scope.file = response.data.data;
          $scope.current_grid = 1;
          $scope.data_limit = 50;
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
        } else {
          $location.path("/reports");
          swal(response.data.message, "error", { buttons: false, timer: 3000, })
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
})
