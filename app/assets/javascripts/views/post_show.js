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
		"click .delete-view": "deletePost",
		"click .show-comments": "showComments"
	},

	deletePost: function (event) {
		var id = $(event.currentTarget).data('post-id');
		if (TrakMyRun.CurrentUser === this.model.get("user_id")) {
			this.model.destroy();
			console.log('post deleted for user');	
		} else {
			console.log('this is not your comment');
		}
		
	},

	showComments: function(event) {		
		var targetName = $(event.currentTarget).data('target-name');
		var target = this.$el.find($(targetName));
		if(target.css('display') === 'none') {
			target.slideDown('slow');	
			$(event.currentTarget).html("Hide Comments");
		} else {
			$(event.currentTarget).html("Show Comments");
			target.slideUp('slow');
		}
	}

});