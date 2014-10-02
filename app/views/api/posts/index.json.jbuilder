@posts.each do |post|
	json.(post, :workout_type, :minutes, :calories, :heart_rate, :created_at,  	:updated_at, :user_id)
end