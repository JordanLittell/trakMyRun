TrakMyRun.Models.Comment = Backbone.Model.extend({ 
	urlRoot: "api/comments",

	userId: function() {
		return this._userId;
	},

	parse: function(resp) {
		if(resp){
			this._userId = resp.user_id;
			delete this._userId;
		}
		return resp
	}
});