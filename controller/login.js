app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.controller('login', function ($scope, $http, $location, $timeout, $window) {
  $scope.login_check = function () {
    if (($scope.username == '') || ($scope.password == '')) {
      return;
    }
    var email = $scope.username;
    var password = $scope.password;
    $http({
        method: "GET"
        , url: "http://103.127.157.28:8443/login?Email=" + email + "&Password=" + password
        , transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        }
        , headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response) {
        if (response.data.Status == true) {

          if (response.data.Data[0]['Email'] == 'abdul@gmail.com' || response.data.Data[0]['Email'] == 'kamini.voso@gmail.com' || response.data.Data[0]['Email'] == 'mahak.voso@gmail.com') {
            localStorage.setItem("email", response.data.Data[0]['Email']);
            localStorage.setItem("token", response.data.Data[0]['Token']);
            
            $location.path("/adminDashboard");
            swal(response.data.Data[0]['Email'], response.data.message, "success", { buttons: false, timer: 2000, });
            
          } else if (response.data.Data[0]['Email'] == 'sumit@gmail.com') {
            localStorage.setItem("email", response.data.Data[0]['Email']);
            localStorage.setItem("token", response.data.Data[0]['Token']);
            $location.path("/tracknovateAdmin");
            swal(response.data.Data[0]['Email'], response.data.message, "success", { buttons: false, timer: 2000, });
          }
          else if (response.data.Data[0]['Email'] == 'jitendrasoni@tracknovate.com') {
            localStorage.setItem("email", response.data.Data[0]['Email']);
            localStorage.setItem("token", response.data.Data[0]['Token']);
            $location.path("/vosoAdmin");
            swal(response.data.Data[0]['Email'], response.data.message, "success", { buttons: false, timer: 2000, });
          }
          else{
            localStorage.setItem("email", response.data.Data[0]['Email']);
            localStorage.setItem("token", response.data.Data[0]['Token']);
            $location.path("/userDashboard");
          }
        } 



        else {
          swal("Something went wrong!", response.data.message, "warning", { buttons: false, timer: 2000, });
        }
      }, function (response) {
        alert('server error occured')
      })
  }
})
