TrakMyRun.Views.DashboardView = Backbone.DynamicChart.extend({ 
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
		this.makeChart(this.type);
		this.displayChartName('.name-display');
		return this;
	},

	initialize: function() {
		this.listenTo(this.model, 'sync add', this.render);
		this.targetCollection = this.model.maps();
	},

	events: {
		"click #line": "handleChartChange",
		"click #radar": "handleChartChange",
		"click #bar": "handleChartChange",
		"click .change-metric": "changeMetric",
		"change .time-period": "changeTimePeriod"
	},

	displayChartName: function(el) {
		var typeDisplay = $(el).find('.type-display');
		var timeDisplay = $(el).find('.time-display');
		var content;
		debugger;
		switch(this.dateInterval) {
			case 1:
				content = 'Day'
				break;
			case 7:
				content = 'Week'
				break;
			case 31:
				content = 'Month'
				break;
			case 365:
				content = 'Year'
				break;
			default: 
				content = 'Year'
				break;
		}
		typeDisplay.text(this.metric.substr(3));
		timeDisplay.text(content);
	},	
	
});