 
app.controller('leadManagement', function($scope,$http,$location, $timeout){

$http({
        method: "GET",
        url: "http://103.127.157.28:8443/getallleads",
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(function(response){
        console.log(response.data);
        $scope.users = response.data;
        $timeout(function(){
            $data = $('#users').DataTable({
                "scrollY" : "60vh",
            });
            // $('.dataTables_length').addClass('bs-select');
        })
    },function(response){
            alert('server error occured') 
        })
    // angular.element(document).ready( function () {
    //      dTable = $('#dataTable')
    //      dTable.DataTable();
    //  });
     
})