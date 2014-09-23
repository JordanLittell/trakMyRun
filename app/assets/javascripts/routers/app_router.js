TrakMyRun.Routers.AppRouter = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.rootEl;
		console.log(this.$rootEl);
	},

	routes: {
		"" : "currentUserShow",
		"api/users/:id" : "userShow"
	},

	userShow: function(id) {
		console.log("router reading...");
		var user = TrakMyRun.Collections.users.getOrFetch(id);
		var view = new TrakMyRun.Views.UserShow({
			model: user
		});
		this.swapView(view);
	},

	currentUserShow: function() {
		var id = TrakMyRun.CurrentUser;
		var url ="/api/users/"+id;
		Backbone.history.navigate(url, { trigger: true });
	},

	swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove();
		} 

		this.$rootEl.html(view.render().$el);
		this._currentView = view;
	}	
	
});
