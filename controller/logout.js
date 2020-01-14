app.controller('logout',function($scope, $http, $location, $timeout, $window){
	 window.confirm('are you sure you want to logout?')
	 

	 	var email =localStorage.getItem("email");
		var token =localStorage.getItem("token");
	
			$http({
				method: "GET",
	 
				 url: "http://103.127.157.28:8443/logout?Email="+email+"&Token="+token,				  
				transformRequest: function(obj) {
					var str = [];
					for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
					return str.join("&");
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(response){
				if(response.data.status==true){
					 localStorage.clear();
					$location.path("/");}
			},function(response){
				alert('server error occured') 
			})
		
     
});