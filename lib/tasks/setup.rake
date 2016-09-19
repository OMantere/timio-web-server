namespace :db do

  desc 'populate with sample data'
  task populate: :environment do
    user_email = 'test@test.com'
    unless User.find_by(email: user_email).nil?
      puts 'DB already initialized, aborting'
      next
    end
    user = User.create!(email: user_email, password: 'testestest')
    events_json = JSON.parse(File.open(Rails.root.join('spec/fixtures/json/client_events_data.json')).read)
    user.events_to_usages(events_json)
  end

end