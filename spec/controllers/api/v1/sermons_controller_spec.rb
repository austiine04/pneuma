require 'rails_helper'

describe Api::V1::SermonsController, type: :controller do

  describe 'create' do
    describe 'valid sermon' do
      before(:each) do
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
end
