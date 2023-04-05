class ReviewsController < ApplicationController
    before_action :authorize_request, only: [:create, :edit, :update, :destroy]
    before_action :set_review, only: [:edit, :update, :destroy]
    before_action :set_recipe, only: [:create]
  
    def index
      @reviews = Review.all
      render json: @reviews, status: :ok
    end

    
  def create
    @review = Review.new(review_params)
    @review.user = @current_user
    @review.recipe = @recipe

    if @review.save
      render json: @review, status: :created
    else
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
 
    def update
      if @review.update(review_params)
        render json: { message: "Review updated successfully"}, status: :created
      else
        render json: { errors: @review.errors.full_messages },
        status: :unprocessable_entity
      end
    end
  
    def destroy
      @review.destroy
      render json: {}, status: :no_content
    end
  
    private
    def set_recipe
      @recipe = Recipe.find(params[:recipe_id])
    end
  
    def set_review
      @review = Review.find(params[:id])
    end
  
    def review_params
      params.require(:review).permit(:rating, :content)
    end
  end
