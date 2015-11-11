class Rating < ActiveRecord::Base
  has_many :movies
end
