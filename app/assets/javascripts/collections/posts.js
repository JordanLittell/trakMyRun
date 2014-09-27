TrakMyRun.Collections.Posts = Backbone.Collection.extend({
	comparator: 'created_at',	
	model: TrakMyRun.Models.Post,
	
	url: "api/posts",
	
	getOrFetch: function(id) {
		var posts = this;
		var post = posts.get(id);
		if(!post) {
			post = new TrakMyRun.Models.Post({id: id});
			post.fetch({
				success: function () {
					posts.add(post);
				}
			});
		} else {
			post.fetch();
		}
		return post;
	}

})