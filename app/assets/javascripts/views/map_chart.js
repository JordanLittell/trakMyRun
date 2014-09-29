TrakMyRun.Views.MapChart = Backbone.ChartView.extend({
	template: JST["maps/chart"],
	
	render: function() {
		var content = this.template({
			map: this.model
		});
		this.$el.html(content);
		this.setRootEl("#map-chart");
		this.renderElevation();
		return this;
	},

	initialize: function () {
		console.log(this.model._events);
		this.listenTo(this.model, "change", this.renderElevation);
		console.log(this.model._events);
	},

	renderElevation: function() {
		console.log("yay");
	}


})