class Showing < ActiveRecord::Base
  belongs_to :auditorium
  belongs_to :movie
end
