TrakMyRun.Collections.Maps = Backbone.Collection.extend({
	model: TrakMyRun.Models.Map,
	url: "api/maps",
	
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
	}

});

TrakMyRun.Collections.maps = new TrakMyRun.Collections.Maps();