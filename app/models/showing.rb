class Showing < ActiveRecord::Base
  belongs_to :auditorium
  belongs_to :movie
  has_many :orders

  validates_datetime :showtime
  validates :showtime, presence: { message: "Showtime is required" }
  validates :movie, presence: { message: "Movie is required" }
  validates :auditorium, presence: { message: "Auditorium is required" }

  def tickets_available
  	tickets_remaining > 0 && showtime.future?
  end

  def tickets_remaining
  	auditorium.capacity - orders.sum(:quantity)
  end
end
