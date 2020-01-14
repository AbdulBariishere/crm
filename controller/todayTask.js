app.directive('loaders', function () {
      return {
        restrict: 'E',
        template: '<div class="loaders"></div>',
        link: function (scope, element, attr) {
              scope.$watch('loaders', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })

app.controller('todayTask', function($scope,$http,$location, $timeout, $window){
    app.filter('beginning_data', function() {
    return function(input, begin) {
        if (input) {
            begin = +begin;
            return input.slice(begin);
        }
        return [];
    }
});
	 // $scope.date = new Date();
      $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    var tick = function() {
        $scope.clock = Date.now() // get the current time
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);
	var useremail =localStorage.getItem("email");
    $scope.email=useremail;
	var token =localStorage.getItem("token");
	 $scope.loaders = true;

	 $http({
			method: "GET",
        url: "http://103.127.157.28:8443/todaystaskforuser?Useremail="+useremail+"&Token="+token+"&Owner="+useremail,
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response){
        $scope.loaders = false;
    	if(response.data.status==true){
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

    	}
    	else{
    		 $location.path( "/todayTask" );
            swal("There is no today Task availave for today!", "success", {
  buttons: false,
  timer: 3000,
});
    	}	 	 
		
	},function(response){
			alert("some error occured")
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
    var date=Date.now()
    console.log(date);

	 
})