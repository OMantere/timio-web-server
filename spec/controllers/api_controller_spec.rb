require 'rails_helper'
require 'jwt'

RSpec.describe Api::ClientController do
  before(:each) do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    @request.env['CONTENT_TYPE'] = 'application/json'
  end

  describe 'POST #get_token' do
    let!(:user) { create :user }
    let!(:user_creds) { JSON.parse(File.open('./spec/fixtures/json/user_creds.json').read) }

    before do
      post 'get_token', body: user_creds.to_json
    end

    it 'returns 200 OK' do
      expect(@response.status).to eql 200
    end

    it 'returns the client token correctly' do
      body = JSON.parse @response.body
      expect(body['success']).to eql true
      expect(body['client_token']).to eql user.client_token
    end
  end

  describe 'PUT #push_data' do
    let!(:user) { create :user }
    let!(:client_events_data) { JSON.parse(File.open('./spec/fixtures/json/client_events_data.json').read) }

    before do
      @request.headers['Access-Token'] = user.client_token
      put 'push_data', body: client_events_data.to_json
    end

    it 'returns 200 OK' do
      expect(@response.status).to eql 200
    end

    it 'persists the app stat data into the DB' do
      app_stats = AppStat.all
      expect(app_stats.where(name: 'Example App').size).to eql 1
      example_app_stat = app_stats.find_by(name: 'Example App')
      expect(example_app_stat.total_seconds).to eql 160

      expect(app_stats.where(name: 'Another Example App').size).to eql 1
      example2_app_stat = app_stats.find_by(name: 'Another Example App')
      expect(example2_app_stat.total_seconds).to eql 100
    end

    it 'persists the app usage data into the DB' do
      app_usages = AppUsage.all
      expect(app_usages.where(name: 'Example App').size).to eql 2
      expect(app_usages.where(name: 'Another Example App').size).to eql 1
    end

    it 'doesnt save anything on repeated request' do
      app_usages = AppUsage.all.to_json
      put 'push_data', body: client_events_data.to_json
      expect(app_usages).to eql AppUsage.all.to_json
    end
  end
end