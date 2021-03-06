/**
 * @description
 * Define the directive for the loader element
 *
 * Listen for broadcasted loader events and show/hide as necessary
 */
angular.module('blizzso.loader.directives', [])


.directive('loader', function($rootScope) {
    return function(scope, elem, attr) {
        scope.$on('loader_show', function() {
            return elem.removeClass('ng-hide');
        });

        return scope.$on('loader_hide', function() {
            return elem.addClass('ng-hide');
        });

        scope.$on('event:auth-loginRequired', function() {
            console.log('auth req');
        })
    };
});
