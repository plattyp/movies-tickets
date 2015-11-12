class Api::MoviesController < ApplicationController
  def index
    @movies = Movie.order(:title)
    respond_to do |format|
      format.json { render json: @movies.to_json(:include => { :rating => { :except => [:created_at, :updated_at]}}), status: 200 }
    end
  end

  def create
    @movie = Movie.create(movie_params)
    respond_to do |format|
      if @movie.save
        format.json { render json: @movie.to_json, status: 200 }
      else
        format.json { render json: @movie.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @movie = Movie.find(params[:id])
    respond_to do |format|
      if @movie.update(movie_params)
        format.json { render json: @movie.to_json(:include => { :rating => { :except => [:created_at, :updated_at]}}), status: 200 }
      else
        format.json { render json: @movie.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @movie = Movie.find(params[:id])
    @movie.destroy
    respond_to do |format|
      if @movie.destroyed?
        format.json { render json: @movie.to_json, status: 200 }
      else
        format.json { render json: @movie.errors, status: :unprocessable_entity }
      end
    end
  end

  def showings_by_day
    # If no date is passed, use today as a default
    date_param = params[:date] ? Date.strptime(params[:date], '%Y-%m-%d') : nil
    date_filter = date_param || Date.today
    @movies = Movie.with_showings_and_ratings(date_filter)
    respond_to do |format|
      format.json { render json: @movies.to_json(:include => {:showings => { :except => [:created_at, :updated_at], :methods => [:tickets_available]}, :rating => { :except => [:created_at, :updated_at]}}), status: 200 }
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :bannerimageurl, :rating_id)
  end
end
