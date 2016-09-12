require 'rails_helper'

RSpec.describe ApiController do

  describe 'PUT #push_client_data' do
    before do
      create :user
      @request.env["devise.mapping"] = Devise.mappings[:user]
      put 'push_client_data'
    end

    it 'returns 200 OK' do
      expect(response.status).to eq 200
    end

  end
end