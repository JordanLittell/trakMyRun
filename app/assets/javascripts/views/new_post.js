TrakMyRun.Views.NewPost = Backbone.View.extend({
	
	template: JST["posts/new"],
	
	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}, 

	initialize: function() {
		$('content').addClass('runner-background');
	},

	events: {
		"submit #new-post-form": "savePost",
		"click #map-it": "goToMap",
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
		var value  = $(event.currentTarget).parent().find('.infinite').val();
		this.$el.find($(elName)).val(value);
		var calories = this.getCaloriesBurned(
								this.model.get('age'),
								this.model.get('weight'),
								$('#heart_rate').val(),
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

	setup: function () {
		var view = this;
			$(function(){
			var navListItems = $('div.setup-panel div a'),
		        allWells = $('.setup-content'),
		        allNextBtn = $('.nextBtn');

			allWells.hide();
			$('.infinite').val(0);
			$(".infinite").knob({
				'min': 0,
				'max':300,
			    'bgColor': '#121212',
			    'fontWeight': 100,
			    'skin': 'tron',
			    'thickness': 0.2,
			    'width': '300',
			    'height':'300',
			    'cursor': true,
			    'value': 0
			});

			navListItems.click(function (e) {
			    e.preventDefault();
			    var $target = $($(this).attr('href')),
			            $item = $(this);

			    if (!$item.hasClass('disabled')) {
			        navListItems.removeClass('btn-primary').addClass('btn-default');
			        $item.addClass('btn-primary');
			        allWells.hide();
			        $target.show();
			        $target.find('input:eq(0)').focus();
			    }
			});

			allNextBtn.click(function(){
			    var curStep = $(this).closest(".setup-content"),
			        curStepBtn = curStep.attr("id"),
			        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
			        curInputs = curStep.find("input[type='text'],input[type='url']"),
			        isValid = true;

			    $(".form-group").removeClass("has-error");
			    for(var i=0; i < curInputs.length; i++){
			        if (!curInputs[i].validity.valid){
			            isValid = false;
			            $(curInputs[i]).closest(".form-group").addClass("has-error");
			        }
			    }

			    if (isValid)
			        nextStepWizard.removeAttr('disabled').trigger('click');
			});

			$('div.setup-panel div a.btn-primary').trigger('click');

			
			$(".close-form").on('click', function(event){
				event.preventDefault();
				var formId = $(event.currentTarget).data('form-id');
				$(formId).slideUp('slow');
			});
			view.setSliders();
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