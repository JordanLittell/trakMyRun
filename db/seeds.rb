# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

20.times do 
	User.create(
				username: Faker::Name.name, 
				age: Random.rand(50), 
				password_digest: BCrypt::Password.create(Faker::Internet.user_name),
				session_token: SecureRandom.urlsafe_base64,
				weight: Random.rand(180), 
				gender: "m", 
				height: Random.rand(7) 
	)
end
10.times do
	User.create(
				username: Faker::Name.name, 
				password_digest: BCrypt::Password.create(Faker::Internet.user_name),
				session_token: SecureRandom.urlsafe_base64,
				age: Random.rand(50), 
				weight: Random.rand(145), 
				gender: "f", 
				height: Random.rand(6) 
	)
end

100.times do |i|
	Post.create(
				user_id: (1+i%31),
				hours: Random.rand(10),
				minutes: Random.rand(60),
				calories: Random.rand(2000),
				workout_type: Faker::Lorem.word
		)
	Comment.create(
				content: Faker::Lorem.sentence,
				user_id: (1+i%31),
				post_id: Random.rand(100)
		)
end