/**
 * Created by john.nana on 6/15/2016.
 */
angular.module('spa',['spa.core',
                        'spa.login',
                        'spa.dashboard'])
    .config(config)
    .value("DOMAIN", "http://localhost.com:3000");




angular.module('spa.core',['ui.router','ngMaterial']);

config.$inject=['$mdThemingProvider','$stateProvider','$urlRouterProvider'];

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

