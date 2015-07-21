module Api
  module V1
    class SermonsController < ApplicationController
      before_action :authenticate_user!

      def create
        sermon = Sermon.new sermon_params
        if sermon.save
          render json: sermon, status: 201
        else
          render json: sermon.errors.messages,  status: 422
        end
      end

      private
      def sermon_params
        params.require(:sermon).permit(:title, :preacher, :summary, :branding_image_url, :audio_file_url)
      end
    end
  end
end
