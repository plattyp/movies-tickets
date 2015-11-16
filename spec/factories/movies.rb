FactoryGirl.define do
  factory :movie do
    title "MyString"
    bannerimageurl "MyString"
    association :rating, factory: :rating
  end

end
