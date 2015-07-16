class DashboardController < ApplicationController
  def index
  end

  def s3_access_token
    s3_credentials_service = S3CredentialsService.new
    render json: s3_credentials_service.credentials
  end
end
