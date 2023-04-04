class ReviewsController < ApplicationController
    before_action :authorize_request, only: [:create, :edit, :update, :destroy]
    before_action :set_review, only: [:edit, :update, :destroy]
    def index
      @reviews = Reviews.all
      render json: @reviews, include: :users
    end
    def create
      @recipe = Recipe.find(params[:recipe_id])
      @review = @recipe.reviews.new(review_params)
      @review.user = current_user
      if @review.save
        render json: { message: "Review created successfully"}, status: :created
      else
        render json: { errors: @recipe.errors.full_messages },
        status: :unprocessable_entity
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
  
    def set_review
      @review = Review.find(params[:id])
    end
  
    def review_params
      params.require(:review).permit(:rating, :comment)
    end
  end
