TrakMyRun.Views.UserIndex = Backbone.View.extend({ 
	template: JST["users/index"],
	render: function() {
		debugger;
		var content = this.template({
			users: this.collection
		});
		this.$el.html(content);
		return this;
	},
	initialize: function() {
		this.listenTo(this.collection, "sync", this.render)
	}
});