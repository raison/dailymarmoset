var app = angular.module('myApp', ['ngTouch', 'angular-carousel']);
app.controller('main', ['$scope', '$window', '$http', '$rootScope', function($scope, $window, $http, $rootScope) {
}]);
app.directive("ngdWatchScroll", function($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            scope.winTop = $window.pageYOffset;
            scope.winBottom = $window.pageYOffset + $window.innerHeight;
            scope.winHeight = $window.innerHeight;
            scope.docHeight = $window.document.body.scrollHeight;
            scope.$apply();
        });
    };
});

app.directive("ngdBg", function($window) {
    return function(scope, element, attrs) {
        var screenWidth = angular.element($window)[0].screen.availWidth;
        var url = attrs.ngdBg;
        if (screenWidth > 767 && attrs.ngdBgMd) {
            url = attrs.ngdBgMd;
        }
        element.css('backgroundImage', "url(" + url + ")");
    };
});
