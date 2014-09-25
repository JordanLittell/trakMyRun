TrakMyRun.Views.UserEdit = Backbone.View.extend({
	template: JST["users/edit"],
	render: function() {
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		return this;
	}, 

	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
	},

	events: {
		"submit #personal-stat-form": "updateUser"
	},

	updateUser: function (ev) {
		ev.preventDefault();
		var data = $(ev.currentTarget).serializeJSON();
		console.log(data);
		this.model.save(data.user);
		TrakMyRun.Collections.users.set(this.model);
	},
})