require 'rails_helper'

RSpec.describe Movie, type: :model do
  describe '#title' do
    it 'will prevent creation of movie if title is blank' do
      movie = build(:movie)
      movie.title = nil
      expect(movie.save).to eq false
    end
    it 'allows creation of showing if showtime is a datetime' do
      movie = build(:movie)
      movie.title = "Not Blank"
      expect(movie.save).to eq true
    end
  end

  describe '#bannerimageurl' do
    it 'will prevent creation of movie if banner image url is blank' do
      movie = build(:movie)
      movie.bannerimageurl = nil
      expect(movie.save).to eq false
    end
    it 'allows creation of movie if banner image url is not blank' do
      movie = build(:movie)
      movie.bannerimageurl = "Not Blank"
      expect(movie.save).to eq true
    end
  end

  describe '#rating' do
    it 'will prevent creation of movie if rating association not present' do
      movie = build(:movie)
      movie.rating = nil
      expect(movie.save).to eq false
    end
    it 'allows creation of movie if rating is indicated' do
      movie = build(:movie)
      movie.rating = create(:rating)
      expect(movie.save).to eq true
    end
  end
  
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
