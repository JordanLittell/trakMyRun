TrakMyRun.Routers.AppRouter = Backbone.Router.extend({

	initialize: function(options) {
		this.$rootEl = options.rootEl;
		console.log(this.$rootEl);
		Backbone.history.start();
	},

	routes: {
		"" : "currentUserShow",
		"posts/new":"newPost",
		"users/:id" : "userShow",
<<<<<<< HEAD
		"users/:id/edit", "editUser"
=======
		"users/:id/edit": "editUser"
>>>>>>> master
	},

	userShow: function(id) {
		var user = TrakMyRun.Collections.users.getOrFetch(id);
		var view = new TrakMyRun.Views.UserShow({
			model: user
		});
		this.swapView(view);
	},

	editUser: function(id) {
<<<<<<< HEAD
		var user = TrakMyRun.Collections.users.getOrFetch(id);	}
=======
		var user = TrakMyRun.Collections.users.getOrFetch(id);
		var view = new TrakMyRun.Views.UserEdit({
			model: user
		});
		this.swapView(view);
	},
>>>>>>> master

	currentUserShow: function() {
		var id = TrakMyRun.CurrentUser;
		var url ="/users/"+id;
		Backbone.history.navigate(url, { trigger: true });
	},

	newPost: function() {
		console.log("activity fired");	
		var view = new TrakMyRun.Views.NewPost();
		this.swapView(view);
		view.setSliders();
	},

	swapView: function(view) {
		if (this._currentView) {
			this._currentView.remove();
		} 

		this.$rootEl.html(view.render().$el);
		debugger;
		this._currentView = view;
	}	
	
});
