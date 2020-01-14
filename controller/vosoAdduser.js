app.controller('vosoAdduser', function($scope, $http, $location, $timeout) {

    $scope.save_user = function() {
        var useremail = localStorage.getItem("email");
        var token = localStorage.getItem("token");
        var firstName = $scope.firstName;
        var last_Name = $scope.last_name;
        var email = $scope.email;
        var contact = $scope.contact;
        var department = $scope.department;
        var password = $scope.password;

        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/adduser?Firstname=" + firstName + "&Lastname=" + last_Name + "&Email=" + email + "&Mobile=" + contact + "&Department=" + department + "&Password=" + password + "&Useremail=" + useremail + "&token=" + token,
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
                $location.path("/vosoAdmin");
            } else {
                $location.path("/");
                swal("Something went wrong!", response.data.message, "warning", {
                    buttons: false,
                    timer: 2000,
                });
            }
        }, function(response) {
            alert('server error occured')
        })
    }
})