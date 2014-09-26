TrakMyRun.Views.MapNew = Backbone.MapView.extend({
	template: JST["maps/new"],
	render: function() {
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		return this;
	},

	   
 	renderMap: function(selector) {

 	}

});