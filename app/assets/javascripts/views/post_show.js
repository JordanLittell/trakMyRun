TrakMyRun.Views.PostShow = Backbone.CompositeView.extend({
	template: JST["posts/show"],

	render: function () {
		var content = this.template({
			post: this.model
		});
		this.$el.html(content);
		return this;
	},

});