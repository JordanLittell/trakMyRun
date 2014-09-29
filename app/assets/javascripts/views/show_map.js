TrakMyRun.Views.MapShow = Backbone.MapView.extend({
	template: JST["maps/new"],
	mapLoadTemplate: JST["maps/load"],

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
		"click .create-new-map": "restartPolyLine",
		"click .load-options": "displayLoaded",
		"click .map-show-link": "updatePage",
		"click .close-icon": "closeView"
	},

	displayLoaded: function() {
		// user jquery slideDown to display saved maps
		this.collection = this.model.maps();
		var content = this.mapLoadTemplate({
			maps: this.collection
		});
		$('.previous-maps').html(content).slideDown("slow");
	},

	closeView: function(event){
		var view = $(event.currentTarget).parents().eq(3);
		$(view).slideUp();
	},
	
	fetchMap: function(evt) {
		var target = evt.currentTarget;
		var mapId = $(target).data('map-id');
		var result = this.model.maps().get(mapId);
		return result;
	},

	parseToGmap: function (json) {
		var latLnArray = [];
		json.j.forEach(function(obj){
			latLnArray.push( new google.maps.LatLng(obj.k , obj.B ))
		})
		this.poly = new google.maps.Polyline({ path: latLnArray, map: this.map, strokeColor: "#0066FF" }); 
		this.poly.setMap(this.map);
		return this.poly
	},

	updatePage: function(evt) {
		this.restartPolyLine();
		var map = this.fetchMap(evt),
			miles = map.get('total_miles');

		this.parseToGmap(JSON.parse(map.get('path')));
		this.$el.find('.distance-field').html(miles);
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
		var view = this;
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
		    }
		    var pathRequest = {
		            locations: this.path.getArray()
		        };
		    this.elevations.getElevationForLocations(pathRequest,function(result, status){
		    	if(status === google.maps.ElevationStatus.OK) {
		    		view.elevationsAlongPath.push(_.map(result,function(res){
		    			return res.elevation;
		    		}));
		    	}
		    });
		}
	},
});