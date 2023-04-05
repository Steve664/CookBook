class RecipesController < ApplicationController
    before_action :authorize_request, only: [:create, :edit, :update, :destroy]
    before_action :set_recipe, only: [:show, :edit, :update, :destroy]
  
    def index
      @recipes = Recipe.all
      render json: @recipes
    end
  
    def show
      @recipe = Recipe.find(params[:id])
      render json: @recipe, include: :reviews, status: :ok
    end

   def recipe_reviews
  @reviews = Review.where(recipe_id: params[:id])
  @authors = []
  @reviews.each do |review|
    @authors << review.user.name
  end
  render json: {reviews: @reviews, authors: @authors}, status: :ok
end

  
    def create
      @recipe = Recipe.new(recipe_params)
      @recipe.user = @current_user
      if @recipe.save
       render json: @recipe, status: :created
      else
        render json: { errors: @recipe.errors.full_messages },
               status: :unprocessable_entity
      end
    end
  
    def update
      if @recipe.update(recipe_params)
        render json: @recipe, status: :created
      else
        render json: { errors: @recipe.errors.full_messages },
               status: :unprocessable_entity
      end
    end
  
    def destroy
      @recipe.destroy
      render json: {}, status: :no_content
    end
  
    private
  
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end
  
    def recipe_params
      params.require(:recipe).permit(:title, :image, :description, :instructions)
    end
  end
