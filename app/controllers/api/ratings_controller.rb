class Api::RatingsController < ApplicationController
  def index
    @ratings = Rating.order(:id)
    respond_to do |format|
      format.json { render json: @ratings.to_json, status: 200 }
    end
  end
end
