Backbone.MapView = Backbone.View.extend({ 
	restartPolyLine: function () {
		this.initializeMap();
		this.markers.forEach(function(marker) {
			marker.setMap(null);
		});
		this.$el.find('.distance-field').text('0 Miles');
	},

	initializeMap: function() {
    	
          this.map = new google.maps.Map(this.$el.find('#map')[0], this.mapOptions);
          this.service = new google.maps.DirectionsService();
          this.path = new google.maps.MVCArray();
          this.poly = new google.maps.Polyline({ map: this.map, strokeColor: "#0066FF" });
          this.elevationService = new google.maps.ElevationService();
          this.distance = 0; //accumulator used to get total distance
          this.markers = [];
          this.mapOptions = {
    		zoom: 14,
    		center: new google.maps.LatLng(37.7749300, -122.4194200)
        };

        google.maps.event.addListener(this.map, "click", this.mapUpdated.bind(this));
    },


    placeMarker: function(position) {
            var marker = new google.maps.Marker({
                position: position,
                map: this.map
            });
            this.map.panTo(position);
    },

    
	loadMaps: function () {
		var loadUrl = "users/"+this.model.get('id')+"/routes/load";
		console.log(loadUrl);
		Backbone.history.navigate(loadUrl, { trigger: true });
	},


    saveMap: function() {
		// console.log(JSON.stringify(this.poly.getPath()));
		var data = new TrakMyRun.Models.Map();
		var view = this;
		console.log(this.poly.getPath())
		data.set({
			"path": (JSON.stringify(this.poly.getPath())),
			"total_miles": view.distance
		});
		data.save();
		this.restartPolyLine();
		alert("you have just saved a map!!");
	},

});