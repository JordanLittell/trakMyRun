TrakMyRun.Views.MapLoad = Backbone.View.extend({ 
	template: JST["maps/load"],

	render: function() {
		console.log(this.model.maps());
		var content = this.template({
			user: this.model
		})
		this.$el.html(content);
		return this;
	},

	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
	}
});