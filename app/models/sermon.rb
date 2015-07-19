class Sermon < ActiveRecord::Base
  validates :title, presence: true
  validates :preacher, presence: true
  validates :branding_image_url, presence: true
  validates :audio_file_url, presence: true
end
