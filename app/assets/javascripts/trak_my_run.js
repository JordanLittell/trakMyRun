window.TrakMyRun = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Hello from Backbone!');
    new TrakMyRun.Routers.AppRouter({ rootEl: $(".content") });
    Backbone.history.start();
  }
};


