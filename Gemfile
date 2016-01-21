source 'https://rubygems.org'

ruby '2.2.3'

gem 'rails', '4.2.1'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'turbolinks'
gem 'jbuilder', '~> 2.0'
gem 'devise'
gem 'sprockets-rails', :require => 'sprockets/railtie'
gem 'bower-rails'
gem 'angular-rails-templates'
gem 'angular_rails_csrf'
gem 'dotenv-rails', :groups => [:development, :test, :production]

group :production, :staging do
   gem "rails_12factor"
   gem 'pg'
   gem 'puma'
   gem "rails_stdout_logging"
   gem "rails_serve_static_assets"
end

group :development, :test do
  gem 'foreman'
  gem 'shoulda-matchers'
  gem 'database_cleaner'
  gem 'factory_girl_rails'
  gem 'rspec-rails', '~> 3.0'
  gem 'teaspoon-jasmine'
  gem 'phantomjs'
  gem 'pry-rails'
  gem 'sqlite3'
  gem 'byebug'
  gem 'web-console', '~> 2.0'
  gem 'spring'
end

