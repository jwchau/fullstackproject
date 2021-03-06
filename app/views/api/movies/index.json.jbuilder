json.array! @movies do |movie|
  json.extract! movie, :id, :title, :year, :score
  json.posterUrl url_for(movie.poster) if movie.poster.attached?
  json.trailerUrl url_for(movie.trailer) if movie.trailer.attached?
end