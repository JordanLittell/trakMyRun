TrakMyRun.Views.MapChart = Backbone.ChartView.extend({
	template: JST["maps/chart"],
	
	render: function() {
		var content = this.template({
			map: this.model
		});
		this.$el.html(content);
		this.setRootEl("#map-chart")
		this.renderElevation();
		return this;
	},

	renderElevation: function() {
		console.log(this.collection);
	}


})