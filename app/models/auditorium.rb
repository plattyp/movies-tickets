class Auditorium < ActiveRecord::Base
  has_many :showings

  validates :name, presence: { message: "Name is required" }
  validates :capacity, numericality: { only_integer: true, greater_than: 0, message: "Capacity must be greater than 0" }
end
