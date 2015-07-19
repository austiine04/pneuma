class CreateSermons < ActiveRecord::Migration
  def change
    create_table :sermons do |t|
      t.string :title, null: false
      t.string :preacher, null: false
      t.text :summary
      t.string :branding_image_url, null: false
      t.string :audio_file_url, null: false

      t.index [:title]
      t.timestamps
    end
  end
end
