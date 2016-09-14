require 'rails_helper'
require 'jwt'

RSpec.describe ApiController do
  before(:each) do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    @request.env['CONTENT_TYPE'] = 'application/json'
  end

  describe 'POST #get_client_token' do
    let!(:user) { create :user }
    let!(:user_creds) { JSON.parse(File.open('./spec/fixtures/json/user_creds.json').read) }

    before do
      post 'get_client_token', body: user_creds.to_json
    end

    it 'returns 200 OK' do
      expect(@response.status).to eq 200
    end

    it 'returns the client token correctly' do
      body = JSON.parse @response.body
      expect(body['success']).to eq true
      expect(body['client_token']).to eq user.client_token
    end
  end

  describe 'PUT #push_client_data' do
    let!(:user) { create :user }
    let!(:client_events_data) { JSON.parse(File.open('./spec/fixtures/json/client_events_data.json').read) }

    before do
      @request.headers['Access-Token'] = user.client_token
      put 'push_client_data', body: client_events_data.to_json
    end

    it 'returns 200 OK' do
      expect(@response.status).to eq 200
    end

    it 'persists the app stat data into the DB' do
      app_stats = AppStat.all
      expect(app_stats.where(name: 'Example App').size).to eq 1
      example_app_stat = app_stats.find_by(name: 'Example App')
      expect(example_app_stat.total_seconds).to eq 160

      expect(app_stats.where(name: 'Another Example App').size).to eq 1
      example2_app_stat = app_stats.find_by(name: 'Another Example App')
      expect(example2_app_stat.total_seconds).to eq 100
    end

    it 'persists the app usage data into the DB' do
      app_usages = AppUsage.all
      expect(app_usages.where(name: 'Example App').size).to eq 2
      expect(app_usages.where(name: 'Another Example App').size).to eq 1
    end
  end
end