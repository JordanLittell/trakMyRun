TrakMyRun.Views.UserEdit = Backbone.View.extend({
	template: JST["users/edit"],
	render: function() {
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		return this;
	}
})