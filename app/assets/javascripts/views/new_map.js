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

	initialize: function (options) {
		this.listenTo(this.model,"sync", this.initializeMap);
	},

	events: {
		"click .create-new-map": "reload",
		"click #map": "updateDistance",
		"click .save-map": "saveMap",
		"click .restart": "restartPolyLine",
		"click .load-map": "loadMaps"
	},

	

	loadMaps: function () {
		var loadUrl = "users/"+this.model.get('id')+"/routes/load";
		console.log(loadUrl);
		Backbone.history.navigate(loadUrl, { trigger: true });
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

    
    

    // function plotElevation(resp, success) {
    //   console.log(resp[0].elevation)
    // }

    // google.maps.event.addDomListener(window, 'load', initialize);



});