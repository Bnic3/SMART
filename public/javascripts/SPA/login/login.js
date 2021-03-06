/**
 * Created by john.nana on 6/17/2016.
 */
angular.module('spa.login',[])
    .config(loginConfig)
    .service('LoginService',loginService)
    .controller('loginCtrl',loginCtrl);



//dependency injections
loginConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
loginCtrl.$inject=["$scope", "$state","$http","LoginService","myIdentityService"];
loginService.$inject= ["$http","DOMAIN"];

function loginConfig($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login',{
            url:"/login",
            templateUrl: "/partials/login-partial.html",
            controller: "loginCtrl",
            controllerAs:"ctrl"
        })


}

function loginCtrl($scope, $state,$http, LoginService,myIdentityService){
    var ctrl = this;
    ctrl.loginUser= {} //form object

    /*console.log($scope);*/

    ctrl.login = function(user){

        return LoginService.login(user)
            .success(function(result){
                myIdentityService.currentUser= result.user;
                if (result.notifyType !== "error"){
                    $state.go("home");
                }
                toastr[result.notifyType](result.message);})


    }
    ctrl.testing= function(user){
        console.log(user);
        toastr.success("HR has been notified")
    }

}

function loginService($http,DOMAIN){
    this.login=function(user){
                return $http.post(DOMAIN+"/login",{username: user.name, password:user.password});
            }


}

