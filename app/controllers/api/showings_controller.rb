class Api::ShowingsController < ApplicationController
  def index
    @showings = Showing.order(:showtime)
    respond_to do |format|
      format.json { render json: @showings.to_json(:include => { :movie => { :except => [:created_at, :updated_at]}, :auditorium => { :except => [:created_at, :updated_at]}}), status: 200 }
    end
  end

  def show
    @showing = Showing.find(params[:id])
    respond_to do |format|
      if @showing
        format.json { render json: @showing.to_json(:include => { :movie => {:include => :rating}, :auditorium => { :except => [:created_at, :updated_at]}}), status: 200 }
      else
        format.json { render json: @showing.errors, status: :unprocessable_entity }
      end
    end
  end

  def create
    @showing = Showing.create(showing_params)
    respond_to do |format|
      if @showing.save
        format.json { render json: @showing.to_json, status: 200 }
      else
        format.json { render json: @showing.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @showing = Showing.find(params[:id])
    respond_to do |format|
      if @showing.update(showing_params)
        format.json { render json: @showing.to_json, status: 200 }
      else
        format.json { render json: @showing.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @showing = Showing.find(params[:id])
    @showing.destroy
    respond_to do |format|
      if @showing.destroyed?
        format.json { render json: @showing.to_json, status: 200 }
      else
        format.json { render json: @showing.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def showing_params
    params.require(:showing).permit(:showtime, :movie_id, :auditorium_id)
  end
end
