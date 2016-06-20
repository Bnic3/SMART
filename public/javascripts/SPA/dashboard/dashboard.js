/**
 * Created by john.nana on 6/16/2016.
 */
angular.module('spa.dashboard',[])
    .config(dashboardconfig)
    .controller('LoginCtrl', function($scope, $state ){
        var ctrl = this;
        ctrl.status = "dashboard Okay"

    });



dashboardconfig.$inject=['$stateProvider', '$urlRouterProvider'];


function dashboardconfig($stateProvider, $urlRouterProvider){

    //$urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('home',{
            url:"/home",
            template: "<h1>IN<h1>",
            controller: "homeCtrl",
            controllerAs:"ctrl"
        });
        /*.state('page2',{
            url:"/page1",
            template: "<h1>Page2<h1>",
            controller: "AppCtrl",
            controllerAs:"ctrl"
        })*/

}
