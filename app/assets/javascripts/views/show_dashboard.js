TrakMyRun.Views.DashboardView = Backbone.View.extend({ 
	template: JST["users/dashboard"],
	
	render: function() {
		var args = [].slice.call(arguments);
		this.type = this.type || args[0];
		
		if (!(typeof this.type === "string")) { 
			this.type = "barChart"; 
			args.shift();
		}
		debugger;
		this.metric = this.metric || args[0];

		if (!(typeof this.metric === "string")) { 
			this.metric = "getMiles"; 
			args.shift();
		}
		
		var content = this.template({
			posts: this.model.posts()
		});

		this.$el.html(content);
		this.makeChart(this.type, this.metric);
		return this;
	},

	initialize: function() {
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.posts(), 'sync', this.render);
	},

	events: {
		"click #line": "handleChartChange",
		"click #radar": "handleChartChange",
		"click #bar": "handleChartChange",
		"click .change-metric": "changeMetric"
	},

	changeMetric: function(event) {
		this.metric = undefined;
		var method = $(event.currentTarget).data('metric-method');
		this.render(method)
	},

	handleChartChange: function (event) {
		event.preventDefault();
		this.type = undefined;
		var methodName = $(event.currentTarget).data('chart-type');
		this.render(methodName, this.metric);
	},

	getMiles: function() {
		var result = [];
		var maps = this.model.maps();
		maps.each(function(map){
			result.push(parseFloat(map.get('total_miles').substr(0,4)));
		})
		return result;
	},

	getCalories: function () {
		var results = [];
		var posts = this.model.posts();
		posts.each(function(post){
			results.push(post.get('calories'))
		})
		return results;
	},

	getNetTime: function () {
		var results = [];
		var that = this;
		var posts = this.model.posts();
		posts.each(function(post){
			var mins = that.extractTime(post);
			results.push(mins)
		});
		return results;
	},

	getCtx: function() {
		this.ctx = this.$el.find("#myChart")[0].getContext("2d");
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

	extractTime: function(post){
		var hours = post.get('hours');
		var minutes = post.get('minutes');
		var seconds = post.get('seconds');
		var totMin = parseInt(hours*60 + minutes + (seconds/60));
		return totMin
	},

	makeChart: function (chartType, metric) {
		this.getCtx();
		this.getNetTime();
		var data = {
			
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,0.8)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
		            data: this[this.metric].apply(this),
		        },
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(151,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
		            data: this[this.metric].apply(this),
		        }
		    ]
		};
		this[chartType].bind(this, data)();
	}
});