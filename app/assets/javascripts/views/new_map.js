TrakMyRun.Views.MapNew = Backbone.MapView.extend({
	template: JST["maps/new"],

	render: function() {
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		this.initializeMap();
		return this;
	},

	initialize: function () {
		this.listenTo(this.model,"sync", this.initializeMap);
	},

	events: {
		"click .create-new-map": "reload",
		"click #map": "updateDistance",
		"click .save-map": "saveMap",
		"click .restart": "restartPolyLine"
	},

	reload: function() {
		window.location.reload();
	},

	restartPolyLine: function () {
		this.initializeMap();
		this.markers.forEach(function(marker) {
			marker.setMap(null);
		});
		this.$el.find('.distance-field').text('0 Miles');

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
	},

	mapUpdated: function(evt) {
	    if (this.path.getLength() === 0) {
	      this.path.push(evt.latLng);
	      this.poly.setPath(this.path);
	   
	      var marker = new google.maps.Marker({
            position: evt.latLng,
            map: this.map
	      });
	      //add marker
	      this.markers.push(marker);

	    } else {

          this.service.route({
	            //origin is previous point in array
	            origin: this.path.getAt(this.path.getLength() - 1),
	            //destination is point that has just been clicked
	            destination: evt.latLng,
	            travelMode: google.maps.DirectionsTravelMode.WALKING
           }, this.extendPath.bind(this, evt)) 
      	}
	},

	extendPath: function(evt, result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		    this.distance += result.routes[0].legs[0].distance.value*(0.000621371);
		    var distanceString = parseFloat(this.distance).toFixed(3);
		    
		    this.$el.find('.distance-field').text(distanceString.concat(' miles'));
		    var newPath = result.routes[0].overview_path;
		    var marker = new google.maps.Marker({ position: evt.latLng, map: this.map });
		    //add marker
		    this.markers.push(marker);
		    for (var i = 0, len = newPath.length; i < len; i++) {
		    
		        this.path.push(result.routes[0].overview_path[i]);
		        var pathRequest = {
		            'path': this.path.getArray(),
		            'samples': 256
		        }     
		    }
		}
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

    // function plotElevation(resp, success) {
    //   console.log(resp[0].elevation)
    // }

    // google.maps.event.addDomListener(window, 'load', initialize);



});