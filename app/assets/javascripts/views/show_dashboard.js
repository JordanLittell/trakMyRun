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
		"click .change-metric": "changeMetric"
	},

	changeMetric: function(event) {
		this.metric = undefined;
		this._labels = [];
		var method = $(event.currentTarget).data('metric-method');
		this.render(method)
	},

	handleChartChange: function (event) {
		event.preventDefault();
		this.type = undefined;
		this._labels = [];
		var methodName = $(event.currentTarget).data('chart-type');
		this.render(methodName, this.metric);
	},
	getLabels: function () {
		var view = this;
		var maps = this.model.maps();
		if(!view._labels || view._labels.length === 0 ) {
			view._labels = [];
			maps.each(function(map){
				var date = new Date(map.get('created_at'));
				view._labels.push(date.getMonth()+"/"+date.getDay());
			});
		} 
		return view._labels;
	},

	getMiles: function() {
		var result = [];
		var view = this;
		var maps = this.model.maps();
		maps.each(function(map){
			result.push(parseFloat(map.get('total_miles').substr(0,4)));
		});
		this.labels = this.getLabels();
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
			results.push(map.get('elevations'))
		})
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
			var mins = that.extractTime(post);
			results.push(mins);
		});
		return results;
	},

	extractTime: function(post){
		var hours = post.get('hours');
		var minutes = post.get('minutes');
		var seconds = post.get('seconds');
		var totMin = parseInt(hours*60 + minutes + (seconds/60));
		return totMin
	},	
});