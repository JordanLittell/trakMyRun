TrakMyRun.Views.DashboardView = Backbone.ChartView.extend({ 
	template: JST["users/dashboard"],
	
	render: function() {
		var args = [].slice.call(arguments);
		this.type = this.type || args[0];
		if (!(typeof this.type === "string")) { 
			this.type = "barChart"; 
			args.shift();
		}
		this.metric = this.metric || args[0];

		if (!(typeof this.metric === "string")) { 
			this.metric = "getMiles"; 
			args.shift();
		}

		var content = this.template({
			user: this.model
		});

		this.$el.html(content);
		this.setRootEl("#myChart");
		this.makeChart(this.type, this.metric);
		return this;
	},

	initialize: function() {
		this.listenTo(this.model, 'sync add', this.render);
	},

	events: {
		"click #line": "handleChartChange",
		"click #radar": "handleChartChange",
		"click #bar": "handleChartChange",
		"click .change-metric": "changeMetric",
		"change .time-period": "changeTimePeriod"
	},

	changeTimePeriod: function () {
		this.dateInterval = $("option:selected").data('date-interval');
		this.filter = this.getDateInterval(this.dateInterval);
		this.metric = 'getMiles';
		this.render();
	},

	//if week num = 7, for month, num = 31, etc.
	getDateInterval: function(num) {
		var results = [];
		function toDate(map){
			return new Date(map.get('created_at'));
		};
		var maps = this.model.maps(),
			date = new Date(maps.last().get('created_at')),
			today = date.valueOf(),
			weekAgo = date.setDate(date.getDate() - num).valueOf();
		maps.each(function(map){
			var val = toDate(map);
			if(val.valueOf() > weekAgo) {
				results.push(map);
			}
		});
		return results;
	},

	getDaily: function () {
		console.log(this.model.maps());
	},

	changeMetric: function(event) {
		this.metric = undefined;
		this._labels = [];
		var method = $(event.currentTarget).data('metric-method');
		this.render(method);
	},

	handleChartChange: function (event) {
		event.preventDefault();
		this.type = undefined;
		this._labels = [];
		var methodName = $(event.currentTarget).data('chart-type');
		this.render(methodName);
	},

	updateLabels: function () {
		var view = this;
		view._labels = [];
		view.filter.forEach(function(map){
			var date = new Date(map.get('created_at'));
			if(view.dateInterval === 1) {
				view._labels.push(date.toTimeString().substr(0,8));
			} else {
				view._labels.push(date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear());
			}
		});
	},

	getLabels: function () {
		var view = this;
		console.log(this.filter);
		if(this.filter) { var update = true; } 
		var maps = this.model.maps();	
		if(!view._labels || view._labels.length === 0) {
			view._labels = [];
			maps.forEach(function(map){
				var date = new Date(map.get('created_at'));
				view._labels.push(date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear());
			});
		} 
		if(update) { this.updateLabels(); }
		return view._labels;
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
		var posts = this.model.posts();
		var view = this;
		posts.each(function(post){
			results.push(post.get('calories'))
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
		var posts = this.model.posts();
		posts.each(function(post){
			results.push(post.get('heart_rate'))
		})
		return results;
	},
	getNetTime: function () {
		var results = [];
		var that = this;
		var posts = this.model.posts();
		var view = this;
		posts.each(function(post){
			var mins = parseInt(post.get('minutes'))
			results.push(mins);
		});
		return results;
	},
});