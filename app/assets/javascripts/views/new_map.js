TrakMyRun.Views.MapNew = Backbone.MapView.extend({
	template: JST["maps/new"],
	render: function() {
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		setTimeout(this.renderMap.bind(this, '#map'), 0);
		return this;
	},

	   
 	renderMap: function(selector) {

        handler = Gmaps.build('Google');
        handler.buildMap({ internal: {id: 'map' } }, function(){
            
            markers = handler.addMarkers([
            {
              "lat": 0,
              "lng": 0,
              "infowindow": "hello!"
            }
            ]);
        handler.bounds.extendWith(markers);
        handler.fitMapToBounds();
        });
 	}

});