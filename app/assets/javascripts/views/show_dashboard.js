TrakMyRun.Views.DashboardView = Backbone.View.extend({ 
	template: JST["users/dashboard"],
	
	render: function() {
		var content = this.template({
			posts: this.model.posts()
		});
		this.$el.html(content);
		this.renderBar();
		return this;
	},
	initialize: function() {
		this.listenTo(this.model, 'sync', this.render);
		this.listenTo(this.model.posts(), 'sync', this.render);
	},

	renderBar: function () {
		var ctx = this.$el.find("#myChart")[0].getContext("2d");
		var data = {
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,0.8)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
		            data: [65, 59, 80, 81, 56, 55, 40]
		        },
		        {
		            label: "My Second dataset",
		            fillColor: "rgba(151,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
		            data: [28, 48, 40, 19, 86, 27, 90]
		        }
		    ]
		};
		
		var myBarChart = new Chart(ctx).Bar(data,{responsive:true});

	}
		
	


});