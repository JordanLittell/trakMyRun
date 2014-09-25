TrakMyRun.Collections.Users = Backbone.Collection.extend({
	url: "api/users",
	model: TrakMyRun.Models.User,
	
	getOrFetch: function(id) {
		var users = this;
		var user = users.get(id);
		if(!user) {
			user = new TrakMyRun.Models.User({id: id});
			user.fetch({
				success: function () {
					users.add(user);
				}
			});
		} else {
			user.fetch();
		}
		return user;
	},

	parse: function(resp) {
		debugger;
		if(resp.users) {
			TrakMyRun.Collections.users.set(resp.users, { parse: true })
		}
		delete resp.users
		return resp
	}
});

TrakMyRun.Collections.users = new TrakMyRun.Collections.Users();