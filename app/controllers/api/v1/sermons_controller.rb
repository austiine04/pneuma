module Api
  module V1
    class SermonsController < ApplicationController
      before_action :authenticate_user!, only: [ :create ]
      rescue_from ActiveRecord::RecordNotFound, with: :sermon_not_found

      def index
        render json: Sermon.all
      end

      def create
        sermon = Sermon.new sermon_params
        render json: sermon, status: 201 if sermon.save
        render json: sermon.errors.messages,  status: 422 if !sermon.save
      end

      def show
        render json: Sermon.find(params[:id])
      end

      private
      def sermon_params
        params.require(:sermon).permit(:title, :preacher, :summary, :branding_image_url, :audio_file_url)
      end

      def sermon_not_found
        render json: 'Sermon not found', status: 404
      end
    end
  end
end
