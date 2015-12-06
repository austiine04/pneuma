class S3CredentialsService

  def initialize
    @aws_key_id = ENV['AWS_KEY_ID']
    @aws_secret_key = ENV['AWS_KEY_SECRET']
    @policy = {
      expiration: 5.hours.from_now.utc.xmlschema,
      conditions: [
        {bucket: ENV['S3_BUCKET_NAME']},
        ['starts-with', '$key', ''],
        {acl: 'public-read'},
        ['starts-with', '$Content-Type', ''],
        ['content-length-range', 0, 1000 * 1024 * 1024]
      ]
    }
  end

  def credentials
    {
      policy: encoded_policy,
      signature: signature,
      key: @aws_key_id
    }
  end

  private
  def encoded_policy
    Base64.encode64(@policy.to_json).gsub(/\n/, '')
  end

  def signature
    Base64.encode64(OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha1'), @aws_secret_key.strip, encoded_policy)).gsub(/\n/, '')
  end
end
