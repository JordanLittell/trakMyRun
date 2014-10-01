TrakMyRun.Collections.Maps = Backbone.Collection.extend({
	model: TrakMyRun.Models.Map,
	url: "api/maps",
	comparator: function(model) {
		return Date.parse(model.get('created_at'));
	},
	getOrFetch: function(id) {
		var maps = this;
		var map = maps.get(id);
		if(!map) {
			map = new TrakMyRun.Models.Map({id: id});
			map.fetch({
				success: function () {
					maps.add(map);
				}
			});
		} else {
			map.fetch();
		}
		return map;
	},

	reverse: function() {
     	this.models = this.sortBy(function(model){
        	return -Date.parse(model.get('created_at'));
        }, this);
      return this;
    },

});

TrakMyRun.Collections.maps = new TrakMyRun.Collections.Maps();