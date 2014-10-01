TrakMyRun.Views.MapChart = Backbone.ChartView.extend({
	
	template: JST["maps/chart"],
	
	render: function() {
		var content = this.template({
			map: this.model
		});
		this.$el.html(content);
		this.setRootEl("#map-chart");
		this.renderElevation();
		$('#map-chart').css('display', 'hidden');
		return this;
	},

	initialize: function () {
		this._labels = [];
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "new", this.restart);
		this.listenTo(this.model, "showElevations", this.showElevations);
	},

	showElevations: function () {
		$('#map-chart').slideDown('slow');
	},

	restart: function () {
		this._labels = [];
		$('#map-chart').remove();
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
