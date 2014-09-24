TrakMyRun.Models.User = Backbone.Model.extend({
	urlRoot: "api/users",
	posts: function () {
		if(!this._posts) {
			this._posts = new TrakMyRun.Collections.Posts([],{ user:this });
		}
		return this._posts
	},

	parse: function(resp) {
		if(resp.posts) {
			this.posts().set(resp.posts, { parse: true });
			delete resp.posts;
		}
		return resp;
	}
});