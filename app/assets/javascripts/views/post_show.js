TrakMyRun.Views.PostShow = Backbone.CompositeView.extend({
	template: JST["posts/show"],

	render: function () {
		var content = this.template({
			post: this.model
		});
		this.$el.html(content);
		return this;
	},

	events: {
		"click .delete-view": "deletePost"
	},

	deletePost: function (event) {
		var id = $(event.currentTarget).data('post-id');
		if (TrakMyRun.CurrentUser === this.model.get("user_id")) {
			this.model.destroy();
			console.log('post deleted for user');	
		} else {
			console.log('this is not your comment');
		}
		
	}

});