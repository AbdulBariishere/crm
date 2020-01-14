var app = angular.module("crm", ["ngRoute", "ngAnimate", 'ui.bootstrap']);

app.config(function($routeProvider,$locationProvider) {


  $routeProvider
  .when("/", {
    templateUrl : "page/login.html",
    controller: "login"
  })
   .when("/adminDashboard", {
     templateUrl : "admin/admin_dashboard.html",
    controller: "adminDashboard"
   })
     .when("/AllUsers/:email", {
     templateUrl : "admin/allUsers.html",
    controller: "AllUsers"
   })
     .when("/AllUsers", {
     templateUrl : "admin/allUsers.html",
    controller: "AllUsers"
   })
   .when("/userDashboard", {
     templateUrl : "user/user_dashboard.html",
    controller: "userDashboard"
   })
   .when("/users", {
     templateUrl : "admin/create_user.html",
    controller: "users"
   })
   .when("/lead", {
     templateUrl : "user/create_lead.html",
    controller: "lead"
   })

   .when("/registration", {
     templateUrl : "page/registration.html",
    controller: "registration"
   })
   .when("/forgotpassword", {
     templateUrl : "page/forgotpassword.html",
    controller: "forgotpassword"
   })
    .when("/leadManagement", {
     templateUrl : "page/Leadmanagement.html",
    controller: "leadManagement"
   })
     .when("/manageUser", {
     templateUrl : "page/Manageuser.html",
    controller: "manageUser"
   })

      .when("/reports", {
     templateUrl : "admin/reports.html",
    controller: "reports"
   })
      .when("/reports/:number", {
     templateUrl : "admin/reports.html",
    controller: "reports"
   })
       .when("/tasksheet", {
     templateUrl : "admin/tasksheet.html",
    controller: "tasksheet"
   })
         .when("/profile", {
     templateUrl : "user/profile.html",
    controller: "profile"
   })
           .when("/todayTask", {
     templateUrl : "user/today_task.html",
    controller: "todayTask"
   })

           .when("/edittask/:lead_number", {
     templateUrl : "user/edit_task.html",
    controller: "edittask"
   })
           .when("/datatablecontorller", {
     templateUrl : "page/datatables.html",
    controller: "datatablecontorller"
   })

                 .when("/edit-user/:email", {
     templateUrl : "admin/edit_user.html",
    controller: "edit-user"
   })


   .when("/history", {
     templateUrl : "user/user_reports.html",
    controller: "history"
   })


   .when("/history/:number", {
     templateUrl : "user/user_reports.html",
    controller: "history"
   })
   .when("/userinfo/:email", {
     templateUrl : "admin/user_info.html",
    controller: "userinfo"
   })
     .when("/today-modification", {
     templateUrl : "page/today-modification.html",
    controller: "today-modification"
   })
     .when("/myreports", {
     templateUrl : "admin/admin_reports.html",
    controller: "myreports"
   })
     .when("/getreports", {
     templateUrl : "user/User_report.html",
    controller: "getreports"
   })
     .when("/upload", {
     templateUrl : "user/user_upload.html",
    controller: "upload"
   })

           .when("/logout", {
     templateUrl : "page/login.html",
    controller: "logout"
   })
           .when("/supportDashboard", {
     templateUrl : "admin/support.html",
    controller: "supportDashboard"
   })
                 .when("/summaryuser", {
     templateUrl : "admin/Usersummary.html",
    controller: "summaryuser"
   })

           .when("/editStatus/:number", {
     templateUrl : "admin/editStatus.html",
    controller: "editStatus"
   })
            
          
            .when("/tracknovateAdmin", {
     templateUrl : "tracknovate_admin/Dashboard.html",
    controller: "tracknovateAdmin"
   })

           .when("/tracknovateusers", {
     templateUrl : "tracknovate_admin/allusers.html",
    controller: "tracknovateusers"
   })
            .when("/tracknovateAdduser", {
     templateUrl : "tracknovate_admin/adduser.html",
    controller: "tracknovateAdduser"
   })
            .when("/tracknovateEdituser/:email", {
     templateUrl : "tracknovate_admin/edituser.html",
    controller: "tracknovateEdituser"
   })
            .when("/tracknovatereports", {
     templateUrl : "tracknovate_admin/reports.html",
    controller: "tracknovatereports"
   })
             .when("/trackuser/:email", {
     templateUrl : "tracknovate_admin/trackuser.html",
    controller: "trackuser"
   })
               .when("/tracklead/:number", {
     templateUrl : "tracknovate_admin/tracklead.html",
    controller: "tracklead"
   })

    .when("/usersummary", {
     templateUrl : "tracknovate_admin/summary.html", 
    controller: "usersummary"
   })
      .when("/createdleadDetails/:createddate", {
     templateUrl : "tracknovate_admin/summarydetails.html",
    controller: "createdleadDetails"
   })
      .when("/modifiedleadDetails/:[2]", {
     templateUrl : "tracknovate_admin/summarydetails2.html",
    controller: "modifiedleadDetails"
   })




               // Voso routing
                   .when("/vosoAdmin", {
     templateUrl : "voso_admin/Dashboard.html",
    controller: "vosoAdmin"
   })

           .when("/vosousers", {
     templateUrl : "voso_admin/allusers.html",
    controller: "vosousers"
   })
         
            .when("/vosoAdduser", {
     templateUrl : "voso_admin/adduser.html",
    controller: "vosoAdduser"
   })
            .when("/vosoEdituser/:email", {
     templateUrl : " voso_admin/edituser.html",
    controller: "vosoEdituser"
   })
            .when("/vosoreports", {
     templateUrl : "voso_admin/reports.html",
    controller: "vosoreports"
   })
             .when("/vosotrackuser/:email", {
     templateUrl : "voso_admin/trackuser.html",
    controller: "vosotrackuser"
   })
               .when("/vosotracklead/:number", {
     templateUrl : "voso_admin/tracklead.html",
    controller: "vosotracklead"
   })
                .when("/vosoSupportDashboard", {
     templateUrl : "voso_admin/vosoSupport.html",
    controller: "vosoSupportDashboard"
   }) 
   .when("/leadsummary", {
    templateUrl : "voso_admin/summary.html",
   controller: "leadsummary"
  })

  

           .otherwise({
            // templateUrl: "page/notfound.html"
            redirectTo: '/'
           })
      
     $locationProvider.html5Mode(true);


});