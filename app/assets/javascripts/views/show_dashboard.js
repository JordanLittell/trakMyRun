TrakMyRun.Views.DashboardView = Backbone.View.extend({ 
	template: JST["users/dashboard"],
	
	render: function() {
		var content = this.template({
			posts: this.model.posts()
		});
		this.$el.html(content);
		var view = this;
		this.renderBar(this.getMileage, this.barChart);
		return this;
	},

	initialize: function() {
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.posts(), 'sync', this.render);
	},

	getMileage: function() {
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
		debugger;
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

	renderBar: function (metric, chartType) {
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
		            data: metric.apply(this),
		        },
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(151,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
		            data: metric.apply(this),
		        }
		    ]
		};
		chartType.bind(this,data)();
	}
});