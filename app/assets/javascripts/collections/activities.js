TrakMyRun.Collections.Activities = Backbone.Collection.extend({
	model: TrakMyRun.Models.Activity,
	url: "api/activities",
	getOrFetch: function(id) {
		var activities = this;
		var activity = activities.get(id);
		if(!activity) {
			activity = new TrakMyRun.Models.activity({id: id});
			activity.fetch({
				success: function () {
					activities.add(activity);
				}
			});
		} else {
			activity.fetch();
		}
		return activity;
	}

})