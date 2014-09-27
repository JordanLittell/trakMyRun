# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

images = ["http://www.runnersworld.com/sites/default/files/Sprinter-500.jpg","http://blog.mec.ca/wp-content/uploads/2013/04/mec-spring-_u4a3495-running.jpg",
"http://cdn.running.competitor.com/files/2012/03/Good-Running-Form.jpg","http://static.guim.co.uk/sys-images/Lifeandhealth/Pix/pictures/2013/8/30/1377859318828/Dean-Karnazes-running-012.jpg",
"http://www.pearsonstudents.com/blog/wp-content/uploads/running.jpg", "http://static.hdw.eweb4.com/media/wp_400/1/1/7765.jpg",
"http://static.guim.co.uk/sys-images/Lifeandhealth/Pix/pictures/2013/4/8/1365416881669/Running-in-the-early-morn-008.jpg"]



20.times do 
	image_url = images[Random.rand(images.length)]
	User.create(
				username: Faker::Name.name, 
				age: Random.rand(50), 
				password_digest: BCrypt::Password.create(Faker::Internet.user_name),
				session_token: SecureRandom.urlsafe_base64,
				weight: Random.rand(180), 
				gender: "m", 
				height: Random.rand(7), 
				image_url: image_url
	)
end
10.times do
	image_url = images[Random.rand(images.length)]
	User.create(
				username: Faker::Name.name, 
				password_digest: BCrypt::Password.create(Faker::Internet.user_name),
				session_token: SecureRandom.urlsafe_base64,
				age: Random.rand(50), 
				weight: Random.rand(145), 
				gender: "f", 
				height: Random.rand(6),
				image_url: image_url
	)
end

100.times do |i|
	Post.create(
				user_id: (1+i%31),
				hours: Random.rand(10),
				minutes: Random.rand(60),
				calories: Random.rand(2000),
				heart_rate: (120 + Random.rand(40)),
				workout_type: Faker::Lorem.word
		)
	Comment.create(
				content: Faker::Lorem.sentence,
				user_id: (1+i%31),
				post_id: Random.rand(100)
		)
end