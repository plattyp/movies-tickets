class Movie < ActiveRecord::Base
  belongs_to :rating
  has_many :showings

  def self.with_showings_and_ratings
    Movie.includes(:rating, :showings).order("title").order("showings.showtime")
  end
end
