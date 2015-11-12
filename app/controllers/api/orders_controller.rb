class Api::OrdersController < ApplicationController
  def index
    @orders = Order.order(:created_at)
    respond_to do |format|
      format.json { render json: @orders.to_json(:include => {:showing => {:include => [:movie,:auditorium]}}), status: 200 }
    end
  end

  def create
    @order = Order.create(order_params)
    respond_to do |format|
      if @order.save
        format.json { render json: @order.to_json, status: 200 }
      else
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def order_params
    params.require(:order).permit(:name, :email, :creditcardnum, :expirationdate, :quantity, :showing_id)
  end
end
