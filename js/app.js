// Initialize the angular app, and include libraries for mobile-swiping and carousel-building

var app = angular.module('myApp', ['ngTouch', 'angular-carousel']);
/*
* This is a pretty simple app so one controller will do the trick.  It contains a function to
* get the json from the server, unpack it, and bind it to the view where it gets looped out
* twice for mobile and desktop contexts.
* It also contains a function to filter the data by tag and refresh the scope.  This function
* is placed in the root scope so that the filter directive can access it.
*/
app.controller('main', ['$scope', '$window', '$http', '$rootScope', function($scope, $window, $http, $rootScope) {
    var imgPath = "images/thumbs/";
    $scope.getSlides = function(page) {
        $scope.allSlides = new Array();
        var url = "page" + page + ".json";
        $http.get(url).then(function(result) {
            if (result.data && result.data.length > 0) {
                for (var i = 0; i < result.data.length; i++) {
                    var thisSlide = {};
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
            } else {
            	console.log("no stories available");
            }
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
            $scope.carouselIndex = 0;
        });
    }
    $scope.getSlides(1);
}]);

// This directive places information about scroll position into the scope.
// The snazzy / sticky / scrolly header uses it.
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

// This does the fancy bg image placement
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

//  This is attached to the text input box, and attaches a listener to its keyup event.
//  When typing happens, it sends the text to the filter function in the main controller.
app.directive("ngdTagFilter", function($rootScope) {
    return function(scope, element, attrs) {
        angular.element(element).bind("keyup", function() {
            var filter = element.val();
            $rootScope.filterSlides(filter);
        });
    };
});