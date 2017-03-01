

(function (root, factory) {
   if (typeof define === "function" && define.amd) {
      // AMD. Register as an anonymous module.
      define(["underscore","backbone"], function(_, Backbone) {
        // Use global variables if the locals are undefined.
        return factory(_ || root._, Backbone || root.Backbone);
      });
   } else if (typeof exports === 'object') {
     module.exports = factory(require("underscore"), require("backbone"));
   } else {
      // RequireJS isn't being used. Assume underscore and backbone are loaded in <script> tags
      factory(_, Backbone);
   }
}(this, function(_, Backbone) {
  'use strict';

  /**
   * @namespace Backbone.History
   */

  /**
   * Provides some extra events to the Backbone.history object.
   *
   * @fires Backbone.History#navigated
   * @fires Backbone.History#routeNotFound
   */


  /**
   * This is always triggered when `Backbone.history.navigate` is executed, regardless if any routes matched or not.
   *
   * @event Backbone.History#navigated
   * @param {boolean} routeTriggered If the url triggered a router handler
   * @param {string} fragment The fragment requested
   * @param {object} options The original options passed into the `Backbone.History.navigate` call
   * @example
   * Backbone.history.on('navigated', function(fragment, options, routeTriggered){
   *  console.log('Navigated to ', fragment, '. Triggered router:', routeTriggered, ' with options ', options );
   * });
   *
   * Backbone.history.navigate('/myRoute', {trigger:true});
   * // Naivagted to  /myRoute . Triggered router: true  with options  Object {trigger: true}
   */
  Backbone.History.prototype.navigate = _.wrap(Backbone.History.prototype.navigate, function(oldNavigate, fragment, options) {
    var routeTriggered = oldNavigate.call(this, fragment, options);
    this.trigger('navigated', fragment,  options, routeTriggered);
  });


  /**
   * Triggered if `Backbone.history.loadUrl` fails to match a router handler for the `fragment`

   * @event Backbone.History#routeNotFound
   * @param {string} fragment The fragment requested
   * @example
   * Backbone.history.on('routeNotFound', function(fragment){
   *  console.log('Page Not found ', fragment);
   * });
   *
   * Backbone.history.navigate('/nonExistentRoute', {trigger:true});
   * // Page Not found nonExistentRoute
   *
   * Backbone.history.navigate('/nonExistentRoute');
   * // Handler is not triggered as nothing tried to load a route (no trigger)
   */
  Backbone.History.prototype.loadUrl = _.wrap(Backbone.History.prototype.loadUrl, function(oldLoadUrl, fragment) {
    var routeTriggered = oldLoadUrl.call(this, fragment);
    if(!routeTriggered) {
      this.trigger('routeNotFound', fragment);
    }
    return routeTriggered;
  });

}));
