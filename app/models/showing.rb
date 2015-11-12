class Showing < ActiveRecord::Base
  belongs_to :auditorium
  belongs_to :movie
  has_many :orders

  def tickets_available
  	tickets_remaining > 0 && showtime > Date.current()
  end

  def tickets_remaining
  	auditorium.capacity - orders.sum(:quantity)
  end
end
