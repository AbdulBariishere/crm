app.controller('editStatus', function($scope, $http, $location, $timeout, $routeParams) {
    

    

    $scope.update_lead = function() {
        var email = localStorage.getItem("email");
        var description = $scope.description;
        var departmentStatus = $scope.lead_department_status;
        var next_action = $scope.next_action.toLocaleDateString();;
        var nextAction_date = next_action.toString();
        var stage = $scope.sizeof_stages;

        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/updateleadforsupport?DepartmentStatus="+departmentStatus+"&Stage="+stage+"&Description="+description+"&Nextaction="+nextAction_date+"&useremail="+email+"&leadnumber="+$routeParams.number,
                 
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

                $location.path("/supportDashboard");
            } else {
                $location.path("/editStatus");
            }
        }, function(response) {
            alert('server error occured')
        })

    }
    $scope.init = function() {
        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/getleadtoupdateforsupport?Number=" + $routeParams.number,
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
          // console.log(response);

             $scope.description = response.data[0].description
             $scope.lead_department_status = response.data[0].departmentStatus
             $scope.next_action = new Date (response.data[0].nextActionDate);
             $scope.sizeof_stages = response.data[0].stage
             


        }, function(response) {
            alert("some error occured")
        })
    }
    $scope.init()
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
})