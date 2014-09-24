TrakMyRun.Views.UserShow = Backbone.CompositeView.extend({
	template: JST["users/show"],

	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},
	render: function()  {
		var view = this;
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		this.model.posts().each(function(post) {
			var subview = new TrakMyRun.Views.PostShow({
				model: post
			});
			view.addSubview('.posts-container', subview);
		});
		return this;
	}
});