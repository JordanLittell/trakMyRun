TrakMyRun.Views.NewPost = Backbone.View.extend({
	
	template: JST["posts/new"],
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}, 

	initialize: function() {
		$('content').addClass('runner-background');
		var list = Backbone.SportsList();
		$(function() {
			$( "#type" ).autocomplete({
				source: list
			});	
		});
	},

	events: {
		"submit #new-post-form": "savePost",
		"click #map-it": "goToMap",
		"slidechange .duration": "updateForm",
		"release .infinte": "cacheMinutes",
		"click .cache": "updateForm",
	}, 

	goToMap: function(){
		this.savePost();
		Backbone.history.navigate('users/'+this.model.get('id')+"/routes/show", { trigger: true})
	},

	validate: function(data) {
		var values = ['heart_rate','workout_type','minutes'];
		values.forEach(function(value){
			if (data[value].split('').length === 0) {
				console.log('error error');
			}
		});
	},

	savePost: function () {
		event.preventDefault();
		var $form = this.$el.find($('#new-post-form'));
		var formData = $form.serializeJSON();
		this.validate(formData.post);
		var post = new TrakMyRun.Models.Post(formData);
		post.save();
		Backbone.history.navigate("", { trigger: true });
	},

	updateForm: function (event) {
		var elName = $(event.currentTarget).data('cache');
		var value  = $('.infinite').val();
		this.$el.find($(elName)).val(value);
		var calories = this.getCaloriesBurned(
								this.model.get('age'),
								this.model.get('weight'),
								$('#heart-rate').val(),
								this.model.get('gender'),
								value
								);
		if (typeof calories === "NaN") {
			return false;
		} else {
			$('#calories').val(calories)
			return true;
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
		var numerator = (((age * ageConst) - ((weight/2.2) * weightConst) 
						+ (heartRate * hrConst) - subt) * totTime)
		return Math.round(numerator/4.184)
	}
});