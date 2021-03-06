/*!
 * JS keyStroke
 * Copyright (c) Evan Solomon Sat Apr 06 2013
 * Licensed MIT
 */
// Generated by CoffeeScript 1.6.2
(function() {
  (function($) {
    return $.fn.keyStroke = $.keyStroke = function(requiredKeys, options, callback) {
      var $document, activeKeys, checkKeystroke, executeCallback, namespace;

      if (arguments.length === 2) {
        callback = options;
        options = {};
      }
      options = $.extend({
        context: this,
        args: [],
        preventDefault: true,
        modKeys: []
      }, options);
      $document = $(document);
      activeKeys = [];
      namespace = $.map([requiredKeys, options.modKeys], function(item) {
        return item;
      }).join('-');
      $document.on("keydown.JQkeyStroke.JQkeyStroke-" + namespace, function(event) {
        activeKeys.push(event.keyCode);
        activeKeys = activeKeys.filter(function(item, index, array) {
          return index === $.inArray(item, array);
        });
        if (checkKeystroke(event)) {
          return executeCallback(event);
        }
      });
      $document.on("keyup.JQkeyStroke.JQkeyStroke-" + namespace, function(event) {
        var index;

        index = $.inArray(event.keyCode, activeKeys);
        if (index > -1) {
          return activeKeys.splice(index, 1);
        }
      });
      $(window).on('focus', function() {
        return activeKeys = [];
      });
      executeCallback = function(event) {
        if (options.preventDefault) {
          event.preventDefault();
        }
        return callback.apply(options.context, [event].concat(options.args));
      };
      checkKeystroke = function(event) {
        var modifier, _i, _len, _ref, _ref1;

        if ('array' === $.type(requiredKeys)) {
          return (0 === (_ref = $(activeKeys).not(requiredKeys).length) && _ref === $(requiredKeys).not(activeKeys).length);
        } else {
          if (1 + options.modKeys.length !== activeKeys.length) {
            return false;
          }
          if (!($.inArray(requiredKeys, activeKeys) > -1)) {
            return false;
          }
          _ref1 = options.modKeys;
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            modifier = _ref1[_i];
            if (!event[modifier]) {
              return false;
            }
          }
          return true;
        }
      };
      return this;
    };
  })(jQuery);

}).call(this);
