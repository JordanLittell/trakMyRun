TrakMyRun.Views.NewPost = Backbone.View.extend({
	
	template: JST["posts/new"],
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}, 

	events: {
		"submit #new-post-form" : "savePost",
		"slidechange .duration": "updateForm",
		"click .close-view": "closeView"
	}, 

	savePost: function (event) {
		event.preventDefault();
		var inputs = [".hours-value",".minutes-value",".seconds-value"];
		["#hours","#minutes", "#seconds"].forEach(function(typeDiv, ind){
			$(inputs[ind]).val($(typeDiv).text());
		});
		var formData = $('#new-post-form').serializeJSON();
		var post = new TrakMyRun.Models.Post(formData);
		post.save();
		Backbone.history.navigate("", { trigger: true });
	},

	closeView: function() {
		Backbone.history.navigate("", { trigger: true });
	},

	updateForm: function (ev, ui) {

	  var timeType = $(ev.currentTarget).data("time-type");
	  var value = ui.value
	  $("#"+timeType).html(value);
	  var age = this.model.get('age');
	  var heartRate = $("#heartRate").val();
	  var weight = this.model.get('weight');
	  var gender = this.model.get('gender');
	  var time = this.totalMinutes();
	  if (heartRate > 0) {
		  var result = this.getCaloriesBurned(age, weight, heartRate, gender, time);
		  $("#calories").html(result);
		}
	},

	setSliders: function () {
		$( ".duration" ).slider({
	        value: 0,
	        step: 1,
	        max: 59,
	        orientation: "vertical",
	        range: "min",
	        animate: true    
        });

        $("#hour").slider({
	        value: 0,
	        step: 1,
	        max: 10,
	        orientation: "vertical",
	        range: "min",
	        animate: true    
        });
	},

	totalMinutes: function() {
		var types = ["#hours","#minutes","#seconds"];
		var factors = [60, 1, (1/60)];
		var sum = 0;
		types.forEach(function(el, idx){
			sum += (parseInt($(el).text()) * factors[idx]);
		});
		return sum;
	},

	getCaloriesBurned: function (age, weight, heartRate, gender, totTime) {
		if (gender==='m') {
			var ageConst = 0.2017,
			 	weightConst = 0.09036,
			 	hrConst = 0.6309,
			 	subt = 55.0969;
		} else {
			 ageConst = 0.2017;
			 weightConst = 0.09036;
			 hrConst = 0.6309;
			 subt = 55.0969;
		}
		var numerator = (((age * ageConst) - (weight * weightConst) 
						+ (heartRate * hrConst) - subt) * totTime)
		return Math.round(numerator/4.184)
	}
});