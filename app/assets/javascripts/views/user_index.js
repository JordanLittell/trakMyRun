TrakMyRun.Views.UserIndex = Backbone.CompositeView.extend({ 
	template: JST["users/index"],
	render: function() {
		var view = this;
		var content = view.template({
			users: view.collection
		});
		view.$el.html(content);
		view.listenForScroll();
		window.setTimeout(function(){
		view.collection.each(function(user){
			var chart = new TrakMyRun.Views.StatsView({
				model: user
			});
			var selector = '.stats-display#'+user.get('id');
			view.addSubview(selector, chart);
		});},0);
		return view;
	},

	events: {
		"mouseover tr": "activateAnimations",
		"click tr": "displayStats"
	},

	listenForScroll: function () {
		var view = this;
		$(window).off("scroll"); // remove past view's listeners
    	var throttledCallback = _.throttle(this.nextPage.bind(this), 100);
		$(window).on("scroll", throttledCallback);
	},

	nextPage: function () {
		var view = this;
		var height = $(window).scrollTop()
		if( height > $(document).height() - ($(window).height() + 100)) {
			if (parseInt(this.collection.page) <= this.collection.total_pages){
				var loading = $('<div class="loading"></div>');
				if(this.$el.find('.loading').length === 0){
					this.$el.append(loading);
				}
				this.collection.fetch({
					remove: false, 
					data:  { page: parseInt(view.collection.page) + 1 },
					wait: true,	
				});
			}
		}
	},

	initialize: function() {
		this.listenTo(this.collection, "sync", this.render)
		this.listenTo(this.collection, "sync", this.renderLoading)
		this.collection.fetch({
			remove: false, 
			data:  { page: 1 },
			wait: true,
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