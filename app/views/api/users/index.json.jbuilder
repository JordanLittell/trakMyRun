json.users @users do |user|
	json.id user.id
	json.username user.username
	json.gender user.gender 

	json.posts user.posts do |post| 
		json.id post.id
		json.hours post.hours
		json.minutes post.minutes 
		json.seconds post.seconds 
		json.calories post.calories
		json.workout_type post.workout_type
		json.comments post.comments do |comment|
			json.content comment.content
			json.user_id comment.user_id
			json.post_id comment.post_id 
		end
	end
end