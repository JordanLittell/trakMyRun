window.TrakMyRun = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Hello from Backbone!');
    new Backbone.Router.AppRouter({rootEl: $(".content")});
  }
};

$(document).ready(function(){
  TrakMyRun.initialize();
});
