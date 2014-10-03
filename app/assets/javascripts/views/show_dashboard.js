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
		this._activeElement = this._activeElement || $('#miles');
		this._activeElement.addClass('active');
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
		"change .time-period": "changeTimePeriod",
		"click a": "activate"
	},

	activate: function (event) {
		var target = $(event.currentTarget);
		target.css('color','red');
		this._activeElement = target;
	}
	
});