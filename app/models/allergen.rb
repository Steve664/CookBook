class Allergen < ApplicationRecord
    has_many :recipe_allergens, dependent: :destroy
    has_many :recipes, through: :recipe_allergens
  
    validates :name, presence: true, uniqueness: true
end
