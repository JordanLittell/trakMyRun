json.users @users do |user|
	json.id user.id
	json.username user.username
	json.gender user.gender
	json.image_url user.image_url 
	json.posts user.posts do |post| 
		json.id post.id
		json.heart_rate post.heart_rate
		json.minutes post.minutes 
		json.calories post.calories
		json.workout_type post.workout_type
		json.comments post.comments do |comment|
			json.content comment.content
			json.user_id comment.user_id
			json.post_id comment.post_id 
			json.id comment.id
		end
	end
end

json.page @page
json.total_pages @users.total_pages



