class Movie < ActiveRecord::Base
  belongs_to :rating
  has_many :showings
end
