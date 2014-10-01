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
"http://static.guim.co.uk/sys-images/Lifeandhealth/Pix/pictures/2013/4/8/1365416881669/Running-in-the-early-morn-008.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu625OVefCCovBjdKkKjC0ukur5ozj5FTeFXtXNgLsW9WdxprL",
"http://www.crazywatersurfschool.co.uk/wp-content/uploads/fitness-running.jpg","http://www.lifestyleupdated.com/wp-content/uploads/2013/04/fitness-running.jpg",
"http://www.gymcompany.co.uk/_uploads/blog/woman_running1.jpg", "http://cdn.womensrunning.competitor.com/wp-content/uploads/2013/02/Canyon-Mountain-Run.jpg",
"http://www.ballnroll.com/Uploads/Blogs/Fitness/running-sun-over202.JPG","http://www.recommended.co.nz/files/users/Howcast/running3.gif",
"https://www.pixoto.com/images-photography/sports-and-fitness/running/running-in-the-rain-66419075.jpg",
"http://static.tumblr.com/y2clztm/1lWm6sw0q/running-man.jpg"]


def generate_path
	return "{\"j\":[{\"k\":37.775757346832805,\"B\":-122.41950452502351},{\"k\":37.775760000000005,\"B\":-122.41947},{\"k\":37.779180000000004,\"B\":-122.42017000000001},{\"k\":37.78063,\"B\":-122.42045000000002},{\"k\":37.78063,\"B\":-122.42045000000002},{\"k\":37.781490000000005,\"B\":-122.42063000000002},{\"k\":37.782450000000004,\"B\":-122.42081},{\"k\":37.784310000000005,\"B\":-122.42120000000001},{\"k\":37.78526,\"B\":-122.42138000000001},{\"k\":37.785700000000006,\"B\":-122.42147000000001},{\"k\":37.785720000000005,\"B\":-122.42132000000001},{\"k\":37.78632,\"B\":-122.42144},{\"k\":37.78632,\"B\":-122.42144},{\"k\":37.788070000000005,\"B\":-122.42179000000002},{\"k\":37.789440000000006,\"B\":-122.42208000000001},{\"k\":37.790910000000004,\"B\":-122.42239000000001},{\"k\":37.79218,\"B\":-122.42263000000001},{\"k\":37.79214,\"B\":-122.42296},{\"k\":37.79214,\"B\":-122.42296},{\"k\":37.792170000000006,\"B\":-122.42277000000001},{\"k\":37.79262000000001,\"B\":-122.42288},{\"k\":37.793510000000005,\"B\":-122.42306},{\"k\":37.7948,\"B\":-122.42333},{\"k\":37.79574,\"B\":-122.4235},{\"k\":37.79807,\"B\":-122.42398000000001},{\"k\":37.79807,\"B\":-122.42398000000001},{\"k\":37.80041000000001,\"B\":-122.42446000000001},{\"k\":37.801260000000006,\"B\":-122.42460000000001},{\"k\":37.80136,\"B\":-122.42464000000001},{\"k\":37.80095,\"B\":-122.42786000000001},{\"k\":37.800110000000004,\"B\":-122.43445000000001},{\"k\":37.799890000000005,\"B\":-122.43610000000001},{\"k\":37.79948,\"B\":-122.43933000000001},{\"k\":37.79921,\"B\":-122.44146},{\"k\":37.79921,\"B\":-122.44146},{\"k\":37.79927,\"B\":-122.44098000000001},{\"k\":37.79918,\"B\":-122.44096},{\"k\":37.7974,\"B\":-122.44061},{\"k\":37.79365000000001,\"B\":-122.43985},{\"k\":37.791850000000004,\"B\":-122.43948},{\"k\":37.79164,\"B\":-122.44115000000001},{\"k\":37.79077,\"B\":-122.44096},{\"k\":37.78987,\"B\":-122.44079},{\"k\":37.78945,\"B\":-122.44069},{\"k\":37.78933,\"B\":-122.44071000000001},{\"k\":37.788340000000005,\"B\":-122.44051},{\"k\":37.788340000000005,\"B\":-122.44051},{\"k\":37.788070000000005,\"B\":-122.44045000000001},{\"k\":37.788070000000005,\"B\":-122.44036000000001},{\"k\":37.787130000000005,\"B\":-122.44018000000001},{\"k\":37.786190000000005,\"B\":-122.43999000000001},{\"k\":37.78526,\"B\":-122.43981000000001},{\"k\":37.784330000000004,\"B\":-122.43961000000002},{\"k\":37.783860000000004,\"B\":-122.43952000000002},{\"k\":37.783390000000004,\"B\":-122.43947000000001},{\"k\":37.783,\"B\":-122.43938000000001},{\"k\":37.78247,\"B\":-122.43924000000001},{\"k\":37.781530000000004,\"B\":-122.43905000000001},{\"k\":37.78112,\"B\":-122.43897000000001},{\"k\":37.78112,\"B\":-122.43897000000001},{\"k\":37.77501,\"B\":-122.43773000000002},{\"k\":37.77347,\"B\":-122.43741000000001},{\"k\":37.773140000000005,\"B\":-122.43735000000001},{\"k\":37.77317,\"B\":-122.43717000000001},{\"k\":37.77317,\"B\":-122.43717000000001},{\"k\":37.77335,\"B\":-122.43575000000001},{\"k\":37.77299,\"B\":-122.43568},{\"k\":37.77197,\"B\":-122.43547000000001},{\"k\":37.77149,\"B\":-122.43537},{\"k\":37.77165,\"B\":-122.43409000000001},{\"k\":37.77176,\"B\":-122.43322},{\"k\":37.772330000000004,\"B\":-122.42880000000001},{\"k\":37.77273,\"B\":-122.42554000000001},{\"k\":37.77295,\"B\":-122.42394000000002},{\"k\":37.77244,\"B\":-122.42384000000001},{\"k\":37.77178,\"B\":-122.42369000000001},{\"k\":37.77178,\"B\":-122.42369000000001},{\"k\":37.77199,\"B\":-122.42341},{\"k\":37.77295,\"B\":-122.42221},{\"k\":37.77349,\"B\":-122.42152000000002},{\"k\":37.77411,\"B\":-122.42072000000002},{\"k\":37.774350000000005,\"B\":-122.42039000000001},{\"k\":37.774440000000006,\"B\":-122.42019},{\"k\":37.775110000000005,\"B\":-122.41934},{\"k\":37.77508,\"B\":-122.41933000000002}],\"gm_accessors_\":{\"length\":null},\"length\":85,\"gm_bindings_\":{\"length\":{}}}"
