require 'jwt'

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :create_client_token

  def create_client_token
    payload = { data: self.email + self.created_at.to_s }
    jwt_secret = ENV['PRODUCTION'] ? ENV['TIMIO_JWT_SECRET'] : 'fakesecret'
    token = JWT.encode payload, jwt_secret, 'HS256'
    self.update!(client_token: token)
  end
end
