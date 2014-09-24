class User < ActiveRecord::Base
	validates :username, :password_digest, presence: true
	validates :password, length: { minimum: 6, allow_nil: true }
	after_initialize :ensure_session_token
	
	attr_accessor :password
	
	has_many :posts

	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
		@password
	end

	def reset_session_token 
		self.session_token = SecureRandom.urlsafe_base64
		self.save!
		self.session_token
	end

	def self.find_by_credentials(username, password) 
		user = User.find_by_username(username)
		p user
		if !user
			return nil
		end
		user.valid_password?(password) ? user : nil
	end

	def valid_password?(password)
	 	BCrypt::Password.new(self.password_digest).is_password?(password);
	end

	private 

		def ensure_session_token 
			self.session_token ||= SecureRandom.urlsafe_base64
		end

end