end
def generate_elevations
	return "[16.13083839416504,22.42033958435059,16.13083839416504,47.81328964233398,16.13083839416504,61.13340377807617,16.13083839416504,32.51473236083984,16.13083839416504,15.61405181884766,16.13083839416504,57.91910171508789,16.13083839416504,54.29335403442383,16.13083839416504,59.28741455078125,16.13083839416504,21.13821792602539,16.13083839416504,15.68410491943359]"
end
def generate_date
	year = 2010 
	month = 1+Random.rand(3)
	return [year, month]
end

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
				image_url: image_url,
				created_at: Date.new(*generate_date)
	)
end
20.times do
	image_url = images[Random.rand(images.length)]
	User.create(
				username: Faker::Name.name, 
				password_digest: BCrypt::Password.create(Faker::Internet.user_name),
				session_token: SecureRandom.urlsafe_base64,
				age: Random.rand(50), 
				weight: Random.rand(145), 
				gender: "f", 
				height: Random.rand(6),
				image_url: image_url,
				created_at: Date.new(*generate_date)
	)
end

1700.times do |i|
	Post.create(
				user_id: (1+i%41),
				minutes: Random.rand(60),
				calories: Random.rand(2000),
				heart_rate: (120 + Random.rand(40)),
				workout_type: Faker::Lorem.word,
				created_at: Date.new(*generate_date)
		)
	Comment.create(
				content: Faker::Lorem.sentence,
				user_id: (1+i%41),
				post_id: Random.rand(100),
				created_at: Date.new(*generate_date)
		)
	Map.create(
		user_id: (1+i%41),
		path: generate_path,
		total_miles: Random.rand(10),
		elevations: generate_elevations,
		created_at: Date.new(*generate_date)
		)
end