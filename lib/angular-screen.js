(function() {
  'use strict';
  angular.module('ftScreen', []).provider('$screen', function() {
    var $rootScope;
    var defaultMQ = {
      tiny: '(max-width: 480px)',
      medium: '(min-width: 481px) and (max-width: 1023px)',
      big: '(min-width: 1024px)'
    };

    var throttle = function(fn, threshold, scope) {
      threshold = threshold || 250;
      var last, deferTimer;

      return function() {
        var context = scope || this;
        var now = +new Date();
        var args = arguments;

        if (last && now < last + threshold) {
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function() {
            last = now;
            fn.apply(context, args);
          }, threshold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    };
    var matchMedias = null;
    var screen = {};
    var calculateMedia = function() {
      $rootScope.$apply(function() {
        angular.forEach(matchMedias, function(media, name) {
          screen[name] = media.matches;
        });
      });
    };

    var initialize = function() {
      matchMedias = {};

      angular.forEach(defaultMQ, function(mediaquery, name) {
        matchMedias[name] = window.matchMedia(mediaquery);
        screen[name] = matchMedias[name].matches;
      });
      angular.element(window).on('resize', throttle(calculateMedia));
    };

    return {
      setMediaQueries: function(newVal) {
        defaultMQ = newVal;
      },

      $get: function($injector) {
        if (!matchMedias) {
          initialize();
          $rootScope = $injector.get('$rootScope');
        }

        return screen;
      }
    };
  });
})();
