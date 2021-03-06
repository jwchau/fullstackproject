class Api::SessionsController < ApplicationController
  def destroy
    if current_user
      logout!
    else
      render json: ['Failed to logout'], status: 404
    end
  end

  def create
    @user = User.find_by_credentials(user_params)
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: ['invalid username or password'], status: 404
    end
  end

end
