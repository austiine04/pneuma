# default user account
User.create email: ENV['USERNAME'], password: ENV['PASSWORD'], password_confirmation: ENV['PASSWORD']
