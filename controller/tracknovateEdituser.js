app.controller('tracknovateEdituser', function ($scope, $http, $location, $timeout, $routeParams) {

  var loginemail = localStorage.getItem("email");
  var token = localStorage.getItem("token");

  $scope.edit_user = function () {

    var firstname = $scope.firstname;
    var lastname = $scope.lastname;
    var contact = $scope.contact;
    var department = $scope.department;

    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/UpdateUser?Useremail=" + $routeParams.email + "&Firstname=" + firstname + "&Lastname=" + lastname +
          "&Department=" + department + "&Contact=" + contact + "&Token=" + token + "&Email=" + loginemail
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
          $location.path("/tracknovateusers");
        } else {
          $location.path("/tracknovateEdituser");
        }
      }, function (response) {
        alert('server error occured')
      })
  }

  $scope.init = function () {

    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/getusertoupdate?Email=" + loginemail + "&Token=" + token + "&Useremail=" + $routeParams.email
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
        console.log(response.data.data[0]);
        $scope.firstname = response.data.data[0].firstname
        $scope.lastname = response.data.data[0].lastname
        $scope.department = response.data.data[0].department
        $scope.contact = response.data.data[0].contact
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
