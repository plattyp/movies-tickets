require 'rails_helper'

RSpec.describe Order, type: :model do
  describe '#name' do
    it 'will prevent creation of order if name has 0 characters' do
      order = build(:order, :with_all_needed_associations)
      order.name = nil
      expect(order.save).to eq false
    end
    it 'allows creation of order if name has atleast 1 character' do
      order = build(:order, :with_all_needed_associations)
      order.name = "Andrew"
      expect(order.save).to eq true
    end
  end

  describe '#email' do
    it 'will prevent creation of order if email has 0 characters' do
      order = build(:order, :with_all_needed_associations)
      order.email = nil
      expect(order.save).to eq false
    end
    it 'will prevent creation of order if email is invalid' do
      order = build(:order, :with_all_needed_associations)
      order.email = "andrew@test"
      expect(order.save).to eq false
    end
    it 'allows creation of order if email is valid' do
      order = build(:order, :with_all_needed_associations)
      order.email = "aplatkin@hotmail.com"
      expect(order.save).to eq true
    end
  end

  describe '#creditcardnum' do
    it 'will prevent creation of order if credit card is not atleast 14 characters' do
      order = build(:order, :with_all_needed_associations)
      order.creditcardnum = "12312312"
      expect(order.save).to eq false
    end
    it 'will prevent creation of order if credit card is greater than 16 characters' do
      order = build(:order, :with_all_needed_associations)
      order.creditcardnum = "1123123123123123123123123123123123"
      expect(order.save).to eq false
    end
    it 'allows creation of order if credit card is 16 characters' do
      order = build(:order, :with_all_needed_associations)
      order.creditcardnum = "1234123412341234"
      expect(order.save).to eq true
    end
  end

  describe '#expirationdate' do
    it 'will prevent creation of order if expiration date is not provided' do
      order = build(:order, :with_all_needed_associations)
      order.expirationdate = nil
      expect(order.save).to eq false
    end
    it 'allows creation of order if expiration date is provided' do
      order = build(:order, :with_all_needed_associations)
      order.expirationdate = "12-2015"
      expect(order.save).to eq true
    end
  end

  describe '#quantity' do
    it 'will prevent creation of order if quantity is not not greater than 0' do
      order = build(:order, :with_all_needed_associations)
      order.quantity = 0
      expect(order.save).to eq false
    end
    it 'will prevent creation of order if quantity is not an integer' do
      order = build(:order, :with_all_needed_associations)
      order.quantity = 1.55
      expect(order.save).to eq false
    end
    it 'will prevent creation of order if quantity requested is more than quantity of tickets available' do
      order = build(:order, :with_all_needed_associations)
      order.quantity = (order.showing.tickets_remaining + 1)
      expect(order.save).to eq false
    end
    it 'allows creation of order if quantity is provided and tickets are available' do
      order = build(:order, :with_all_needed_associations)
      order.quantity = 1
      expect(order.save).to eq true
    end
  end

  describe '#created_at' do
    it 'will prevent creation of order if tickets are trying to be bought and the movie date has already passed' do
      order = build(:order, :with_all_needed_associations)
      order.showing.showtime = 5.hours.ago
      expect(order.save).to eq false
    end
    it 'allows creation of order if the movie showtime is upcoming' do
      order = build(:order, :with_all_needed_associations)
      order.showing.showtime = 5.days.from_now
      expect(order.save).to eq true
    end
  end
end
