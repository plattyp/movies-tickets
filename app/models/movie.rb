class Movie < ActiveRecord::Base
  belongs_to :rating
  has_many :showings

  def self.with_showings_and_ratings(date_filter)
    Movie.includes(:rating, :showings).where("showings.showtime BETWEEN ? AND ?", date_filter.beginning_of_day(), date_filter.end_of_day()).order("title").order("showings.showtime")
  end
end
