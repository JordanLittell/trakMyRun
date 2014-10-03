

json.users @users do |user|
	json.id user.id
	json.username user.username
	json.gender user.gender
	json.image_url user.image_url 
	json.posts user.posts.includes(:comments) do |post| 
			json.id post.id
			json.heart_rate post.heart_rate
			json.minutes post.minutes 
			json.calories post.calories
			json.workout_type post.workout_type
			json.created_at post.created_at
	end
end

json.page @page
json.total_pages @users.total_pages



