require 'rails_helper'

describe Sermon, type: :model do

  describe 'validations' do
    it {should validate_presence_of(:title)}
    it {should validate_presence_of(:preacher)}
    it {should validate_presence_of(:branding_image_url)}
    it {should validate_presence_of(:audio_file_url)}
  end

  describe 'attributes' do
    it {should respond_to(:title)}
    it {should respond_to(:preacher)}
    it {should respond_to(:summary)}
    it {should respond_to(:branding_image_url)}
    it {should respond_to(:audio_file_url)}
    it {should respond_to(:audio_file_urlsssss)}
  end
end
