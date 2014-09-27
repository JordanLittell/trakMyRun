TrakMyRun.Views.UserIndex = Backbone.CompositeView.extend({ 
	template: JST["users/index"],
	render: function() {
		var view = this;
		var content = view.template({
			users: view.collection
		});
		view.collection.each(function(user){
			user.posts().each(function(post) {
				var subview = new TrakMyRun.Views.PostShow({
					model: post
				});
				view.addSubview('.posts-container', subview);
			})
		});
		view.$el.html(content);
		return view;
	},

	events: {
		"mouseover .heart": "activateAnimations"
	},

	initialize: function() {
		this.listenTo(this.collection, "sync", this.render)
	},
	activateAnimations: function(ev) {
		console.log(ev.currentTarget);
		var heart = $(ev.currentTarget).find('.heart');
			heart.animate({opacity: 0.2}, 500, 'linear')
			.animate({opacity: 1}, 500, 'linear');
	},
});