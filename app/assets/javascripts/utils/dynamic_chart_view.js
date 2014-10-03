Backbone.DynamicChart = Backbone.ChartView.extend({ 
	changeTimePeriod: function (event) {
			this.dateInterval = $(event.currentTarget).find("option:selected").data('date-interval');
			this.filter = this.getDateInterval(this.dateInterval, this.model.maps());
			this.render();
		},

		changeMetric: function(event) {
			this.metric = undefined;
			this._labels = [];
			this.method = $(event.currentTarget).data('metric-method');
			this.render(this.method);
		},

		handleChartChange: function (event) {
			event.preventDefault();
			this.type = undefined;
			this._labels = [];
			var methodName = $(event.currentTarget).data('chart-type');
			this.render(methodName);
		}
});