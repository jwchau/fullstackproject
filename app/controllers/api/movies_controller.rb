class Api::MoviesController < ApplicationController

  def show
    @movie = Movie.find_by(id: params[:id])#.includes(:reviews, :ratings)
    render :show
  end

  def index 
    @movies = Movie.all
    render :index
  end

  def movie_params
    params.require(:movie).permit(:title, :year)
  end
end
