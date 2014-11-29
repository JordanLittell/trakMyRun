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
	},

	//if week num = 7, for month, num = 31, etc.
	getDateInterval: function(num, collection) {
		var results = [];

		function toDate(model){
			return new Date(model.get('created_at'));
		};

		var allTimes = collection;
			time = new Date(allTimes.last().get('created_at')),
			today = time.valueOf(),
			timePeriodAgo = time.setDate(time.getDate() - num).valueOf();
		
		allTimes.each(function(time){
			var val = toDate(time);
			if(val.valueOf() > timePeriodAgo) {
				results.push(time);
			}
		});

		return results;
	},

	getLabels: function () {
		var view = this;
		if(this.filter) { var update = true; } 
		var collection = this.targetCollection;
		if(!view._labels || view._labels.length === 0) {
			view._labels = [];
			collection.forEach(function(model){
				var date = new Date(model.get('created_at'));
				view._labels.push(date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear());
			});
		} 
		if(update) { this.updateLabels(); }
		return view._labels;
	},

	updateLabels: function () {
		var view = this;
		view._labels = [];
		view.filter.forEach(function(map){
			var date = new Date(map.get('created_at'));
			if(view.dateInterval === 1) {
				view._labels.push(date.toTimeString().substr(0,8));
			} else if(view.dateInterval === 365){
				view._labels.push(date.getMonth()+"/"+date.getDay());
			} else {
				view._labels.push(date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear());
			}
		});
	},

	getMiles: function() {
		var result = [];
		var view = this;
		
		if (arguments.length > 0) {
			var maps = [].slice.call(arguments)
		} else  {
			var maps = this.model.maps();	
		}
		maps.forEach(function(map){
			result.push(parseFloat(map.get('total_miles').substr(0,4)));
		});
		return result;
	},

	getCalories: function () {
		var results = [];
		var maps = this.model.maps();
		var view = this;
		debugger;
		maps.each(function(map){
			results.push(map.get('calories'))
		})
		return results;
	},

	getElevations: function () {
		var results = [];
		var that = this;
		var maps = this.model.maps();
		var view = this;
		maps.each(function(map){
			results.push(map.get('elevation_gain'))
		});		
		return results;
	},

	getAverageHR: function () {
		var results= [];
		var that = this; 
		var maps = this.model.maps();
		maps.each(function(map){
			results.push(map.get('heart_rate'))
		})
		return results;
	},

	getNetTime: function () {
		var results = [];
		var that = this;
		var maps = this.model.maps();
		var view = this;
		debugger;
		maps.each(function(map){
			var mins = parseInt(map.get('minutes'))
			results.push(mins);
		});
		return results;
	},
});