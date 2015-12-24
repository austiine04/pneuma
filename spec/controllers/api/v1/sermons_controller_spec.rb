require 'rails_helper'

#TODO tests to cover not logged in scenario
describe Api::V1::SermonsController, type: :controller do
  describe 'create' do
    describe 'valid sermon' do
      before(:each) do
        login_user
        sermon = {sermon: {title: 'title', preacher: 'preacher', branding_image_url: 'image', audio_file_url: 'file'}}
        post :create, sermon
      end

      it {should respond_with 201}

      it 'should create a sermon in the database' do
        expect(Sermon.count).to eq 1
      end

      it 'should return sermon json' do
        api_response = JSON.parse(response.body, symbolize_names: true)

        expect(api_response[:title]).to eq 'title'
        expect(api_response[:preacher]).to eq 'preacher'
        expect(api_response[:branding_image_url]).to eq 'image'
        expect(api_response[:audio_file_url]).to eq 'file'
      end
    end

    describe 'invalid sermon' do
      before(:each) do
        login_user
        sermon = {sermon: {branding_image_url: 'image', audio_file_url: 'file'}}
        post :create, sermon
      end

      it {should respond_with 422}

      it 'should render json with errors' do
        api_response = JSON.parse(response.body, symbolize_names: true)
        expect(api_response[:title]).to eq ["can't be blank"]
        expect(api_response[:preacher]).to eq ["can't be blank"]
      end
    end
  end

  describe 'index' do
    before(:each) do
      3.times do |count|
        title = "title #{count}"
        branding_image_url = "url #{count}"
        audio_file_url = "url #{count}"

        create :sermon, title: title, preacher: 'preacher', branding_image_url: branding_image_url, audio_file_url: audio_file_url
      end

      get :index, format: :json
    end

    it {should respond_with 200}

    it 'should return all available sermons' do
      api_response = JSON.parse response.body
      expect(api_response.size).to be 3
    end
  end

  describe 'show' do
    describe 'give a sermon exists' do
      before :each do
        sermon = create :sermon
        get :show, id: sermon.id
      end

      it {should respond_with 200}

      it 'should return the sermon' do
        api_response = JSON.parse(response.body, symbolize_names: true)
        expect(api_response[:title]).to eq 'title'
        expect(api_response[:preacher]).to eq 'preacher'
        expect(api_response[:branding_image_url]).to eq 'url'
        expect(api_response[:audio_file_url]).to eq 'url'
      end
    end

    describe 'given sermon does not exist' do
      it 'should return 404 when sermon does not exist' do
        get :show, id: 4
        should respond_with 404
      end
    end
  end
end
