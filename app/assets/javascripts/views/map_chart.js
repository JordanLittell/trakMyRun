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
		this._labels = [];
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "new", this.restart);
	},

	restart: function () {
		this._labels = [];
		$('#map-chart').replaceWith("<canvas id='#map-chart'></canvas>");
	},

	renderElevation: function() {
		this.metric = 'parseElevations'
		this.makeChart('lineChart', {showScale: false, scaleBeginAtZero: true});
	},

	getLabels: function() {
		if(this.model.get('elevations')){
			var str = String(this.model.get('total_miles')).substr(0,4)+" mi";
			this._labels.push(str);
			return this._labels;
		} 
		return [];
	},

	parseElevations: function () {
		return JSON.parse(this.model.get('elevations'));
	}
})
