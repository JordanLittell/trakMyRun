TrakMyRun.Views.UserShow = Backbone.CompositeView.extend({
	template: JST["users/show"],
	editTemplate: JST["users/basic_edit"],
	locationEditTemplate: JST["users/location_edit"],
	passwordEditTemplate: JST["users/password_edit"],

	initialize: function() {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.posts(), "destroy", this.render)
	},
	render: function()  {
		var view = this;
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		this.model.posts().each(function(post) {
			var subview = new TrakMyRun.Views.PostShow({
				model: post
			});
			view.addSubview('.posts-container', subview);
		});
		return this;
	},

	events: {
		"click #changePhoto": "showPhotoEdit",
		"click #changePassword" : "showPasswordChange",
		"click #changeAddress" : "showAddressChange",
		"click #updateInfo": "showChangeInfo",
		"click #home": "goHome"
	},

	showChangeInfo: function () {
		var content = this.editTemplate({
			user: this.model
		});
		$('.posts-container').html(content);
	},

	showPhotoEdit: function(ev) {

	},
	showPasswordChange: function(ev) {
		var content = this.passwordEditTemplate({
			user: this.model
		});
		$('.posts-container').html(content);
	},
	showAddressChange: function(ev) {
		var content = this.locationEditTemplate({
			user: this.model
		});
		$('.posts-container').html(content);
	},
});