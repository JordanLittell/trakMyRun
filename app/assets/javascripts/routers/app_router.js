TrakMyRun.Routers.AppRouter = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.rootEl;
		Backbone.history.start();
	},
	
	routes: {
		"" : "currentUserShow",
		"posts/new":"newPost",
		"users" : "userIndex",
		"users/:id/routes/show": "mapShow",
		"users/:id/routes/load": "loadMaps",
		"users/:id/dashboard": "displayDashboard",
		"users/:id" : "userShow",
	},

	displayDashboard: function(id){
		var user = TrakMyRun.Collections.users.getOrFetch(id);
		var view = new TrakMyRun.Views.DashboardView({
			model: user
		});
		this.swapView(view); 
	},

	loadMaps: function (id) {
		var user = TrakMyRun.Collections.users.getOrFetch(id);
		var view = new TrakMyRun.Views.MapLoad({
			collection: user.maps()
		});
		this.swapView(view); 
	},
	mapShow: function(id) {

		var user = TrakMyRun.Collections.users.getOrFetch(id);
		var view = new TrakMyRun.Views.MapShow({
			model: user
		});
		this.swapView(view);
		
	},

	loadMapForUser: function (id) {
		var map = TrakMyRun.Collections.maps.getOrFetch(id);
		var view = new TrakMyRun.Views.LoadMap({
			model: map
		});
	},

	userShow: function(id) {
		var user = TrakMyRun.Collections.users.getOrFetch(id);
		var view = new TrakMyRun.Views.UserShow({
			model: user
		});
		this.swapView(view);
	},

	currentUserShow: function() {
		var id = TrakMyRun.CurrentUser;
		var url ="/users/"+id;
		Backbone.history.navigate(url, { trigger: true });
	},

	newPost: function() {
		var user = TrakMyRun.Collections.users.getOrFetch(TrakMyRun.CurrentUser);
		var view = new TrakMyRun.Views.NewPost({
			model: user
		});
		this.swapView(view);
		view.setup();
		view.setSliders();
	},

	userIndex: function (ev) {
		TrakMyRun.Collections.users.fetch();
		var view = new TrakMyRun.Views.UserIndex({
			collection: TrakMyRun.Collections.users
		});
		this.swapView(view);
	},

	swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove();
		} 
		TrakMyRun.updateURL(window.location.hash);		
		this.$rootEl.html(view.render().$el);
		this._currentView = view;
	}	
	
});
