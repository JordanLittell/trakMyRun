window.TrakMyRun = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new TrakMyRun.Routers.AppRouter({ rootEl: $(".content") });
  }
};