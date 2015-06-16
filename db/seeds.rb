# default user account
User.create email: ENV['username'], password: ENV['password'], password_confirmation: ENV['password']
