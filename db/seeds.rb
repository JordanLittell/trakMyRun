# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

images = ["http://blog.bullz-eye.com/wp-content/uploads/2012/01/winter_running_02.jpg","http://media3.onsugar.com/files/upl0/1/12981/09_2008/run-endorphins/i/Outdoor-Running-Boosts-Endorphins.jpg","http://www.womenshealthmag.com/files/images/yoga-for-runners.jpg","http://bestrunningshoesforwomen.org/wp-content/uploads/2010/11/iStock_000015615849XSmall-200x300.jpg","https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQc4j_KnvIEntfEYj7Zzi4J3UjKeuqSABtGSF-9ClAa3IPc4tMcSA",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQykFr3hr6VSjGGuAlyB5pb9-Bk7fSydtoCqGAathykcePxvDnL","https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTwgI5X9qtXzgbEDhaERsYlrIxamXgeH-m2rXSntyPiFg5Agvnu","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWArcdgjr2rHzYCrNCuDaf2O-uf7qbAIoBNUQDTD0aZEGnoNeb","https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSwowq4a1F3ULlxWwJYlWdg24kPlHqvCTkMpRMGAVsTwcV041E3mg"]


def generate_path
	return "{\"j\":[{\"k\":37.775757346832805,\"B\":-122.41950452502351},{\"k\":37.775760000000005,\"B\":-122.41947},{\"k\":37.779180000000004,\"B\":-122.42017000000001},{\"k\":37.78063,\"B\":-122.42045000000002},{\"k\":37.78063,\"B\":-122.42045000000002},{\"k\":37.781490000000005,\"B\":-122.42063000000002},{\"k\":37.782450000000004,\"B\":-122.42081},{\"k\":37.784310000000005,\"B\":-122.42120000000001},{\"k\":37.78526,\"B\":-122.42138000000001},{\"k\":37.785700000000006,\"B\":-122.42147000000001},{\"k\":37.785720000000005,\"B\":-122.42132000000001},{\"k\":37.78632,\"B\":-122.42144},{\"k\":37.78632,\"B\":-122.42144},{\"k\":37.788070000000005,\"B\":-122.42179000000002},{\"k\":37.789440000000006,\"B\":-122.42208000000001},{\"k\":37.790910000000004,\"B\":-122.42239000000001},{\"k\":37.79218,\"B\":-122.42263000000001},{\"k\":37.79214,\"B\":-122.42296},{\"k\":37.79214,\"B\":-122.42296},{\"k\":37.792170000000006,\"B\":-122.42277000000001},{\"k\":37.79262000000001,\"B\":-122.42288},{\"k\":37.793510000000005,\"B\":-122.42306},{\"k\":37.7948,\"B\":-122.42333},{\"k\":37.79574,\"B\":-122.4235},{\"k\":37.79807,\"B\":-122.42398000000001},{\"k\":37.79807,\"B\":-122.42398000000001},{\"k\":37.80041000000001,\"B\":-122.42446000000001},{\"k\":37.801260000000006,\"B\":-122.42460000000001},{\"k\":37.80136,\"B\":-122.42464000000001},{\"k\":37.80095,\"B\":-122.42786000000001},{\"k\":37.800110000000004,\"B\":-122.43445000000001},{\"k\":37.799890000000005,\"B\":-122.43610000000001},{\"k\":37.79948,\"B\":-122.43933000000001},{\"k\":37.79921,\"B\":-122.44146},{\"k\":37.79921,\"B\":-122.44146},{\"k\":37.79927,\"B\":-122.44098000000001},{\"k\":37.79918,\"B\":-122.44096},{\"k\":37.7974,\"B\":-122.44061},{\"k\":37.79365000000001,\"B\":-122.43985},{\"k\":37.791850000000004,\"B\":-122.43948},{\"k\":37.79164,\"B\":-122.44115000000001},{\"k\":37.79077,\"B\":-122.44096},{\"k\":37.78987,\"B\":-122.44079},{\"k\":37.78945,\"B\":-122.44069},{\"k\":37.78933,\"B\":-122.44071000000001},{\"k\":37.788340000000005,\"B\":-122.44051},{\"k\":37.788340000000005,\"B\":-122.44051},{\"k\":37.788070000000005,\"B\":-122.44045000000001},{\"k\":37.788070000000005,\"B\":-122.44036000000001},{\"k\":37.787130000000005,\"B\":-122.44018000000001},{\"k\":37.786190000000005,\"B\":-122.43999000000001},{\"k\":37.78526,\"B\":-122.43981000000001},{\"k\":37.784330000000004,\"B\":-122.43961000000002},{\"k\":37.783860000000004,\"B\":-122.43952000000002},{\"k\":37.783390000000004,\"B\":-122.43947000000001},{\"k\":37.783,\"B\":-122.43938000000001},{\"k\":37.78247,\"B\":-122.43924000000001},{\"k\":37.781530000000004,\"B\":-122.43905000000001},{\"k\":37.78112,\"B\":-122.43897000000001},{\"k\":37.78112,\"B\":-122.43897000000001},{\"k\":37.77501,\"B\":-122.43773000000002},{\"k\":37.77347,\"B\":-122.43741000000001},{\"k\":37.773140000000005,\"B\":-122.43735000000001},{\"k\":37.77317,\"B\":-122.43717000000001},{\"k\":37.77317,\"B\":-122.43717000000001},{\"k\":37.77335,\"B\":-122.43575000000001},{\"k\":37.77299,\"B\":-122.43568},{\"k\":37.77197,\"B\":-122.43547000000001},{\"k\":37.77149,\"B\":-122.43537},{\"k\":37.77165,\"B\":-122.43409000000001},{\"k\":37.77176,\"B\":-122.43322},{\"k\":37.772330000000004,\"B\":-122.42880000000001},{\"k\":37.77273,\"B\":-122.42554000000001},{\"k\":37.77295,\"B\":-122.42394000000002},{\"k\":37.77244,\"B\":-122.42384000000001},{\"k\":37.77178,\"B\":-122.42369000000001},{\"k\":37.77178,\"B\":-122.42369000000001},{\"k\":37.77199,\"B\":-122.42341},{\"k\":37.77295,\"B\":-122.42221},{\"k\":37.77349,\"B\":-122.42152000000002},{\"k\":37.77411,\"B\":-122.42072000000002},{\"k\":37.774350000000005,\"B\":-122.42039000000001},{\"k\":37.774440000000006,\"B\":-122.42019},{\"k\":37.775110000000005,\"B\":-122.41934},{\"k\":37.77508,\"B\":-122.41933000000002}],\"gm_accessors_\":{\"length\":null},\"length\":85,\"gm_bindings_\":{\"length\":{}}}"
end
def generate_elevations
	return "[16.13083839416504,22.42033958435059,16.13083839416504,47.81328964233398,16.13083839416504,61.13340377807617,16.13083839416504,32.51473236083984,16.13083839416504,15.61405181884766,16.13083839416504,57.91910171508789,16.13083839416504,54.29335403442383,16.13083839416504,59.28741455078125,16.13083839416504,21.13821792602539,16.13083839416504,15.68410491943359]"
end
def generate_date
	year = 2014 
	month = 1+Random.rand(9)
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

1.time do
	image_url = images[Random.rand(images.length)]
	User.create(
				username: 'GuestUser', 
				password_digest: BCrypt::Password.create('guestuser2691'),
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
	randNum = Random.rand(41)
	Post.create(
				user_id: (randNum),
				minutes: Random.rand(60),
				calories: Random.rand(2000),
				heart_rate: (120 + Random.rand(40)),
				workout_type: Faker::Lorem.word,
				created_at: Date.new(*generate_date)
		)
	Comment.create(
				content: Faker::Lorem.sentence,
				user_id: (randNum),
				post_id: Random.rand(100),
				created_at: Date.new(*generate_date)
		)
	Map.create(
		user_id: randNum,
		path: generate_path,
		total_miles: Random.rand(10),
		elevations: generate_elevations,
		created_at: Date.new(*generate_date)
		)
end