TrakMyRun.Views.StatsView = Backbone.ChartView.extend({ 
	template: JST["users/stats"],
	render: function() {
		this.metric = "getCalories";
		this.type = "barChart";
		this.targetCollection = this.model.posts();
		this.filter = this.getDateInterval(7,this.targetCollection);
		
		var content = this.template();
		this.$el.html(content);
		this.setRootEl("#myChart");
		this.makeChart(this.type);
		return this;
	},

	initialize: function () {
		this.listenTo(this.model, "sync add", this.render);
		this.listenTo(this.model.posts(), "sync", this.render);
	},

})