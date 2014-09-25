TrakMyRun.Models.Comment = Backbone.Model.extend({ 
	urlRoot: "api/comments",
	user: function () {
		if(!this._user) {
			debugger;
			this._user = TrakMyRun.Collections.users.get(this._userId);
		} 
		return this._user;
	},

	parse: function(resp) {
		if(resp){
			this._userId = resp.user_id;
			delete resp;
			debugger;
		}
		return resp
	}
});