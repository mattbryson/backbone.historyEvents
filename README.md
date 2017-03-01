# backbone.historyEvents

Extra events for the Backbone History module.

This simply adds a couple of events to the `Backbone.history` module, allowing you to respond to things
like missing routes and changes to the URL (rather than route triggers)

## Install
````bash
npm install backbone-history-events --save
````

````bash
bower install backbone-history-events --save
````

## Example
````javascript
Backbone.history.on('navigated', function(fragment, options, routeTriggered){
  console.log('Navigated to ', fragment, '. Triggered router:', routeTriggered, ' with options ', options );
  });

  Backbone.history.navigate('/myRoute', {trigger:true});
  // Naivagted to  /myRoute . Triggered router: true  with options  Object {trigger: true}
````

## Docs
See [https://mattbryson.github.io/backbone.historyEvents] for documentation
