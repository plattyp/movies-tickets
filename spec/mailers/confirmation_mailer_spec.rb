require "rails_helper"

RSpec.describe ConfirmationMailer, type: :mailer do
  describe '#order_confirmation_email' do 
    before(:each) do
      @order = create(:order, :with_all_needed_associations)
      ConfirmationMailer.order_confirmation_email(@order).deliver_now
    end

    it 'sends an email to the email provided on the order' do
      expect(ActionMailer::Base.deliveries.first.to[0]).to eq @order.email
    end

    it 'sends an email with a customized subject depending on the movie' do
      expect(ActionMailer::Base.deliveries.first.subject).to eq "Ticket purchase confirmation (#{@order.showing.movie.title})"
    end
  end
end
