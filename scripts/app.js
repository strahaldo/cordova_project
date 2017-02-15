
angular.module('app', [
  'ngRoute',
  'onsen',
  'ui.router',
  'FBAngular',
  'ui.bootstrap',
  'plannerAdmin',
  'dcbImgFallback'
]);

var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider, $compileProvider) {

  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|mailto|cdvfile|chrome-extension):/);

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('menu', {
      abstract: 'true'
    })
    .state('menu.home', {
      url: '/home',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.app.menu.setMainPage('templates/home.html', {closeMenu: true});
      }],
    })
    .state('menu.saba', {
      url: '/saba',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.app.menu.setMainPage('templates/menu/sabamestari.html', {closeMenu: true});
      }]
    })
    .state('menu.piste', {
      url: '/piste',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.app.menu.setMainPage('templates/menu/pistemestari.html', {closeMenu: true});
      }]
    })
    .state('menu.johda', {
      url: '/johda',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.app.menu.setMainPage('templates/menu/johdanto.html', {closeMenu: true});
      }]
    })
  /*  .state('menu.planner', {
      url: '/planner',
        controller : 'adminCtrl',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.app.menu.setMainPage('templates/menu/planner.html', {closeMenu: true});
      }]
    })
      .state('menu.planner.plan', {
        url: '/plan',
        onEnter: ['$rootScope', function($rootScope) {
          $rootScope.app.menu.setMainPage('templates/planView.html', {closeMenu: true});
        }]
      })
*/
    .state('piste', {
      abstract: true
    })
    .state('piste.home', {
      parent: 'piste',
      url: '/piste'
    })
    .state('piste.home.link', {
      url: '/link',
      onEnter: ['$rootScope', function($rootScope) {
        navigator.startApp.start("fi.metropolia.meng.mjk.pistemestari", function(message) { /* success */
          console.log(message); // => OK
        }, 
        function(error) { /* error */
          console.log(error);
          install();
          function install() {
            var r = confirm("Haluatko asentaa Pistemestari-sovelluksen?");
            if (r == true) {
              cordova.plugins.market.open('fi.metropolia.meng.mjk.pistemestari');
            } else {

            }
          }
        });
        $rootScope.myNavigator.popPage();
      }]
    })
    .state('piste.home.sec', {
      parent: 'piste.home',
      url: '/piste/:pId',
      onEnter: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
        $rootScope.myNavigator.pushPage('templates/pisteSecView.html', {'pId': $stateParams.pId});
      }]
    })
    .state('piste.home.sec.card', {
      parent: 'piste.home.sec',
      url: '/piste/:cId',
      onEnter: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
        $rootScope.myNavigator.pushPage('templates/pisteCardView.html', {'cId': $stateParams.cId});
      }]
    })


    .state('saba', {
      abstract: true
    })
    .state('saba.home', {
      parent: 'saba',
      url: '/saba',
    })
    .state('saba.home.sec', {
      parent: 'saba.home',
      url: '/sec/:sId',
      onEnter: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
        $rootScope.myNavigator.pushPage('templates/sectionView.html', {'sId': $stateParams.sId});
      }]
    })
    .state('saba.home.sec.card', {
      parent: 'saba.home.sec',
      url: '/card/:cId',
      onEnter: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
        $rootScope.myNavigator.pushPage('templates/cardView.html', {'cId': $stateParams.cId});
      }]
    })

    .state('johda', {
      abstract: true
    })
    .state('johda.home', {
      parent: 'johda',
      url: '/johda',
    })
    .state('johda.home.part', {
      parent: 'johda.home',
      url: '/part',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.myNavigator.pushPage('templates/johSec.html');
      }]
    })
    .state('johda.home.partPiste', {
      parent: 'johda.home',
      url: '/partPiste',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.myNavigator.pushPage('templates/johPisteSec.html');
      }]
    })

    .state('johda.home.partPiste.terve', {
      parent: 'johda.home.partPiste',
      url: '/terve',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.myNavigator.pushPage('templates/ohjeita_ja_vinkkeja/terve.html');
      }]
    })
    .state('johda.home.partPiste.kunto', {
      parent: 'johda.home.partPiste',
      url: '/kunto',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.myNavigator.pushPage('templates/ohjeita_ja_vinkkeja/kunto.html');
      }]
    })
    .state('johda.home.partPiste.turna', {
      parent: 'johda.home.partPiste',
      url: '/turna',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.myNavigator.pushPage('templates/ohjeita_ja_vinkkeja/turna.html');
      }]
    })



    .state('johda.home.part.vinkit', {
      parent: 'johda.home.part',
      url: '/vinkit',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.myNavigator.pushPage('templates/ohjeita_ja_vinkkeja/vinkit.html');
      }]
    })
    .state('johda.home.part.kerho', {
      parent: 'johda.home.part',
      url: '/kerho',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.myNavigator.pushPage('templates/ohjeita_ja_vinkkeja/kerho.html');
      }]
    })
    .state('johda.home.part.perus', {
      parent: 'johda.home.part',
      url: '/perus',
      onEnter: ['$rootScope', function($rootScope) {
        $rootScope.myNavigator.pushPage('templates/ohjeita_ja_vinkkeja/perus.html');
      }]
    })

    .state('johda.home.vinkit.sec', {
      parent: 'johda.home.part',
      url: '/sec/:j_id',
      onEnter: ['$rootScope', '$stateParams', function($rootScope, $stateParams) {
        $rootScope.myNavigator.pushPage('templates/johdaSecView.html', {'j_id': $stateParams.j_id});
      }]
    })

});


//For sanitazing html
app.filter('trustedhtml', 
   function($sce) { 
      return $sce.trustAsHtml; 
   }
);