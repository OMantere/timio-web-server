require 'rails_helper'

RSpec.describe Api::AppStatController do
  login_user

  let!(:usage_events) { JSON.parse(File.open('./spec/fixtures/json/client_events_data.json').read) }

  before(:each) do
    @request.env['devise.mapping'] = Devise.mappings[:user]
    @request.env['CONTENT_TYPE'] = 'application/json'
  end

  describe 'GET #index' do
    before do
      @user.events_to_db(usage_events)
      get 'index'
    end

    it 'returns 200 OK' do
      expect(@response.status).to eql 200
    end

    it 'to return the app stats correctly' do
      response = JSON.parse(@response.body).collect { |stat| stat.slice('name', 'total_seconds') }
      db_records = AppStat.where(user_id: @user.id).collect { |stat| stat.as_json.slice('name', 'total_seconds') }
      expect(response).to eq db_records
    end
  end

end