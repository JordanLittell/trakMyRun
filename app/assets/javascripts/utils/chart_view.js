Backbone.ChartView = Backbone.View.extend({  

	setRootEl: function(element) {
		this.rootEl = this.$el.find(element)[0];
	},

	_getCtx: function() {
		this.ctx = this.rootEl.getContext("2d");
	},

	barChart: function (data) {
		new Chart(this.ctx).Bar(data,{responsive:true});
	},

	pieChart: function(data){
		new Chart(this.ctx).Pie(data,{responsive:true});
	},

	radarChart: function(data) {
		new Chart(this.ctx).Radar(data, {responsive: true});
	},

	lineChart: function(data) {
		new Chart(this.ctx).Line(data, {responsive: true});
	},

	makeChart: function (chartType, options) {
		this._getCtx();
		if(this.getLabels().length > 0) {
			var data = {
			    labels: this.getLabels(),
			    datasets: [
			        {
			            label: "My Second dataset",
			            fillColor: "rgba(151,187,205,0.5)",
			            strokeColor: "rgba(151,187,205,0.8)",
			            highlightFill: "rgba(151,187,205,0.75)",
			            highlightStroke: "rgba(151,187,205,1)",
			            data: this[this.metric].apply(this, this.filter),
			        }
			    ]
			};
			this[chartType].bind(this, data, options)();
		}
	}
});