Backbone.Router.AppRouter = Backbone.Router.extend({

	initialize: function(options) {
		console.log("backbone router initiated");
		this.$rootEl = options.rootEl;
		console.log(this.$rootEl);
	},

	routes: {
		"" : "userShow"
	},

	userShow: function() {

	}	
	
})