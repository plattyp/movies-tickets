class Api::OrdersController < ApplicationController

  def index
    search_params = {}
    search_params[:movie_id] = params[:movie_id]
    @orders = Order.all_filtered(search_params)
    respond_to do |format|
      format.json { render json: @orders.to_json(:include => {:showing => {:include => [:movie,:auditorium]}}), status: 200 }
    end
  end

  def create
    @order = Order.create(order_params)
    respond_to do |format|
      if @order.save

        # Send Out Confirmation Email (Will need to be moved to a Queue if not yet)
        #ConfirmationMailer.order_confirmation_email(@order).deliver

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
