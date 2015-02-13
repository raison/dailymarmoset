var app = angular.module('myApp', ['ngTouch', 'angular-carousel']);
app.controller('main', ['$scope', '$window', '$http', '$rootScope', function($scope, $window, $http, $rootScope) {
    var imgPath = "images/thumbs/";
    $scope.getSlides = function(page) {
        $scope.allSlides = new Array();
        var url = "page" + page + ".json";
        $http.get(url).then(function(result) {
            if (result.data.length > 0) {
                for (var i = 0; i < result.data.length; i++) {
                    thisSlide = {};
                    thisSlide.headline = result.data[i].headline;
                    thisSlide.img = imgPath + result.data[i].img;
                    thisSlide.description = result.data[i].description;
                    thisSlide.date = result.data[i].date;
                    thisSlide.tags = result.data[i].tags;
                    thisSlide.tagtext = "#"+result.data[i].tags.join(" #");
                    $scope.allSlides.push(thisSlide);
                }
                $scope.desktopSlides = $scope.allSlides;
                $scope.mobileSlides = $scope.allSlides;
            } else {}
        }, function(e) {
            console.log(e);
        });
    }
    $rootScope.filterSlides = function(text) {
        var text2 = text.toLowerCase();
        $scope.mobileSlides = new Array();
        $scope.desktopSlides = new Array();
        $scope.filteredSlides = new Array();
        for (var i = 0; i < $scope.allSlides.length; i++) {
            for (var j = 0; j < $scope.allSlides[i].tags.length; j++) {
                if ($scope.allSlides[i].tags[j].match(text2)) {
                    $scope.filteredSlides.push($scope.allSlides[i]);
                    break;
                }
            }
        }
        $scope.$apply(function() {
            $scope.mobileSlides = $scope.filteredSlides;
            $scope.desktopSlides = $scope.filteredSlides;
            $scope.data = {};
            $scope.carouselIndex = 0;
        });
    }
    $scope.getSlides(1);
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
