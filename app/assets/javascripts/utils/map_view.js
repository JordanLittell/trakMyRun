Backbone.MapView = Backbone.View.extend({ 
	restartPolyLine: function () {
		this.initializeMap();
		this.markers.forEach(function(marker) {
			marker.setMap(null);
		});
		this.$el.find('.distance-field').text('0 Miles');
    this.$el.find('.elevation-field').text('0 ft');
	},

	initializeMap: function() {
          this.map = new google.maps.Map(this.$el.find('#map')[0], this.mapOptions);
          this.service = new google.maps.DirectionsService();
          this.path = new google.maps.MVCArray();
          this.elevationGain = 0;
          this.poly = new google.maps.Polyline({ map: this.map, strokeColor: "#0066FF" });
          this.elevations = new google.maps.ElevationService();
          this.distance = 0; //accumulator used to get total distance
          this.markers = [];
          this.elevationsAlongPath = [];
          this.mapOptions = {
    		zoom: 14,
    		center: new google.maps.LatLng(37.7749300, -122.4194200)
        };

        google.maps.event.addListener(this.map, "click", this.mapUpdated.bind(this));
    },

    placeMarker: function(evt) {
            var marker = new google.maps.Marker({ 
                position: evt.latLng, 
                map: this.map 
              });
            this.markers.push(marker);
            this.map.panTo(evt.latLng);
    },


    saveMap: function() {
  		var data = new TrakMyRun.Models.Map();
  		var view = this;

  		data.set({
  			"path": (JSON.stringify(this.poly.getPath())),
        "elevations": JSON.stringify(_.flatten(view.elevationsAlongPath)),
  			"total_miles": view.distance
  		});

  		data.save({},{
        success: function(resp, msg){
          $('.message-success').css('display','block').fadeOut(3500);
          view.restartPolyLine();
          }
        });
  		
	},

});