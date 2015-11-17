require 'rails_helper'

RSpec.describe Api::OrdersController, type: :controller do

  describe 'POST #create' do
    before do
      ResqueSpec.reset!
    end

    it 'returns HTTP success when an order was created successfully' do
      order = build(:order, :with_all_needed_associations)
      json = { :format => 'json', order: {name: order.name, email: order.email, creditcardnum: order.creditcardnum, expirationdate: order.expirationdate, quantity: order.quantity, showing_id: order.showing.id}}
      post :create, json
      expect(response).to have_http_status(:success)
    end

    it 'creates a new order' do
      order = build(:order, :with_all_needed_associations)
      json = { :format => 'json', order: {name: order.name, email: order.email, creditcardnum: order.creditcardnum, expirationdate: order.expirationdate, quantity: order.quantity, showing_id: order.showing.id}}
      expect{post :create, json}.to change{Order.all.count}.by(1)
    end

    it 'adds an email to the queue for the order id' do
      order = build(:order, :with_all_needed_associations)
      json = { :format => 'json', order: {name: order.name, email: order.email, creditcardnum: order.creditcardnum, expirationdate: order.expirationdate, quantity: order.quantity, showing_id: order.showing.id}}
      post :create, json
      order_id = JSON.parse(response.body)["id"]
      expect(EmailService).to have_queued(order_id).in(:email)
    end
  end

end
