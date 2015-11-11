class Auditorium < ActiveRecord::Base
  has_many :showings
end
