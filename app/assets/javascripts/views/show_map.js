TrakMyRun.Views.MapShow = Backbone.MapView.extend({
	template: JST["maps/new"],
	mapLoadTemplate: JST["maps/load"],

	render: function() {
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		this.initializeMap();
		
		var mapChart = new TrakMyRun.Views.MapChart({
			model: this.backboneMap
		});
		this.addSubview('.chart', mapChart)

		return this;
	},

	initializeSearch: function () {
		var input = document.getElementById('search-field');
		// debugger;
		var autocomplete = new google.maps.places.Autocomplete(input);
  		// autocomplete.bindTo('bounds', this.map);
  		this.bindPlaceChange(autocomplete);
	},

	initialize: function (options) {
		if (parseInt(this.model.get('id')) !== TrakMyRun.CurrentUser) {
			Backbone.history.navigate('users/' + TrakMyRun.CurrentUser + '/routes/show');
		}
		this.backboneMap = new TrakMyRun.Models.Map()
		this.listenTo(this.model,"sync", this.initializeMap);
		this.listenTo(this.model.maps(), "add", this.addMap);
	},

	bindPlaceChange: function (autocomplete) {
		var view = this;
		google.maps.event.addListener(autocomplete, 'place_changed', function() {
		    var place = autocomplete.getPlace();
		    if (!place.geometry) {
		      return;
		    }
		    // If the place has a geometry, then present it on a map.
		    if (place.geometry.viewport) {
		      view.map.fitBounds(place.geometry.viewport);
		    } else {
		      view.map.setCenter(place.geometry.location);
		      view.map.setZoom(17);  // Why 17? Because it looks good.
		    }
		})
	},

	setCenter: function (lat, lng) {
		this.mapOptions = {
    		    zoom: 14,
    		    center: new google.maps.LatLng(lat, lng)
          };
	},

	events: {
		"click .create-new-map": "reload",
		"click .create-new-map": "restart",
		"click .load-options": "displayLoaded",
		"click .map-show-link": "updatePage",
		"click .close-icon": "closeView",
		"click .elevation": "delegateShowElevations",
		"click .edit": "editCurrentMap",
		"click .save-map": "save",
		"focus .searchbar": "initializeSearch"
	},

	redoPt: function () {
		if(this.pathCache.length > 1) {
			this.path.push(this.pathCache.shift());
			this.markers.push(this.markerCache.shift());
		} else {
			console.log('none left');	
		}
	},

	removePointsAlongPath: function(path) {
		var array = this.poly.getPath().getArray();
		this.endMarker = this.markers[this.markers.length-1];	
		path.forEach(function(point){
			var idx = array.indexOf(point);
			array.splice(idx, 1);
		});
		return this.poly.getPath();
	},

	undoPath: function () {
		var lastPath = this.pathCache.pop();
		var arr = this.removePointsAlongPath(lastPath);
		this.poly.setPath(arr);
		this.endMarker.setMap(null);
		this.markers.pop();
	},

	editCurrentMap: function (event) {
		var action = $(event.currentTarget).data("action");
		this[action]();
	},

	delegateShowElevations: function () {
		this.backboneMap.trigger('showElevations');
	},

	restart: function () {
		this.restartPolyLine();
		this.backboneMap.trigger("new");
	},

	save: function () {
		var loading = $("<div class='loading'></div>");

		this.saveMap();
		this.initialize();
		this.model.fetch({
			success: function() {
				loading.remove()
			}
		});
		this.render();
		$('.sidebar').append(loading);
	},


	displayLoaded: function() {
		// user jquery slideDown to display saved maps
		this.collection = this.model.maps();
		var content = this.mapLoadTemplate({
			maps: this.collection.reverse()
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
			latLnArray.push( new google.maps.LatLng(obj.lat() , obj.lng()) )
		})
		this.poly = new google.maps.Polyline({ path: latLnArray, map: this.map, strokeColor: "#0066FF" }); 
		this.poly.setMap(this.map);
		return this.poly
	},

	updatePage: function(evt) {
		this.restartPolyLine();
		var map = this.fetchMap(evt),
			miles = this.map.get('total_miles');

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

	      this.markers.push(marker);

	    } else {
          this.service.route({
	            origin: this.path.getAt(this.path.getArray().length - 1),
	            destination: evt.latLng,
	            travelMode: google.maps.DirectionsTravelMode.WALKING
           }, this.extendPath.bind(this, evt)) 
      	}
	},

	calculateElevationChange: function(elev) {
		var acc = 0,
			pos = 0,
			sub = 0;
		elev.forEach(function(el,idx){
			var diff = elev[idx+1] - el;
			if (diff > 0 ) { pos += diff; } 
			if (diff < 0 ) { sub += diff; }
			if (typeof elev[idx + 1] === "undefined") { acc += 0; }
		});
		return pos;
	},

	extendPath: function(evt, result, status) {
		var view = this;
		if (status == google.maps.DirectionsStatus.OK) {
		    this.distance += result.routes[0].legs[0].distance.value*(0.000621371);
		    this.placeMarker(evt);
		    this.updateDisplays();

		    var newPath = result.routes[0].overview_path;
		    this.pathCache.push(newPath);		

		    for (var i = 0, len = newPath.length; i < len; i++) {
		        this.path.push(newPath[i]);
		    }
		    this.updateElevations({
	            path: this.path.getArray(),
	            samples: 2
		    });    
		}
	},

	parseToGmap: function (json) {
	    var latLnArray = [];
	    json.j.forEach(function(obj,el){
	      latLnArray.push( new google.maps.LatLng(obj.k , obj.B ))
	    });
	    this.poly = new google.maps.Polyline({ path: latLnArray, map: this.map, strokeColor: "#0066FF" }); 
	    this.poly.setMap(this.map);
	    return this.poly
	},

	updateDisplays: function () {
		var distanceString = parseFloat(this.distance).toFixed(3);
		this.$el.find('.distance-field').text(distanceString.concat(' miles'));
		this.$el.find('.elevation-field').text(parseFloat(this.elevationGain).toFixed(3)+'ft');   
	},

	updateElevations: function (pathRequest) {
		var view = this;
		this.elevations.getElevationAlongPath(pathRequest,function(result, status){
    		if(status === google.maps.ElevationStatus.OK) {
    			view.elevationsAlongPath.push(_.map(result,function(res){
    				return res.elevation;
    			}));
    			view.backboneMap.set({
    				"elevations": JSON.stringify(_.flatten(view.elevationsAlongPath)),
    				"markers": view.markers.map(function(marker){ return marker.getPosition() }),	
    				"total_miles": view.distance
    			});

	    		var length = view.elevationsAlongPath.length
	    		view.elevationGain += view.calculateElevationChange(view.elevationsAlongPath[length - 1]);
    		}
    	});
	},

	getDistance: function(p1, p2) {
		function rad(x) {
	  		return x * Math.PI / 180;
		};

		var R = 6378137, // Earth’s mean radius in meter
		dLat = rad(p2.lat() - p1.lat()),
		dLong = rad(p2.lng() - p1.lng()),
		a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
		Math.sin(dLong / 2) * Math.sin(dLong / 2);
		 c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		 d = R * c;
		return d; // returns the distance in meters
	}
});