require 'rails_helper'

RSpec.describe Showing, type: :model do
  describe '#showtime' do
    it 'will prevent creation of showing if showtime is blank' do
      showing = build(:showing)
      showing.showtime = nil
      expect(showing.save).to eq false
    end
    it 'will prevent creation of showing if showtime is not a date' do
      showing = build(:showing)
      showing.showtime = "A/B/C"
      expect(showing.save).to eq false
    end
    it 'allows creation of showing if showtime is a datetime' do
      showing = build(:showing)
      showing.showtime = Date.today
      expect(showing.save).to eq true
    end
  end

  describe '#tickets_available' do
    it 'returns false if the remaining tickets for the showtime is 0' do
      order = create(:order, :with_all_needed_associations)
      order.showing.auditorium.capacity = 1
      expect(order.showing.tickets_available).to eq false
    end
    it 'returns false if the showtime is in the past' do
      order = create(:order, :with_all_needed_associations)
      order.showing.showtime = 5.hours.ago
      expect(order.showing.tickets_available).to eq false
    end
    it 'returns true if the remaining tickets are available and the showtime is in the future' do
      showing = create(:showing)
      showing.auditorium.capacity = 10
      expect(showing.tickets_available).to eq true
    end
  end

  describe '#tickets_remaining' do
    it 'returns the difference of between the summation of all quantities of orders associated with the showtime and the auditoriums capacity' do
      showing = create(:showing)
      order_one = create(:order, showing: showing)
      order_two = create(:order, showing: showing)
      remaining_count = showing.auditorium.capacity - (order_one.quantity + order_two.quantity)
      expect(showing.tickets_remaining).to eq remaining_count
    end
  end
end
