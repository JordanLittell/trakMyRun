TrakMyRun.Views.MapShow = Backbone.MapView.extend({
	template: JST["maps/new"],
	mapLoadTemplate: JST["maps/load"],

	render: function() {
		var content = this.template({
			user: this.model
		});
		this.$el.html(content);
		this.initializeMap();
		window.BackboneMap = this.backboneMap;
		var mapChart = new TrakMyRun.Views.MapChart({
			model: this.backboneMap
		});

		this.addSubview('.chart', mapChart)
		return this;
	},

	initialize: function (options) {
		this.backboneMap = new TrakMyRun.Models.Map()
		this.listenTo(this.model,"sync", this.initializeMap);
	},

	events: {
		"click .create-new-map": "reload",
		"click .save-map": "save",
		"click .create-new-map": "restart",
		"click .load-options": "displayLoaded",
		"click .map-show-link": "updatePage",
		"click .close-icon": "closeView"
	},

	restart: function () {
		this.restartPolyLine();
		this.backboneMap.trigger("new");
	},

	save: function () {
		$('#map-chart').replaceWith("<canvas id='#map-chart'></canvas>");
		this.saveMap();
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
	            origin: this.path.getAt(this.path.getLength() - 1),
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
		    for (var i = 0, len = newPath.length; i < len; i++) {
		        this.path.push(result.routes[0].overview_path[i]);
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
    			console.log(view.backboneMap._events);

    			view.backboneMap.set({
    				"elevations": JSON.stringify(_.flatten(view.elevationsAlongPath)),
    				"markers": view.markers.map(function(marker){ return marker.getPosition() }),	
    				"total_miles": view.distance
    			});

    			
	    		var length = view.elevationsAlongPath.length
	    		view.elevationGain += view.calculateElevationChange(view.elevationsAlongPath[length - 1]);
    		}
    	});

    	
	}
});