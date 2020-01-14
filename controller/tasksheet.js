app.directive('loading', function () {
      return {
        restrict: 'E',
        template: '<div class="loading"></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })

app.controller('tasksheet', function($scope,$http,$location, $timeout, $window){
    app.filter('beginning_data', function() {
    return function(input, begin) {
        if (input) {
            begin = +begin;
            return input.slice(begin);
        }
        return [];
    }
});
    $scope.loading = true;
var email =localStorage.getItem("email");
var token =localStorage.getItem("token");
$http({
		method: "GET",
		url: "http://103.127.157.28:8443/getallleads?Email="+email+"&Token="+token,
		transformRequest: function(obj) {
	        var str = [];
	        for(var p in obj)
	        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        return str.join("&");
	    },
	    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.then(function(response){
        $scope.loading = false;
		console.log(response.data.status);
		if(response.data.status==true){
		console.log(response.data.data);
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
		else{
			$location.path( "/" );
			swal("Something went wrong!", response.data.message,  "warning", { buttons: false, timer: 2000,});
             
		}
   
    
	},function(response){
			alert('server error occured') 
		})
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

$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});
	 
})