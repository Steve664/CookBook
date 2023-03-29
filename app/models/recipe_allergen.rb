class RecipeAllergen < ApplicationRecord
  belongs_to :recipe
  belongs_to :allergen
end
