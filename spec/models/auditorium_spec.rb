require 'rails_helper'

RSpec.describe Auditorium, type: :model do
  describe '#name' do
    it 'will prevent creation of auditorium if name is blank' do
      auditorium = build(:auditorium)
      auditorium.name = nil
      expect(auditorium.save).to eq false
    end
    it 'allows creation of auditorium if name is a not blank' do
      auditorium = build(:auditorium)
      auditorium.name = "Not Blank"
      expect(auditorium.save).to eq true
    end
  end

  describe '#capacity' do
    it 'will prevent creation of auditorium if capacity is not greater than 0' do
      auditorium = build(:auditorium)
      auditorium.capacity = 0
      expect(auditorium.save).to eq false
    end
    it 'will prevent creation of auditorium if capacity is not an integer' do
      auditorium = build(:auditorium)
      auditorium.capacity = "The"
      expect(auditorium.save).to eq false
    end
    it 'allows creation of auditorium if capacity is greater than 0' do
      auditorium = build(:auditorium)
      auditorium.capacity = 1
      expect(auditorium.save).to eq true
    end
  end
end
