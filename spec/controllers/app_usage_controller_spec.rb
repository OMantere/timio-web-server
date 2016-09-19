require 'rails_helper'

RSpec.describe Api::AppUsageController do
  login_user

  let!(:usage_events) { JSON.parse(File.open('./spec/fixtures/json/client_events_data.json').read) }

  before(:each) do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    @request.env['CONTENT_TYPE'] = 'application/json'
  end

  describe 'GET #index' do
    before do
      @user.events_to_usages(usage_events)
      get 'index'
    end

    it 'returns 200 OK' do
      expect(@response.status).to eql 200
    end

    it 'to return the app usages correctly' do
      response = JSON.parse(@response.body).collect { |_, type| type.collect { |usage| usage.slice('name') } }
      db_records = AppUsage.get_user_usages(@user).collect { |_, type| type.collect { |usage| usage.slice('name') } }
      expect(response).to eq db_records
    end
  end

end