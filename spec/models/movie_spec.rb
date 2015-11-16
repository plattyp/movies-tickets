require 'rails_helper'

RSpec.describe Movie, type: :model do
  describe '.with_showings_and_ratings' do
    it 'returns all showings that fall within the day passed' do
      showing_one = create(:showing, showtime: Date.today)
      showing_two = create(:showing, showtime: Date.today)
      showing_three = create(:showing, showtime: Date.tomorrow)
      showing_four = create(:showing, showtime: Date.yesterday)
      expect(described_class.with_showings_and_ratings(Date.today).count).to eq 2
    end
  end
end
