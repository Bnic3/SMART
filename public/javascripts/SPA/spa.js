/**
 * Created by john.nana on 6/15/2016.
 */
angular.module('spa',['spa.core',
                        'spa.login',
                        'spa.dashboard'])
    .config(config)
    .service('myIdentityService', myIdentity)
    .value("DOMAIN", "http://localhost:3000");




angular.module('spa.core',['ui.router','ngMaterial']);
angular.module('spa').run(appRun);

//dependency injections
config.$inject=['$mdThemingProvider','$stateProvider','$urlRouterProvider'];
myIdentity.$inject=['$window'];
appRun.$inject=['$rootScope','$state'];



function config($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo',{
            'default': '900', // by default use shade 400 from the pink palette for primary intentions
            'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
            'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
            'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
        })
        .accentPalette('orange');

}//end config

function myIdentity($window){
    var currentUser;
    if(!!$window.bootstrappedUserObject){ currentUser=$window.bootstrappedUserObject; }

    function isAuthenticated(){
        return !!this.currentUser;
    }
    function isAdmin(){
        return this.currentUser.roles && this.currentUser.roles.indexOf('admin')>-1;
    }
    function isSuperAdmin(){
        return this.currentUser.roles && this.currentUser.roles.indexOf('superadmin')>-1;
    }

    return {
        currentUser:currentUser,
        isAuthenticated: isAuthenticated,
        isAdmin:isAdmin,
        isSuper:isSuperAdmin
    }//

}//endMyIdentity

function appRun ($rootScope,$state){
    $rootScope.$on('$routeChangeError', function(evt,current,previous,rejection){
        if(rejection == 'not logged in'){ $state.go('login')}
    })

}




