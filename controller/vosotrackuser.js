app.controller('vosotrackuser', function($scope, $http, $location, $timeout, $routeParams, $window) {
    var token        = localStorage.getItem("token");
    var emailadmin   = localStorage.getItem("email");
    $scope.useremail = $routeParams.email;
    $http({
            method: "GET",
            url: "http://103.127.157.28:8443/getleadforuser?email=" + emailadmin + "&token=" + token + "&leadowner=" + $routeParams.email,
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
            if (response.data.status == true) {
                $scope.file = response.data.data;
                $scope.current_grid = 1;
                $scope.data_limit = 15;
                $scope.filter_data = $scope.file.length;
                $scope.entire_user = $scope.file.length;

                $scope.page_position = function(page_number) {
                    $scope.current_grid = page_number;
                };
                $scope.filter = function() {
                    $timeout(function() {
                        $scope.filter_data = $scope.searched.length;
                    }, 20);
                };
                $scope.sort_with = function(base) {
                    $scope.base = base;
                    $scope.reverse = !$scope.reverse;
                };

            }
            else {

                $location.path("/");
                swal(response.data.message, "success", {
                    buttons: false,
                    timer: 2000,
                });

            }

        }, function(response) {
            alert('server error occured')
        })
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
    $scope.userinfo = function() {

        var token = localStorage.getItem("token");
        var emailadmin = localStorage.getItem("email");
        $http({
                method: "GET",
                url: "http://103.127.157.28:8443/todaymodification?email=" + emailadmin + "&token=" + token + "&leadowner=" + $routeParams.email,
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
                if (response.data.status == true) {
                    $scope.file = response.data.data;
                    $scope.current_grid = 1;
                    $scope.data_limit = 15;
                    $scope.filter_data = $scope.file.length;
                    $scope.entire_user = $scope.file.length;

                    $scope.page_position = function(page_number) {
                        $scope.current_grid = page_number;
                    };
                    $scope.filter = function() {
                        $timeout(function() {
                            $scope.filter_data = $scope.searched.length;
                        }, 20);
                    };
                    $scope.sort_with = function(base) {
                        $scope.base = base;
                        $scope.reverse = !$scope.reverse;
                    };

                }
                else {

                    $location.path("/vosotrackuser");
                    swal(response.data.message, "success", {
                        buttons: false,
                        timer: 2000,
                    });

                }

            }, function(response) {
                alert('server error occured')
            })
    }
    //****Call Today Task API****
    $scope.Today_task = function() {

        var token = localStorage.getItem("token");
        var emailadmin = localStorage.getItem("email");
        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/todaystaskforuser?Useremail=" + emailadmin + "&Token=" + token + "&Owner=" + $routeParams.email,
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
            //$scope.loaders = false;
            if (response.data.status == true) {
                $scope.file = response.data.data;
                $scope.current_grid = 1;
                $scope.data_limit = 10;
                $scope.filter_data = $scope.file.length;
                $scope.entire_user = $scope.file.length;

                $scope.page_position = function(page_number) {
                    $scope.current_grid = page_number;
                };
                $scope.filter = function() {
                    $timeout(function() {
                        $scope.filter_data = $scope.searched.length;
                    }, 20);
                };
                $scope.sort_with = function(base) {
                    $scope.base = base;
                    $scope.reverse = !$scope.reverse;
                };

            } else {

                swal("There is no today Task availave for today!", "success", {
                    buttons: false,
                    timer: 3000,
                });
            }



        }, function(response) {
            alert("some error occured")
        })
    }
    //*****End Today Task API Calling*****
    //*****Call Total open api****
    $scope.Total_open = function() {
         var token = localStorage.getItem("token");
        var emailadmin = localStorage.getItem("email");
        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/openleadforuser?Useremail=" + emailadmin + "&token=" + token + "&Owner=" + $routeParams.email,
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
            //$scope.loaders = false;
            if (response.data.status == true) {
                $scope.file = response.data.data;
                $scope.current_grid = 1;
                $scope.data_limit = 10;
                $scope.filter_data = $scope.file.length;
                $scope.entire_user = $scope.file.length;

                $scope.page_position = function(page_number) {
                    $scope.current_grid = page_number;
                };
                $scope.filter = function() {
                    $timeout(function() {
                        $scope.filter_data = $scope.searched.length;
                    }, 20);
                };
                $scope.sort_with = function(base) {
                    $scope.base = base;
                    $scope.reverse = !$scope.reverse;
                };

            } else {

                swal("There is no today Task availave for today!", "success", {
                    buttons: false,
                    timer: 3000,
                });
            }



        }, function(response) {
            alert("some error occured")
        })

    }
    //******End Calling of Total open api**********
    //Call CloseWithSuccess api
    $scope.ClosewithSuccess = function() {
         var token = localStorage.getItem("token");
        var emailadmin = localStorage.getItem("email");
        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/closeleadwithsuccessforuser?Useremail=" + emailadmin + "&token=" + token + "&Owner=" + $routeParams.email,
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
           //$scope.loaders = false;
            if (response.data.status == true) {
                $scope.file = response.data.data;
                $scope.current_grid = 1;
                $scope.data_limit = 10;
                $scope.filter_data = $scope.file.length;
                $scope.entire_user = $scope.file.length;

                $scope.page_position = function(page_number) {
                    $scope.current_grid = page_number;
                };
                $scope.filter = function() {
                    $timeout(function() {
                        $scope.filter_data = $scope.searched.length;
                    }, 20);
                };
                $scope.sort_with = function(base) {
                    $scope.base = base;
                    $scope.reverse = !$scope.reverse;
                };

            } else {

                swal("There is no today Task availave for today!", "success", {
                    buttons: false,
                    timer: 3000,
                });
            }



        }, function(response) {
            alert("some error occured")
        })
    }

    //Call closewithout success api
    $scope.ClosewithoutSuccess = function() {
        var token = localStorage.getItem("token");
        var emailadmin = localStorage.getItem("email");
        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/closeleadwithoutsuccessforuser?Useremail=" + emailadmin + "&token=" + token + "&Owner=" + $routeParams.email,
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
            //$scope.loaders = false;
            if (response.data.status == true) {
                $scope.file = response.data.data;
                $scope.current_grid = 1;
                $scope.data_limit = 10;
                $scope.filter_data = $scope.file.length;
                $scope.entire_user = $scope.file.length;

                $scope.page_position = function(page_number) {
                    $scope.current_grid = page_number;
                };
                $scope.filter = function() {
                    $timeout(function() {
                        $scope.filter_data = $scope.searched.length;
                    }, 20);
                };
                $scope.sort_with = function(base) {
                    $scope.base = base;
                    $scope.reverse = !$scope.reverse;
                };

            } else {

                swal("There is no today Task availave for today!", "success", {
                    buttons: false,
                    timer: 3000,
                });
            }



        }, function(response) {
            alert("some error occured")
        })
    }

    //Call pending leads api 
    $scope.Total_pending = function() {
        var token = localStorage.getItem("token");
        var emailadmin = localStorage.getItem("email");
        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/pendingleadforuser?Useremail=" + emailadmin + "&token=" + token + "&Owner=" + $routeParams.email,
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
           // $scope.loaders = false;
            if (response.data.status == true) {
                $scope.file = response.data.data;
                $scope.current_grid = 1;
                $scope.data_limit = 10;
                $scope.filter_data = $scope.file.length;
                $scope.entire_user = $scope.file.length;

                $scope.page_position = function(page_number) {
                    $scope.current_grid = page_number;
                };
                $scope.filter = function() {
                    $timeout(function() {
                        $scope.filter_data = $scope.searched.length;
                    }, 20);
                };
                $scope.sort_with = function(base) {
                    $scope.base = base;
                    $scope.reverse = !$scope.reverse;
                };

            } else {

                swal("Sorry!", response.data.message,  "warning", {
                    buttons: false,
                    timer: 3000,
                });
            }



        }, function(response) {
            alert("some error occured")
        })
    }
       $scope.init=function(){
        $http({
            method: "GET",
        url: "http://103.127.157.28:8443/totalleadcountforuser?Useremail="+emailadmin+"&token="+token+"&Owner="+$routeParams.email,
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
             console.log(response.data);
             $scope.today_task=response.data.TodaysLead[0].count
             $scope.TotalLead=response.data.TotalLead[0].count
             $scope.TodaysModification=response.data.TodaysModification[0].count
             $scope.TotalOpenStatusLeads=response.data.TotalOpenStatusLeads[0].count
             $scope.TotalClosewithSuccessCount=response.data.TotalClosewithSuccessCount[0].count
             $scope.TotalClosewitoutSuccessCount=response.data.TotalClosewitoutSuccessCount[0].count
             $scope.TotalPendingLeadsCount=response.data.TotalPendingLeadsCount[0].count
        
            
        
             
              
        },function(response){
            alert("some error occured")
        })
}
$scope.init()
});