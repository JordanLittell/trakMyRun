json.(@user, :id, :username, :weight, :age, :gender, :height, :image_url, :state, :city)
json.maps @user.maps do |map|
	json.id map.id
	json.name map.name
	json.markers map.markers
	json.total_miles map.total_miles
	json.elevations map.elevations
	json.user_id map.user_id
	json.path map.path
	json.elevation_gain map.elevation_gain
	json.created_at map.created_at
end
json.posts @posts do |post| 
	json.id post.id
	json.created_at post.created_at
	json.user_id post.user_id
	json.heart_rate post.heart_rate
	json.minutes post.minutes 
	json.calories post.calories
	json.workout_type post.workout_type
	json.comments post.comments do |comment|
		json.content comment.content
		json.user_id comment.user_id
		json.post_id comment.post_id 
	end
end