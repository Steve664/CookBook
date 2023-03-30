class RecipesController < ApplicationController
    before_action :authorize_request, only: [:create, :edit, :update, :destroy]
    before_action :set_recipe, only: [:show, :edit, :update, :destroy]
  
    def index
      @recipes = Recipe.all
      render json: @recipes, include: :allergens
    end
  
    def show
    end
  
    def create
      @recipe = Recipe.new(recipe_params)
      if @recipe.save
       render json: { message: "Recipe created successfully"}, status: :created
      else
        render json: { errors: @recipe.errors.full_messages },
               status: :unprocessable_entity
      end
    end
  
    def update
      if @recipe.update(recipe_params)
        render json: { message: "Recipe updated successfully"}, status: :created
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
      params.require(:recipe).permit(:title, :image, :description, :instructions, :user_id, allergen_ids: [])
    end
  end
