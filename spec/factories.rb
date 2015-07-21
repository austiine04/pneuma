require 'factory_girl'

FactoryGirl.define do
  factory :user do
    sequence(:email, 100) { |n| "person#{n}@example.com" }
    password "password"
    password_confirmation "password"
  end

  factory :sermon do
    initialize_with { new(attributes) }
  end
end
