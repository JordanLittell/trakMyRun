TrakMyRun.Views.MapNew = Backbone.View.extend({
	template: JST["maps/new"],
	render: function() {
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		return this;
	}, 
});