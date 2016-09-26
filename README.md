# Timio

Timio is is a web service for tracking your technology usage on all of your devices for productivity, fun and lulz.

Check it out at https://timio.herokuapp.com

## Getting started

### Running the project

To run the project you'll need to run:

`bundle install`

`rake db:setup`

`npm install`

Optionally, `rake db:populate`, which will put a test user `test@test.com` with password `testestest` and some sample data into the database.

Start the server: `rails s`

And then you are ready to go.

## Testing

Rails tests use [rspec](http://rspec.info/), whose documentation can be found [here](http://rspec.info/documentation/3.4/rspec-rails/)

To run Rails tests, use the command `rspec`.

## Deploy

Buildpacks:

`heroku buildpacks:set heroku/ruby`

`heroku buildpacks:add --index 1 heroku/nodejs`

After the build is done:
 
`heroku run rake db:setup`
 
Optionally, `heroku run rake db:populate`, which will put a test user `test@test.com` with password `testestest` and some sample data into the database.
