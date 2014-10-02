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
		view.listenForScroll();
		return view;
	},

	events: {
		"mouseover tr": "activateAnimations",
	},

	listenForScroll: function () {
		var view = this;
		$(window).off("scroll"); // remove past view's listeners
    	var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
		$(window).on("scroll", throttledCallback);
	},

	nextPage: function () {
		var height = $(window).scrollTop()
		if( height > $(document).height() - ($(window).height() + 50)) {
			if (parseInt(this.collection.page) <= this.collection.total_pages){
				this.collection.fetch({
					remove: false, 
					data:  { page: this.collection.page + 1 },
					wait: true,
					success: function () {
						console.log('success!')
					}
				});
			}
		}
	},

	initialize: function() {
		this.listenTo(this.collection, "sync", this.render)
		this.collection.fetch({
			remove: false, 
			data:  { page: this.collection.page },
			success: function () {console.log('success!')}
		});
	},

	activateAnimations: function(ev) {
		var heart = $(ev.currentTarget).find($('.heart'));
		var originalSize = heart.css('font-size');
		window.setTimeout(this.throb(heart, originalSize, this.backDown), 3000);
	},

	throb: function (heart, originalSize, callback) {
		for(var i = 14; i < 50; i++) {
			heart.css('font-size', 30);
		}
		window.setTimeout(callback(heart, originalSize), 4000);
	},

	backDown: function(heart, originalSize) {
		heart.css('font-size', originalSize);
	}
});