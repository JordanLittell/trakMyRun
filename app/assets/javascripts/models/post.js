TrakMyRun.Models.Post = Backbone.Model.extend({
	urlRoot: "api/posts",
	comments: function() {
		var model = this;
		if(!this._comments) {
			this._comments = new TrakMyRun.Collections.Comments([], { post: this });
			
		}
		return this._comments;
	},

	parse: function(resp) {
		if(resp.comments) {
			this.comments().set(resp.comments, { parse:true });
			delete resp.comments;
		}
		return resp;
	}
});