TrakMyRun.Router.AppRouter = Backbone.Router.extend({

	initialize: function(options) {
		console.log("backbone router initiated");
		this.$rootEl = options.rootEl;
		console.log(this.$rootEl);
	},

	routes: {
		"" : "userShow"
	},

	userShow: function(id) {
		var user = TrakMyRun.Collections.users.getOrFetch(id);
		var view = new TrakMyRun.View.UserShow({
			model: user
		});
		this.swapView(view);
	},

	swapView: function (view) {
		if(this._currentView) {
			this._currentView.remove();
		}
		this.$rootEl.html(view.render().$el);
		this._currentView = view;
	}	
	
});