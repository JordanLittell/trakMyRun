TrakMyRun.Views.MapNew = Backbone.MapView.extend({
	template: JST["maps/new"],
	render: function() {
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		return this;
	},

	initialize: function () {
		this.listenTo(this.model,"sync",window.initialize)
	},
	events: {
		"click .new": "reload",
		"click #map": "updateDistance"
	},

	reload: function() {
		window.location.reload();
	}

});