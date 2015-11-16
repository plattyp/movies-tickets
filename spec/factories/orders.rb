FactoryGirl.define do
  factory :order do
    name "MyString"
    email "email@test.com"
    creditcardnum "1234123412341234"
    expirationdate "12-2015"
    quantity 1
    association :showing, factory: :showing
  end

  trait :with_all_needed_associations do
    before(:create) do |order|
      auditorium = create(:auditorium)
      movie = create(:movie)
      order.showing = create(:showing, movie: movie, auditorium: auditorium)
    end
  end
end
