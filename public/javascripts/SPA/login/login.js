/**
 * Created by john.nana on 6/17/2016.
 */
angular.module('spa.login',[])
    .config(loginConfig)
    .factory('LoginService',loginService)
    .controller('loginCtrl',loginCtrl);



//dependency injections
loginConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
loginCtrl.$inject=["$scope", "$state","LoginService"];
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

function loginCtrl($scope, $state, LoginService){
    var ctrl = this;
    ctrl.loginUser= {} //form object

    console.log($scope);

    ctrl.login = function(user){
        //callLogin service
        console.log("me");
        /*console.log(LoginService.login(user));*/
        return LoginService.login(user)
            .then(function(result){
                $state.go("/home");
                console.log(result.user)});

    }

}

function loginService($http,DOMAIN){
    function login(user){
        return $http.post(DOMAIN+"/login",{username: user.email, password:user.password});
    }
    return{login:login}
   /* this.name= function(){
        return "john";
    }*/

}

