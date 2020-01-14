app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                onSelect: function (date) {
                    scope.date = date;
                     
                    scope.$apply();
                }
            });
        }
    };
});
app.directive('jqdatepicker2', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'mm/dd/yy',
                onSelect: function (date2) {
                    scope.date2 = date2;
                    scope.$apply();
                }
            });
        }
    };
});
app.controller('getreports',  function($scope, $http, $location, $timeout, $window){

	app.filter('beginning_data', function() {
    return function(input, begin) {
        if (input) {
            begin = +begin;
            return input.slice(begin);
        }
        return [];
    }
});
    // $scope.loading = true;

$scope.getreports_user=function(){
var email =localStorage.getItem("email");
$scope.email=email;
var token =localStorage.getItem("token");   
var fromdate=$scope.date;
var todate=$scope.date2	; 

$http({
		method: "GET",
		url:"http://103.127.157.28:8443/reporttotalleadsforuser?Useremail="+email+"&token="+token+"&fromdate="+fromdate+"&todate="+todate+"&Owner="+email,
		transformRequest: function(obj) {
	        var str = [];
	        for(var p in obj)
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        return str.join("&");
	    },
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.then(function(response){
        // $scope.loading = false;
		//console.log(response.data.status);
		if(response.data.status==true){
		console.log(response.data.data);
		$scope.file = response.data.data;
        $scope.current_grid = 1;
        $scope.data_limit = 100;
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
    user='';
		}
		else{
			$location.path( "/getreports" );
			swal("Something went wrong!", response.data.message,  "warning", { buttons: false, timer: 2000,});
             
		}
   
    
	},function(response){
			alert('server error occured') 
		})
	 }

    	$scope.showMe = true;

    $scope.myFunc = function() {
       
        if ( $scope.showMe = !$scope.showMe) {
            var x = document.querySelectorAll("#wrapper #content-wrapper");
         x[0].style.marginLeft = "89px";
        }
        else{
              var x = document.querySelectorAll("#wrapper #content-wrapper");
            x[0].style.marginLeft = "0px"; 
        }
        
    }

	 $scope.Export = function () {

                $("#tblCustomers").table2excel({
                    filename: "Table.xls"
                });
            }

            $scope.init=function(){
            	var email =localStorage.getItem("email");
				var token =localStorage.getItem("token"); 
        $http({
        method: "GET",
        url: "http://103.127.157.28:8443/totaluser?Useremail="+email+"&token="+token,
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
             //console.log(response.data.data);
             $scope.allusers=response.data.data;
             
                   
        },function(response){
            alert("some error occured")
        })
            }

var email =localStorage.getItem("email");
$scope.email=email;     
})