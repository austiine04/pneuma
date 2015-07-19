require 'rails_helper'

describe Sermon, type: :model do

  describe 'validations' do
    it 'should be invalid when empty' do
      sermon = Sermon.new
      expect(sermon.valid?).to be_falsy
      expect(sermon.errors.messages).to include :title, :preacher, :branding_image_url, :audio_file_url
    end

    it 'should be invalid when given only title' do
      sermon = Sermon.new title: 'title'
      expect(sermon.valid?).to be_falsy
      expect(sermon.errors.messages).to_not include :title
      expect(sermon.errors.messages).to include :preacher, :branding_image_url, :audio_file_url
    end

    it 'should be invalid when given only preacher' do
      sermon = Sermon.new preacher: 'preacher'
      expect(sermon.valid?).to be_falsy
      expect(sermon.errors.messages).to_not include :preacher
      expect(sermon.errors.messages).to include :title, :branding_image_url, :audio_file_url
    end

    it 'should be invalid when given only branding_image_url' do
      sermon = Sermon.new branding_image_url: 'branding_image'
      expect(sermon.valid?).to be_falsy
      expect(sermon.errors.messages).to_not include :branding_image_url
      expect(sermon.errors.messages).to include :title, :preacher, :audio_file_url
    end

    it 'should be invalid when given only audio_file_url' do
      sermon = Sermon.new audio_file_url: 'audio_file_url'
      expect(sermon.valid?).to be_falsy
      expect(sermon.errors.messages).to_not include :audio_file_url
      expect(sermon.errors.messages).to include :title, :preacher, :branding_image_url
    end

    it 'should be valid when given all fields' do
      sermon = Sermon.new title: 'title', preacher: 'preacher', summary: 'summary', branding_image_url: 'image', audio_file_url: 'audio'
      expect(sermon.valid?).to be_truthy
    end

    it 'should be valid when given all required fields' do
      sermon = Sermon.new title: 'title', preacher: 'preacher', branding_image_url: 'image', audio_file_url: 'audio'
      expect(sermon.valid?).to be_truthy
    end
  end
end
