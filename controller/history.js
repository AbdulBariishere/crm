app.directive('loaderss', function () {
      return {
        restrict: 'E',
        template: '<div class="loaderss"></div>',
        link: function (scope, element, attr) {
              scope.$watch('loaderss', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  })
app.controller('history', function($scope,$http,$location, $timeout, $window, $routeParams){
    app.filter('beginning_data', function() {
    return function(input, begin) {
        if (input) {
            begin = +begin;
            return input.slice(begin);
        }
        return [];
    }
});
    // alert('hello');
var email =localStorage.getItem("email");
$scope.email=email;
var token =localStorage.getItem("token");
 $scope.loaderss = true;
$http({
        method: "GET",
        url: "http://103.127.157.28:8443/getleadlogforuser?Email="+email+"&Token="+token+"&leadnumber="+$routeParams.number,
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(response){
         $scope.loaderss = false;
        //console.log(response.data.data);
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
    }; }
    else{
                    $location.path( "/history" );
            // swal("Something went wrong!", response.data.message,  "warning", { buttons: false, timer: 2000,});
            swal(response.data.message, "error", {buttons: false,timer: 3000,})
    }

    },function(response){
            alert('server error occured') 
        })
$scope.history_lead=function(){
 var leadnumber=$scope.userlead;

   $http({
        method: "GET",
        url: "http://103.127.157.28:8443/getleadlogforuser?Email="+email+"&Token="+token+"&leadnumber="+leadnumber,
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(response){
        //console.log(response.data.data);
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
    }; }
    else{
                    $location.path( "/history" );
            // swal("Something went wrong!", response.data.message,  "warning", { buttons: false, timer: 2000,});
            swal(response.data.message, "error", {buttons: false,timer: 3000,})
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

 
 
         
})