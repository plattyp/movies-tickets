FactoryGirl.define do
  factory :showing do
    showtime 10.days.from_now
    association :movie, factory: :movie
    association :auditorium, factory: :auditorium
  end

end
