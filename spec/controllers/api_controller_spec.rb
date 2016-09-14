require 'rails_helper'

RSpec.describe ApiController do
  describe 'PUT #push_client_data' do
    let!(:client_events_data) { JSON.parse(File.open('./spec/fixtures/json/client_events_data.json').read) }

    before do
      user = create :user
      @request.env["devise.mapping"] = Devise.mappings[:user]
      @request.headers['Access-Token'] = user.client_token
      request.env['CONTENT_TYPE'] = 'application/json'
      put 'push_client_data', client_events_data.to_json
    end

    it 'returns 200 OK' do
      expect(response.status).to eq 200
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