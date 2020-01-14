app.controller('forgotpassword', function($scope, $http, $location, $timeout) {
    $scope.getpass = function() {
        var email = $scope.emails;
        var password = $scope.password;

        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/forgotpassword?Email=" + email + "&Password=" + password,
           
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


            console.log(response.data.status);

            if (response.data.status == true) {
                $location.path("/forgotpassword");
                swal("ThankYou!", response.data.message, "success", {
                    buttons: false,
                    timer: 2000,
                });
            } else if (response.data.status == false) {
                swal("Sorry!", response.data.message, "warning", {
                    buttons: false,
                    timer: 2000,
                });
            } else {
                $location.path("/");
            }
        }, function(response) {
            alert('server error occured')
        })
    }

})