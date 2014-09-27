TrakMyRun.Views.MapShow = Backbone.View.extend({ 
	template: JST["maps/load"],
	render: function() {
		var content = this.template({
			maps : this.collection
		});
		this.$el.html(content);
		return this;
	}
});
