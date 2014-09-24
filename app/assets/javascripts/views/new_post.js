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
	}
});